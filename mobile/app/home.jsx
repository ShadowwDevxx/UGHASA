import { Link, useRouter } from "expo-router";
import React, { useContext, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { UserContext } from "../components/contexts/usercontext";
import { getAuth } from "firebase/auth";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { app } from "../firebase";

const Home = () => {
  const { user } = useContext(UserContext);
  const auth = getAuth(app);
  const router = useRouter();

  useEffect(
    () =>
      Toast.show({
        type: "success",
        position: "bottom",
        text1: `Logged in as ${user.displayName}`,
      }),
    []
  );

  const handleSignOut = async () => {
    try {
      const displayName = user.displayName;
      await auth.signOut();
      await AsyncStorage.removeItem("email");
      await AsyncStorage.removeItem("password");

      Toast.show({
        type: "success",
        position: "bottom",
        text1: `Logged Out ${displayName}`,
      });
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return user ? (
    <View className="h-full w-full flex items-center justify-center">
      <Text>Home screen</Text>
      <Text> Welcome , {user.email}</Text>
      <Text> username, {user.displayName}</Text>
      <Text> email verified?, {user.emailVerified}</Text>
      <View>
        <Image className="w-16 h-16" source={{ uri: user.photoURL }} />
      </View>
      <Link href={"/login"}>Go to login</Link>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  ) : null;
};

export default Home;
