import { useRouter } from "expo-router";
import * as React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import SearchInput from "../../../../src/utils/SearchInput";
import MemberCard from "../../../../src/utils/MemberCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../firebase";
import { FlatList } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

const MemberScreen = () => {
  const router = useRouter();
  const [members, setMembers] = React.useState([]);
  const [searchQuery, setQuery] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);

  console.log(members);
  const q = searchQuery
    ? query(collection(db, "users"))
    : query(collection(db, "users"));

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const q = searchQuery
          ? query(
              collection(db, "users"),
              where("displayName", ">=", searchQuery)
            )
          : query(collection(db, "users"));

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMembers(data);
      } catch (error) {
        console.log("Error fetching members:", error);
      }

      setLoading(false);
    };

    fetchData();
  }, [searchQuery]);

  return (
    <>
      <View className="px-2 pt-5 space-y-3" style={styles.container}>
        <View className>
          <SearchInput searchQuery={searchQuery} setQuery={setQuery} />
        </View>
        <View className="flex items-center">
          <Text className="text-[12px] text-gray-300 font-semibold">
            Search and network with other users
          </Text>
        </View>
        <View>
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
              data={members}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <MemberCard key={item.id} data={item} id={item.id} />
              )}
            />
          )}

          {members.length == 0 && searchQuery != "" && (
            <View className="w-full flex items-center justify-center">
              <Text>No results for "{searchQuery}"</Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default MemberScreen;
