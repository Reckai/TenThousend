import { Stack } from "expo-router";
import { Colors } from "../utils/colors";

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,

        contentStyle: {
          backgroundColor: Colors.white,
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ title: "Home" }} />
    </Stack>
  );
}
