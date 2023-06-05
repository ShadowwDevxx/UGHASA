import * as React from "react";
import { View, Text } from "react-native";


const SettingScreen = () => {
    return ( 
        <>
            <View className="flex flex-1 items-center justify-center">
                <Text
                    onPress={() => navigation.navigate("Home")}
                    className="text-lg font-bold">
                    Settings Screen
                </Text>
            </View>
        </>
    );
}
 
export default SettingScreen;