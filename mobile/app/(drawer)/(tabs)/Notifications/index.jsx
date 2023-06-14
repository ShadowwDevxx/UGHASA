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

const Notifications = () => {
  const router = useRouter();
  return (
    <>
      <View
        className="px-2 pt-5 w-full h-full bg-white space-y-3"
        style={styles.container}
      >
        
      </View>
    </>
  );
};

export default Notifications;
