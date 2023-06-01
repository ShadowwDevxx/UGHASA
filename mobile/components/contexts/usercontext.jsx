import React, { createContext, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../firebase";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = newUser => {
    setUser(newUser);
  };

  const auth = getAuth(app);
  onAuthStateChanged(auth, user => {
    console.log("auth state", user);
    setUser(user);
  });

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
