import * as React from "react";
import { View, Text, StyleSheet } from "react-native";


 const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
       },
});

const Discussions = ({ navigation }) => {
    return ( 
        <>
            <View style={styles.container}>
                <Text onPress={() => navigation.navigate("Home")}>
                    Discussions Screen
                </Text>
            </View>
        </>
    );
}
 
export default Discussions;