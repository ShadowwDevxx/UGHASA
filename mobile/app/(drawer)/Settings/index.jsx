import { useRouter } from "expo-router";
import { View, Text } from "react-native";

const Settings = () => {
  const router = useRouter();
  return (
    <>
      <View className="flex flex-1 items-center justify-center">
        <Text
          onPress={() => router.push("/Dashboard")}
          className="text-lg font-bold"
        >
          Settings Screen
        </Text>
      </View>
    </>
  );
};

export default Settings;
