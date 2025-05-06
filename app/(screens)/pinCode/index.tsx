import { BackButton } from "@/app/components/BackButton";
import Button from "@/app/components/Button";
import { Colors } from "@/app/utils/colors";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Keypad, PinCodeBar } from "./_components";
import { STEPS } from "./_consts";
import { usePinCode } from "./hooks/usePinCode";
export default function PinCode() {
  const { state, actions, localization } = usePinCode();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>
      <View style={styles.titleContainer}>
        <SimpleLineIcons name="screen-smartphone" size={24} color="black" />
        <Text>
          {state.step === STEPS.VERIFY
            ? localization.t("auth.pinCode.verify.title")
            : state.step === STEPS.CREATE
              ? localization.t("auth.pinCode.create.title")
              : localization.t("auth.pinCode.confirm.title")}
        </Text>
        <Text>{localization.t("auth.pinCode.subtitle")}</Text>

        <PinCodeBar pinCode={state.pinCode} />
      </View>

      <View style={styles.pinCodeContainer}>
        <Keypad
          onDigitPress={actions.handleDigitPress}
          onBackspacePress={actions.handleBackspacePress}
        />
        <Button
          style={styles.button}
          title={localization.t("auth.pinCode.submit")}
          onPress={actions.handleSubmit}
          backgroundColor={Colors.orange}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: 20,
  },
  button: {
    marginTop: 20,
  },
  header: {
    marginBottom: 40,
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  pinCodeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
