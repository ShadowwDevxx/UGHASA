import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import React, { useContext, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { app } from "../../../firebase";
import { UserContext } from "../../../src/contexts/usercontext";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import Ionicons from "react-native-vector-icons/Ionicons";

const Verify = () => {
  const [isLoading, setLoading] = useState(false);

  const { user } = useContext(UserContext);
  const router = useRouter();
  const auth = getAuth(app);

  const handleVerification = async () => {
    setLoading(true);
    await auth.currentUser.reload();

    if (!auth.currentUser) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: `Account not verified!`,
      });
      console.log("you aren't verified");
      setLoading(false);
      return;
    }
    if (auth.currentUser.emailVerified) {
      router.push("/onboard/onboard");
    } else {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: `Account not verified!`,
      });
    }
    setLoading(false);
  };
  return (
    <View className="w-full h-full flex flex-col items-center justify-center bg-white">
      <View className="w-full flex-col px-4 space-y-5">
        <View className="space-y-2 w-full flex items-center">
          <View>
            <Ionicons
              name="mail"
              size={50}
              color="black"
              style={{ marginLeft: 7, alignItems: "center" }}
            />
          </View>
          <Text className="text-3xl font-bold text-center">
            Verify your email address
          </Text>
          <Text className="text-gray-500 text-center">
            You've entered <Text className="font-bold">{user.email}</Text> as
            the email address for your account. Please verify this email by
            clicking the link sent to you and clicking the button below.
          </Text>
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
              onPress={handleVerification}
              className="p-5 rounded-xl flex items-center bg-[#133B8A]"
            >
              <Text className="text-white font-bold text-">Verify</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Verify;
