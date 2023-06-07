import { useRouter } from "expo-router";
import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const MemberScreen = () => {
  const router = useRouter();
  return (
    <>
      <View style={styles.container}>
        <Text onPress={() => router.push("/dashboard")}>Members Screen</Text>
      </View>
    </>
  );
};

export default MemberScreen;
