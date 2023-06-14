import { useRouter } from "expo-router";
import * as React from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { UserContext } from "../../../../src/contexts/usercontext";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../../firebase";
import PostCard from "../../../../src/utils/Discussion/PostCard";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

const Discussions = () => {
  const router = useRouter();
  const { user } = React.useContext(UserContext);
  const [posts, setPosts] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  const q = query(collection(db, "posts"));

  React.useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(q, docs => {
      setPosts(docs.docs);
      console.log(docs.docs.length);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <View className="px-2" style={styles.container}>
        <View className="w-full p-4 flex flex-row items-center justify-between">
          <Text className="text-xl font-semibold opacity-75">Recent</Text>
          <View className="flex flex-row items-center space-x-3">
            <TouchableOpacity
              onPress={() => {
                console.log("redirecting to create page");
                router.push("/Discussions/create");
              }}
              className="bg-slate-50 w-10 h-10 rounded-full flex items-center justify-center"
            >
              <MaterialIcons name="add" size={24} color="grey" />
            </TouchableOpacity>

            <TouchableOpacity className="bg-slate-50 w-10 h-10 rounded-full flex items-center justify-center">
              <MaterialIcons name="sort" size={24} color="grey" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="w-full px-2 py-2 h-full flex items-start">
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
              showsVerticalScrollIndicator={false}
              data={posts}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <PostCard post={item.data()} id={item.id} />
              )}
            />

          )}
        </View>
      </View>
    </>
  );
};

export default Discussions;
