import { Redirect, SplashScreen, useRouter } from "expo-router";
import { Text } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";



export default function () {
  return <>{<Redirect href={"/Dashboard"} />}</>;
}
