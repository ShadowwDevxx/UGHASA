import React from "react";
import { Stack } from "expo-router";
import { UserProvider } from "../components/contexts/usercontext";

export default function () {
  return (
    <UserProvider>
      <Stack
        screenOptions={{
          headerTitle: "",
          headerShadowVisible: false,
          animationDuration: 5,
          animation: "slide_from_right",
        }}
      />
    </UserProvider>
  );
}
