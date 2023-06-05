import { View, Text, StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
   },
});

const Dashboard = () => {
    return ( 
        <>
            <View style={styles.container}>
                <Text onPress={() => alert("This is the Home")}>
                    Home Screen
                </Text>
            </View>
        </>
     );
}
 
export default Dashboard;