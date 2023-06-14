import { Stack, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

export default function DiscussionLayout() {
  const router = useRouter();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="[id]"
        options={{
          animation: "fade_from_bottom",
          headerShown: true,
          headerTitle: "Post",
          // headerRight: () => (
          //   <TouchableOpacity
          //     onPress={() => {
          //       console.log("redirecting to create page");
          //       router.push("/Discussions/create");
          //     }}
          //     className="bg-slate-50 w-10 h-10 rounded-full flex items-center justify-center"
          //   >
          //     <MaterialIcons name="add" size={24} color="grey" />
          //   </TouchableOpacity>
          // ),
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          animation: "fade_from_bottom",
        }}
      />
    </Stack>
  );
}
