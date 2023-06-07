import { UserProvider } from "../src/contexts/usercontext";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { Redirect, SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { app } from "../firebase";
import { Text, View } from "react-native";

export default RootLayout = () => {
  const router = useRouter();
  const useLoadStorage = () => {
    const [isLoading, setLoading] = useState(true);
    const auth = getAuth(app);

    const logInUser = async () => {
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
      logInUser();
    }, []);
    return { isLoading };
  };

  const { isLoading } = useLoadStorage();

  if (isLoading) {
    return (
      <>
        <View className="h-full w-full flex items-center justify-center">
          <Text>Loading...</Text>
        </View>
      </>
    );
  }

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
