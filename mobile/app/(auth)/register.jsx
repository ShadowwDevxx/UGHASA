import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { Link, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { app } from "../../firebase";
import { UserContext } from "../../components/contexts/usercontext";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [isLoading, setLoading] = useState(0);

  const auth = getAuth(app);
  const router = useRouter();

  const { user, updateUser } = useContext(UserContext);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: `Passwords do not match`,
      });
      return;
    }
    
    try {
        setLoading(true);
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
      );

      sendEmailVerification(auth.currentUser).then(() =>
        router.push("/verify")
      );
    } catch (error) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: `Something went wrong try again`,
      });} 
      finally {
      setLoading(false);
    }
  };

  return (
    <View className="w-full h-full flex flex-col items-center justify-center bg-white">
      <View className="w-full flex-col px-4 space-y-4">
        <View className="space-y-2">
          <Text className="text-3xl font-bold">Register An Account 🚀</Text>
          <Text className="text-gray-500">
            You can start using the application after you sign up.
          </Text>
        </View>
        <View className="space-y-4 w-full">
          <View className="border-2 p-4 border-gray-300 rounded-lg flex flex-row items-center">
            <MaterialIcons
              style={{
                paddingRight: 10,
              }}
              name="alternate-email"
              size={24}
              color="grey"
            />
            <TextInput
              className="flex-1"
              placeholder="UG Email Address"
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View className="border-2 p-4 border-gray-300 rounded-lg flex flex-row items-center">
            <MaterialIcons
              style={{
                paddingRight: 10,
              }}
              name="lock-outline"
              size={24}
              color="grey"
            />
            <TextInput
              className="flex-1"
              placeholder="Password"
              onChangeText={text => setPassword(text)}
            />
          </View>
          <View className="border-2 p-4 border-gray-300 rounded-lg flex flex-row items-center">
            <MaterialIcons
              style={{
                paddingRight: 10,
              }}
              name="lock-outline"
              size={24}
              color="grey"
            />
            <TextInput
              className="flex-1"
              placeholder="Confirm password"
              onChangeText={text => setConfirmPassword(text)}
            />
          </View>
        </View>
        <View className="w-full">
          {isLoading ? (
            <ActivityIndicator
              className="p-5"
              visible={isLoading}
              size={26}
              color={"#133B8A"}
            />
          ) : (
            <TouchableOpacity
              onPress={handleRegister}
              className="p-5 rounded-xl flex items-center bg-[#133B8A]"
            >
              <Text className="text-white font-bold text-">Continue</Text>
            </TouchableOpacity>
          )}
        </View>
        <View className="w-full flex flex-row items-center justify-center">
          <Text>Have an account? </Text>
          <Link href={"/login"}>
            <Text className="text-[#133B8A] font-semibold">Login</Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default Register;
