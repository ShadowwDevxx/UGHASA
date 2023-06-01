import React from "react";
import { Stack } from "expo-router";

export default function () {
  return (
    <Stack
      screenOptions={{
        headerTitle:"",
        headerShadowVisible: false,
        animationDuration: 5,
        animation: "slide_from_right",
      }}
    />
  );
}