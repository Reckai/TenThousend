import { BackButton } from "@/app/components/BackButton";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { usePinCode } from "./hooks/usePinCode";
export default function PinCode() {
  const { state, actions, localization } = usePinCode();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text>PinCode</Text>
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
});
