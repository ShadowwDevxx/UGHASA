import React from "react";
import { Stack } from "expo-router";
import { UserProvider } from "../components/contexts/usercontext";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export default function () {
  return (
    <>
      <UserProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            headerShadowVisible: false,
            animationDuration: 5,
            animation: "slide_from_right",
          }}
        />
      </UserProvider>
      <Toast />
    </>
  );
}
