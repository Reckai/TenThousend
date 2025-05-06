import { verify } from "@/app/redux/slices/verify.slice";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { PIN_CODE_LENGTH, PIN_CODE_SERVICE, STEPS } from "../_consts";
import { StepType } from "../_types";
interface PinCodeState {
  pinCode: string;
  step: StepType;
}

interface PinCodeActions {
  handleDigitPress: (digit: string) => void;
  handleBackspacePress: () => void;
  handleSubmit: () => Promise<void>;
  cancelAuthentication: () => void;
}

interface PinCodeLocalization {
  t: ReturnType<typeof useTranslation>["t"];
}

interface PinCodeHookResult {
  state: PinCodeState;
  actions: PinCodeActions;
  localization: PinCodeLocalization;
}

export const usePinCode = (): PinCodeHookResult => {
  const dispatch = useDispatch();
  const [pinCode, setPinCode] = useState<string>("");
  const [secondPinCode, setSecondPinCode] = useState<string>("");
  const [step, setStep] = useState<StepType>(STEPS.VERIFY);
  const { t } = useTranslation();

  useEffect(() => {
    const verifyPin = async () => {
      if (step === STEPS.VERIFY) {
        try {
          const hasHardware = await LocalAuthentication.hasHardwareAsync();
          const isEnrolled = await LocalAuthentication.isEnrolledAsync();

          if (hasHardware && isEnrolled) {
            const supportedTypes =
              await LocalAuthentication.supportedAuthenticationTypesAsync();
            const hasFaceId = supportedTypes.includes(
              LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
            );
            const hasFingerprint = supportedTypes.includes(
              LocalAuthentication.AuthenticationType.FINGERPRINT,
            );

            let promptMessage = t("pinCode.verify.biometrics.title");
            if (hasFaceId && !hasFingerprint) {
              promptMessage =
                t("pinCode.verify.biometrics.faceId.title") ||
                "Authenticate with Face ID";
            } else if (hasFingerprint && !hasFaceId) {
              promptMessage =
                t("pinCode.verify.biometrics.touchId.title") ||
                "Authenticate with Touch ID/Fingerprint";
            }

            const result = await LocalAuthentication.authenticateAsync({
              promptMessage,
              disableDeviceFallback: false,
              fallbackLabel:
                t("pinCode.verify.biometrics.fallback") || "Use PIN",
            });

            if (result.success) {
              dispatch(verify());
              console.log(result);
              console.log("Biometric verification successful");
            } else if (
              result.error === "user_cancel" ||
              result.error === "system_cancel"
            ) {
              console.log("Authentication cancelled");
            } else if (result.error === "lockout") {
              Alert.alert(
                t("pinCode.error.tooManyAttempts") ||
                  "Too many failed attempts",
              );
            }
          } else {
            console.log(
              "Biometrics not available or not enrolled, falling back to PIN verification",
            );
          }
        } catch (error) {
          console.error("Biometric verification failed:", error);
        }
      }
    };

    const checkExistingPin = async () => {
      try {
        const existedPin = await SecureStore.getItemAsync(PIN_CODE_SERVICE);

        if (existedPin) {
          await verifyPin();
        } else {
          setStep(STEPS.CREATE);
        }
      } catch (error) {
        console.error("Error checking existing PIN:", error);
        setStep(STEPS.CREATE);
      }
    };

    checkExistingPin();
  }, [t, dispatch, step]);

  const resetPinCode = useCallback((newStep: StepType) => {
    setPinCode("");
    setSecondPinCode("");
    setStep(newStep);
  }, []);

  const handleVerify = useCallback(async () => {
    try {
      const existedPin = await SecureStore.getItemAsync(PIN_CODE_SERVICE);

      if (existedPin && existedPin === pinCode) {
        dispatch(verify());
        console.log("PIN verified successfully");
      } else {
        Alert.alert(t("pinCode.error.incorrect"));
        setPinCode("");
      }
    } catch (error) {
      console.error("PIN verification error:", error);
      Alert.alert(t("pinCode.error.verificationFailed"));
      setPinCode("");
    }
  }, [pinCode, t, dispatch]);

  const handleCreate = useCallback(() => {
    setSecondPinCode(pinCode);
    setPinCode("");
    setStep(STEPS.CONFIRM);
  }, [pinCode]);

  const handleConfirm = useCallback(async () => {
    try {
      if (pinCode === secondPinCode) {
        await SecureStore.setItemAsync(PIN_CODE_SERVICE, pinCode);

        dispatch(verify());
        console.log("PIN created successfully");
        resetPinCode(STEPS.VERIFY);
      } else {
        Alert.alert(t("pinCode.error.pinDidNotMatch"));
        setPinCode("");
      }
    } catch (error) {
      console.error("PIN confirmation error:", error);
      Alert.alert(t("pinCode.error.savingFailed"));
      setPinCode("");
    }
  }, [pinCode, secondPinCode, resetPinCode, t, dispatch]);

  const handleDigitPress = useCallback(
    (digit: string) => {
      if (pinCode.length < PIN_CODE_LENGTH) {
        setPinCode((prev) => prev + digit);
      }
    },
    [pinCode.length],
  );

  const handleBackspacePress = useCallback(() => {
    setPinCode((prev) => prev.slice(0, -1));
  }, []);

  const cancelAuthentication = useCallback(() => {
    LocalAuthentication.cancelAuthenticate();
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      if (step === STEPS.VERIFY) {
        await handleVerify();
      } else if (step === STEPS.CREATE) {
        handleCreate();
      } else if (step === STEPS.CONFIRM) {
        await handleConfirm();
      }
    } catch (error) {
      console.error("PIN submission error:", error);
    }
  }, [step, handleVerify, handleCreate, handleConfirm]);

  return {
    state: { pinCode, step },
    actions: {
      handleDigitPress,
      handleBackspacePress,
      handleSubmit,
      cancelAuthentication,
    },
    localization: { t },
  };
};
