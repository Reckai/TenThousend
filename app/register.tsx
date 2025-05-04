import { Stack } from "expo-router";
import React from "react";
import { Routes } from "./routes";
import Register from "./screens/register/register";

export default function RegisterRoute() {
  return (
    <>
      <Stack.Screen
        options={{
          title: Routes.Register,
          headerShown: false,
        }}
      />
      <Register />
    </>
  );
}
