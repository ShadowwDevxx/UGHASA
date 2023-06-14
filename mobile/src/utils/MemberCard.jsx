import { Image, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../contexts/usercontext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

const MemberCard = ({data, id}) => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push(`/Members/${id}`)}>
      <View className="flex flex-row items-center space-x-3 p-3">
        <Image
          className="w-14 h-14 rounded-full "
          source={{ uri: data?.photoURL }}
        />
        <View>
          <Text className="font-bold text-lg">{data?.displayName}</Text>
          <Text>{data?.email}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MemberCard;

const styles = StyleSheet.create({});
