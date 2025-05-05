import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { Provider } from "./providers/provider";

export default function RootLayout() {
  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Stack />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: StatusBar.currentHeight,
  },
});
