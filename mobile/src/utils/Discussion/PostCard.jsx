import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  FieldValue,
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { UserContext } from "../../contexts/usercontext";
import { app, db } from "../../../firebase";
import { useRouter } from "expo-router";
import CommentCard from "./CommentCard";
import { FlatList } from "react-native-gesture-handler";

const PostCard = ({ post, id, enableComments }) => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isLiked, setLiked] = useState(post?.likes?.includes(user.email));
  const [body, setBody] = useState("");

  const q = query(collection(db, "comments"), where("postId", "==", id));

  React.useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(q, docs => {
      setComments(docs.docs);
      //   console.log(docs.docs.length);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleLike = async () => {
    console.log(id);
    const stateBeforeLike = isLiked;
    setLiked(!isLiked);

    if (!stateBeforeLike) {
      const postRef = doc(db, "posts", id);
      await updateDoc(postRef, {
        likes: [...post.likes, user.email],
      });
    } else {
      const postRef = doc(db, "posts", id);
      await updateDoc(postRef, {
        likes: post.likes.filter(email => email != user.email),
      });
    }
  };

  const handleCommentSubmit = async () => {
    await addDoc(collection(db, "comments"), {
      postId: id,
      authorName: user.displayName,
      authorPhotoURL: user.photoURL,
      authorEmail: user.email,
      body,
      createdAt: Date.now(),
    });
  };

  useEffect(() => {}, []);

  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/Discussions/${id}`);
      }}
    >
      <View
        className={`w-full min-h-[100px]  mb-2 py-4 rounded-sm px-5  flex flex-col items-start ${
          enableComments ? "bg-white" : " bg-slate-50"
        }`}
      >
        <View className="flex flex-row items-center space-x-2 justify-between w-full">
          <View className="flex flex-row items-center space-x-2">
            <Image
              className="w-7 h-7 rounded-full"
              source={{ uri: post.authorPhotoURL }}
            />
            <Text className="">{post.authorName}</Text>
          </View>
          {isLiked ? (
            <TouchableOpacity onPress={handleLike} className="justify-self-end">
              <MaterialIcons name="favorite" size={24} color="pink" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleLike} className="justify-self-end">
              <MaterialIcons name="favorite-outline" size={24} color="grey" />
            </TouchableOpacity>
          )}
        </View>
        <View className="w-full">
          <Text className="font-bold text-lg">{post.title}</Text>
          <Text>{post.body}</Text>
        </View>
        <View className="py-2 w-full">
          {enableComments || (enableComments && comments.length != 0) ? (
            <View className="w-full">
              <View className="flex flex-row items-center w-full space-x-1 mb-1">
                <TextInput
                  value={body}
                  className="flex-1 p-3 rounded-lg"
                  placeholder="Write a comment..."
                  onChangeText={text => {
                    setBody(text);
                  }}
                />
                <TouchableOpacity
                  onPress={handleCommentSubmit}
                  className="bg-[#133B8A] rounded-3xl px-5 py-3"
                >
                  <Text className="text-white font-semibold">Send</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text className="text-lg font-bold opacity-75">
                  {comments.length} comment(s)
                </Text>
              </View>

              <View className="w-full py-4">
                {isLoading ? (
                  <View className="w-full h-full flex items-center">
                    <ActivityIndicator
                      className="p-5 text-center"
                      visible={isLoading}
                      size={40}
                      color={"#133B8A"}
                    />
                  </View>
                ) : (
                  <FlatList
                    data={comments}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <CommentCard comment={item.data()} />
                    )}
                  />
                )}
              </View>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                router.push(`/Discussions/${id}`);
              }}
              className="rounded-lg w-[140px] flex flex-row items-center "
            >
              <Text className="text-[#133B8A] font-semibold">
                View Comments
              </Text>
              <MaterialIcons name="arrow-drop-down" size={24} color="#133B8A" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PostCard;
