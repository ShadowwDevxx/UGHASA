import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { updateProfile, getAuth } from "firebase/auth";
import { app, db } from "../../../firebase";
import { useRouter } from "expo-router";
import { UserContext } from "../../../src/contexts/usercontext";

const Onboard = () => {
  const [imgSrc, setImgSrc] = useState("");
  const [studentId, setStudentId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();
  const { user } = useContext(UserContext);

  const uploadImageToBucket = async uri => {
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });

      const fileRef = ref(getStorage(app), `${Date.now()}`);
      const result = await uploadBytes(fileRef, blob);

      blob.close();

      return await getDownloadURL(fileRef);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleImageSelect = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImgSrc(result.assets[0].uri);
    }
  };

  const handleProfileSetup = async () => {
    try {
      setLoading(true);

      const photoURL = await uploadImageToBucket(imgSrc);

      console.log("starting");

      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
        photoURL,
      });

      router.push("/home");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="w-full h-full flex flex-col items-center justify-center bg-white">
      <View className="w-full flex-col px-4 space-y-4">
        <View className="space-y-2">
          <Text className="text-3xl font-bold">Profile Setup ✨</Text>
          <Text className="text-gray-500">
            Almost there. Just finish setting up
          </Text>
        </View>

        <View className="space-y-4 w-full">
          <View>
            <TouchableOpacity
              onPress={handleImageSelect}
              className="w-16 h-16 flex items-center justify-center bg-gray-300 rounded-full"
            >
              {imgSrc ? (
                <Image
                  className="w-full h-full rounded-full"
                  source={{
                    uri: imgSrc,
                  }}
                />
              ) : (
                <MaterialIcons name="camera-alt" size={28} color="grey" />
              )}
            </TouchableOpacity>
          </View>

          <View className="border-2 p-4 border-gray-300 rounded-lg flex flex-row items-center">
            <MaterialIcons
              style={{
                paddingRight: 10,
              }}
              name="person-outline"
              size={24}
              color="grey"
            />
            <TextInput
              className="flex-1"
              placeholder="Student ID"
              onChangeText={text => setStudentId(text)}
            />
          </View>
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
              placeholder="First Name"
              onChangeText={text => setFirstName(text)}
            />
          </View>
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
              placeholder="Last Name"
              onChangeText={text => setLastName(text)}
            />
          </View>
        </View>

        <View className="w-full">
          {isLoading ? (
            <View className="flex flex-row items-center justify-center">
              <Text className="pl-5 text-black">
                {" "}
                Setting up your profile...{" "}
              </Text>
              <ActivityIndicator
                className="p-5"
                visible={isLoading}
                size={26}
                color={"#133B8A"}
              />
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleProfileSetup}
              className="p-5 rounded-xl flex items-center bg-[#133B8A]"
            >
              <Text className="text-white font-bold text-">Finish</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Onboard;
