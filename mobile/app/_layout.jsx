import React from "react";
import { UserProvider } from "../src/contexts/usercontext";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { Stack } from "expo-router";

export default RootLayout = () => {
  return (
    <>
      <UserProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </UserProvider>
      <Toast />
    </>
  );
};
