import { useSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import PostCard from "../../../../src/utils/Discussion/PostCard";
import { doc, getDoc, query } from "firebase/firestore";
import { db } from "../../../../firebase";

const DetailedScreen = () => {
  const [post, setPost] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { id } = useSearchParams();

  const q = query(doc(db, "posts", id));

  useEffect(() => {
    setLoading(true);
    getDoc(q).then(res => {
      console.log(res.data());
      setPost(res.data());
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
    <View className="bg-white w-full h-full">
      <PostCard post={post} id={id} enableComments={true} />
    </View>
  );
};

export default DetailedScreen;
