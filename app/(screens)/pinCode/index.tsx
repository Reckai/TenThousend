import { BackButton } from "@/app/components/BackButton";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Keypad, PinCodeBar } from "./_components";
import { usePinCode } from "./hooks/usePinCode";
export default function PinCode() {
  const { state, actions, localization } = usePinCode();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <View style={styles.titleContainer}>
          <SimpleLineIcons name="lock" size={24} color="black" />
          <Text>{localization.t("pinCode.title")}</Text>
          <Text>{localization.t("pinCode.subtitle")}</Text>
        </View>
      </View>
      <View style={styles.pinCodeContainer}>
        <PinCodeBar pinCode={state.pinCode} />
        <Keypad
          onDigitPress={actions.handleDigitPress}
          onBackspacePress={actions.handleBackspacePress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
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
