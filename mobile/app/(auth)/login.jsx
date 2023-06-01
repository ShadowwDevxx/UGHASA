import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { app } from "../../firebase";

const login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setLoading] = useState()

  const auth = getAuth(app);
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
      <View className="w-full flex-col px-4 space-y-5">
        <View className="space-y-2">
          <Text className="text-3xl font-bold">Welcome Back 👋</Text>
          <Text className="text-gray-500">
            You can continue where you left off by loggin in.
          </Text>
        </View>
        <View className="space-y-5 w-full">
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
              value={text => setEmail(text)}
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
              secureTextEntry={true}
              placeholder="Password"
              value={text => setPassword(text)}
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
              onPress={handleLogin}
              className="p-5 rounded-xl flex items-center bg-[#133B8A]"
            >
              <Text className="text-white font-bold text-">Login</Text>
            </TouchableOpacity>
          )}
        </View>
        {/* <View className="w-full">
          <TouchableOpacity className="p-5 rounded-lg flex items-center bg-[#133B8A]">
            <Text className="text-white font-bold">Sign In</Text>
          </TouchableOpacity>
        </View> */}
        <View className="w-full flex flex-row items-center justify-center">
          <Text>Don't have an account? </Text>
          <Link href={"/register"}>
            <Text className="text-[#133B8A] font-semibold">Register</Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default login;
