import { useRouter } from "expo-router";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../components/contexts/usercontext";
import { getAuth } from "firebase/auth";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { app } from "../firebase";
import DrawerNavigator from "./navigation/tab-navigator";

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
        <DrawerNavigator />
  ) : null;
};

export default Home;
