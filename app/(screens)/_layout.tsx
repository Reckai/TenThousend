import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <StatusBar barStyle="dark-content" />

      <Stack.Screen name="PinCode" />
    </Stack>
  );
}
