import * as React from "react";
import { View, Text, StyleSheet } from "react-native";


 const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
       },
});

const Notifications = ({ navigation }) => {
    return ( 
        <>
            <View style={styles.container}>
                <Text onPress={() => navigation.navigate("Home")}>
                    Notifications Screen
                </Text>
            </View>
        </>
    );
}
 
export default Notifications;