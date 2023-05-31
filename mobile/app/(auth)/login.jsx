import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useRouter } from "expo-router";
import { useState } from "react";

const login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const auth = getAuth();
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View className="w-full h-full flex flex-col items-center justify-center bg-white">
      <View className="w-full flex-col px-4 space-y-4">
        <Text className="text-4xl font-bold">Login</Text>
        <View className="space-y-4 w-full">
          <TextInput
            className="border-2 p-4 border-gray-300 rounded-xl"
            placeholder="Student ID"
            value={text => setEmail(text)}
          />
          <TextInput
            secureTextEntry={true}
            className="border-2 p-3 border-gray-300 rounded-xl"
            placeholder="Password"
            value={text => setPassword(text)}
          />
        </View>
        <View className="w-full">
          <TouchableOpacity className="p-4 rounded-xl flex items-center bg-[#133B8A]">
            <Text className="text-white font-bold text-">Login</Text>
          </TouchableOpacity>
        </View>
        <View className="w-full flex flex-row items-center justify-center">
          <Text>New Here? </Text>
          <Link href={"/register"}>
            <Text className="text-[#133B8A] font-semibold">Register</Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default login;
