import { Stack } from "expo-router";
import { Colors } from "../utils/colors";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors.white,
        },
      }}
    />
  );
}
