import React, { useContext, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { db } from "../../../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { UserContext } from "../../../../src/contexts/usercontext";

const CreateScreen = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setLoading] = useState(false);

  const { user } = useContext(UserContext);

  const handlePostSubmit = async () => {
    setLoading(true);
    await addDoc(collection(db, "posts"), {
      authorName: user.displayName,
      authorPhotoURL: user.photoURL,
      authorEmail: user.email,
      title,
      body,
      createdAt: Date.now(),
      likes: [],
      comments: 0,
      // timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setLoading(false);
    router.back();
  };

  return (
    <View className="bg-white w-full h-full">
      <View className="flex flex-row items-center justify-between p-3">
        <TouchableOpacity
          onPress={() => {
            console.log("redirecting to create page");
            router.back();
          }}
          className="bg-slate-50 w-10 h-10 rounded-full flex items-center justify-center"
        >
          <MaterialIcons name="close" size={24} color="grey" />
        </TouchableOpacity>
        {isLoading ? (
          <ActivityIndicator
            className="p-5"
            visible={isLoading}
            size={26}
            color={"#133B8A"}
          />
        ) : (
          <TouchableOpacity
            onPress={handlePostSubmit}
            className="bg-[#133B8A] rounded-3xl px-5 py-3"
          >
            <Text className="text-white font-semibold">Send</Text>
          </TouchableOpacity>
        )}
      </View>
      <TextInput
        onChangeText={text => setTitle(text)}
        placeholder="Title"
        className="font-bold text-3xl p-3"
      />
      <TextInput
        onChangeText={text => setBody(text)}
        placeholder="Body (optional)"
        className="p-3"
      />
    </View>
  );
};

export default CreateScreen;
