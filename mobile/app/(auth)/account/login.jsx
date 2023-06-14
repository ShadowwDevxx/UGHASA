import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { app } from "../../../firebase";
import { UserContext } from "../../../src/contexts/usercontext";

const login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setLoading] = useState();

  const auth = getAuth(app);
  const router = useRouter();
  const { user, updateUser } = useContext(UserContext);

  const handleLogin = async () => {
    try {
      console.log(email, password);
      setLoading(true);
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("password", password);

      router.push("/Dashboard");
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        position: "bottom",
        text1: `Sorry, user doesn't exist`,
      });
    } finally {
      setLoading(false);
    }
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
          <View className="p-4 rounded-lg flex flex-row items-center border-2 border-gray-300">
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
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={text => setPassword(text)}
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
        <View className="w-full flex flex-row items-center justify-center">
          <Text>Don't have an account? </Text>
          <Link href={"/account/register"}>
            <Text className="text-[#133B8A] font-semibold">Register</Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default login;
