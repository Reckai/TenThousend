import { Stack } from "expo-router";
import React from "react";
import Routes from "../routes";
import { Welcome } from "../screens";

export default function WelcomeRoute() {
  return (
    <>
      <Stack.Screen
        options={{
          title: Routes.Welcome,
          headerShown: false,
        }}
      />
      <Welcome />
    </>
  );
}
