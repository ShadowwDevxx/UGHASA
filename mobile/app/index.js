import { Redirect, useRouter } from "expo-router";
import { Text } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function Index() {
  const [isLoading, setLoading] = useState(true);
  const auth = getAuth(app);

  const loggInUser = async () => {
    try {
      const email = await AsyncStorage.getItem("email");
      const password = await AsyncStorage.getItem("password");
      if (email && password) {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loggInUser();
  }, []);

  if (isLoading) {
    return <Text>Loading....</Text>;
  }

  if (auth.currentUser) {
    if (auth.currentUser.emailVerified) {
      return <Redirect href={"/home"} />;
    } else {
      return <Redirect href={"/verify"} />;
    }
  }
  return <Redirect href={"(auth)/login"} />;
}
