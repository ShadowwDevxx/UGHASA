import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Stack, useSearchParams } from "expo-router";
import { UserContext } from "../../../../src/contexts/usercontext";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../../firebase";

const MemberProfile = () => {
  const { user } = useContext(UserContext);
  const [member, setMember] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { id } = useSearchParams();

  const q = query(doc(db, "users", id));

  useEffect(() => {
    setLoading(true);
    getDoc(q).then(res => {
      setMember(res.data());
      setLoading(false);
    });
  }, []);

  return isLoading ? (
    <View className="w-full h-full flex items-center">
      <ActivityIndicator
        className="p-5 text-center"
        visible={isLoading}
        size={40}
        color={"#133B8A"}
      />
    </View>
  ) : (
    <View className="w-full h-full items-center pt-5 bg-white">
      <View className="space-y-2 w-full px-3">
        <View className="flex flex-col items-center space-y-4">
          <View className="rounded-full p-1">
            <Image
              className="w-28 h-28 rounded-full border-4"
              source={{ uri: member?.photoURL }}
            />
          </View>

          <View className="flex flex-col items-center space-y-1">
            <Text className="text-xl font-bold">{member?.displayName}</Text>
            <Text className="text-gray-400 font-semibold">{member?.email}</Text>
          </View>
        </View>
        <View className="px-5">
          <Text className="text-center"></Text>
        </View>
        <View className="space-y-1 py-5 w-full">
          <TouchableOpacity>
            <View className="flex flex-row items-center bg-gray-50 p-3 rounded-t-2xl space-x-5">
              <MaterialIcons
                style={{
                  paddingRight: 10,
                }}
                name="cake"
                size={30}
                color="#133B8A"
              />
              <Text>Joined June 2023</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View className="flex flex-row items-center bg-gray-50 p-3 space-x-5">
              <MaterialIcons
                style={{
                  paddingRight: 10,
                }}
                name="phone"
                size={30}
                color="#133B8A"
              />
              <Text>+233 {member.phoneNumber}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View className="flex flex-row items-center bg-gray-50 p-3 space-x-5">
              <MaterialIcons
                style={{
                  paddingRight: 10,
                }}
                name="school"
                size={30}
                color="#133B8A"
              />
              <Text>Level {member.level}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View className="flex flex-row items-center bg-gray-50 p-3 rounded-b-xl space-x-5">
              <MaterialIcons
                style={{
                  paddingRight: 10,
                }}
                name="person"
                size={30}
                color="#133B8A"
              />
              <Text>{member?.studentId}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MemberProfile;

const styles = StyleSheet.create({});
