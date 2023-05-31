import { Text, TouchableOpacity, View } from "react-native";
import {useRouter} from "expo-router"

export default function Page() {
  const router = useRouter() 
  return (
    <View className = "bg-red-300 h-full flex items-center justify-center">
      <View>
        <Text>Yoooo React native app router</Text>
        <Text>This is the first page of your app.</Text>
        <TouchableOpacity
       onPress={() => router.push('/login')} 
        >
          <Text>Go to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
