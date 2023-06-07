import { useRouter, useSegments } from "expo-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { app } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

const useProtectedRoutes = user => {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] == "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/account/login");
    } else if (user && !user.emailVerified) {
      router.replace("/onboard/verify");
    } else if (user && user.emailVerified && !user.displayName) {
      router.replace("/onboard/onboard");
    } else if (user && user.displayName && inAuthGroup) {
      router.replace("/Dashboard");
    }
  }, [user, segments]);
};

export const UserProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);

  useProtectedRoutes(user);

  const updateUser = newUser => {
    setUser(newUser);
  };

  const signOut = () => {
    auth.signOut().then(() => {
      AsyncStorage.removeItem("email");
      AsyncStorage.removeItem("password");
    });
  };

  onAuthStateChanged(auth, user => {
    setUser(user);
  });

  return (
    <UserContext.Provider value={{ user, updateUser, signOut }}>
      {children}
    </UserContext.Provider>
  );
};
