import React, { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../firebase";
import { useRouter, useSegments } from "expo-router";

export const UserContext = createContext();

const useProtectedRoutes = user => {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] == "(auth)";
    if (!user && !inAuthGroup) {
      router.replace("/account/login");
    } else if (user && inAuthGroup) {
      router.replace("/Dashboard");
    }
  }, [segments, user]);
};

export const UserProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);

  const updateUser = newUser => {
    setUser(newUser);
  };

  onAuthStateChanged(auth, user => {
    setUser(user);
  });

  useProtectedRoutes({firstName: "hello"});

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
