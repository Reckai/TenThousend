import { Stack } from "expo-router";
import React from "react";
import Routes from "../routes";
import Login from "../screens/login/login";

export default function LoginRoute() {
  return (
    <>
      <Stack.Screen
        options={{
          title: Routes.Login,
          headerShown: false,
        }}
      />
      <Login />
    </>
  );
}
