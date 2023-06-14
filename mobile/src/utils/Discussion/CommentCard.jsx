import React from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const CommentCard = ({ comment }) => {
  return (
    <View className="w-full min-h-[50px] bg-white rounded-sm px-5 flex flex-col items-start mb-3">
      <View className="flex flex-row items-center space-x-2 justify-between w-full">
        <View className="flex flex-row items-center space-x-2">
          <Image
            className="w-7 h-7 rounded-full"
            source={{ uri: comment.authorPhotoURL }}
          />
          <View className="pt-4">
            <Text className="">{comment.authorName}</Text>
            <View className="w-full">
              <Text className="font-semibold">{comment.body}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CommentCard;
