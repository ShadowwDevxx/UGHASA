import { View, Text } from "react-native";
import { useContext } from "react";
import { UserContext } from "../../../components/contexts/usercontext";
import { Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Dashboard = () => {

    const { user } = useContext(UserContext);
    const router = useRouter();

    const handleSignOut = async () => {
        try {
          const displayName = user.displayName;
          await auth.signOut();
          await AsyncStorage.removeItem("email");
          await AsyncStorage.removeItem("password");
    
          Toast.show({
            type: "success",
            position: "bottom",
            text1: `Logged Out ${displayName}`,
          });
          router.push("/login");
        } catch (error) {
          console.log(error);
        }
      };


    return ( 
        <>
        <View className="h-full w-full flex items-center justify-center">
            <View className="mb-3">
                <Image className="w-20 h-20 rounded-full" source={{ uri: user.photoURL }} />
            </View>
            <Text className="flex text-[#133B8A] text-2xl font-semibold mb-4 "> Welcome, {user.displayName} 👋</Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
                <Text className="text-md font-semibold">Sign out</Text>
            </TouchableOpacity>
        </View>
        </>
     );
}
 
export default Dashboard;