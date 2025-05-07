import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { Colors } from "../utils/colors";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors.white,
          marginTop: StatusBar.currentHeight,
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Welcome" }} />
      <Stack.Screen name="PinCode/index" options={{ title: "Pin Code" }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
    </Stack>
  );
}
