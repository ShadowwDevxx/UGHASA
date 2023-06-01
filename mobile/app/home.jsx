import { Link } from "expo-router";
import React, { useContext } from "react";
import { View, Text, Image } from "react-native";
import { UserContext } from "../components/contexts/usercontext";

const Home = () => {
  const { user } = useContext(UserContext);
  return (
    <View>
      <Text>Home screen</Text>
      <Text> Welcome , {user.email}</Text>
      <Text> username, {user.displayName}</Text>
      <View>
        <Image className="w-16 h-16" source={{ uri: user.photoURL }} />
      </View>
      <Link href={"/login"}>Go to login</Link>
    </View>
  );
};

export default Home;
