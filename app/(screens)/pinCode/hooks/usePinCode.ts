import { verify } from "@/app/redux/slices/verify.slice";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import ReactNativeBiometrics from "react-native-biometrics";
import Keychain from "react-native-keychain";
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
  const rnBiometrics = useMemo(
    () =>
      new ReactNativeBiometrics({
        allowDeviceCredentials: true,
      }),
    [],
  );

  useEffect(() => {
    const verifyPin = async () => {
      if (step === STEPS.VERIFY) {
        try {
          const { success } = await rnBiometrics.simplePrompt({
            promptMessage: t("pinCode.verify.biometrics.title"),
          });

          if (success) {
            // Implement dispatch logic here instead of throwing error
            dispatch(verify());
            console.log("Biometric verification successful");
          }
        } catch (error) {
          console.error("Biometric verification failed:", error);
        }
      }
    };

    const checkExistingPin = async () => {
      try {
        const existedPin = await Keychain.getGenericPassword({
          service: PIN_CODE_SERVICE,
        });

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
  }, [rnBiometrics, t]);

  const resetPinCode = useCallback((newStep: StepType) => {
    setPinCode("");
    setSecondPinCode("");
    setStep(newStep);
  }, []);

  const handleVerify = useCallback(async () => {
    try {
      const existedPin = await Keychain.getGenericPassword({
        service: PIN_CODE_SERVICE,
      });

      if (existedPin && existedPin.password === pinCode) {
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
        await Keychain.setGenericPassword(PIN_CODE_SERVICE, pinCode, {
          service: PIN_CODE_SERVICE,
        });

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
    },
    localization: { t },
  };
};
