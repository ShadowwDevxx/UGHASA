import { Tabs } from "expo-router";
import { routes } from "../../../src/constants/routes";
import { HeaderButtons } from "react-navigation-header-buttons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function TabLayout() {
  const navigation = useNavigation();
  return (
    <>
      <StatusBar style="light" />
      <Tabs
        initialRouteName={routes[0].name}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            const { name } = route;
            const currentRoute = routes.find(r => r.name === name);

            if (!currentRoute) {
              return null;
            }
            const { iconName, iconNameOutline } = currentRoute;
            return (
              <Ionicons
                name={focused ? iconName : iconNameOutline}
                size={20}
                color={color}
              />
            );
          },
          tabBarInactiveTintColor: "grey",
          tabBarActiveTintColor: "#133B8A",
          tabBarStyle: {
            padding: 10,
            height: 60,
            backgroundColor: "white",
          },
          tabBarLabelStyle: [{ paddingBottom: 7, fontSize: 10 }],
        })}
      >
        {routes.map(({ name }) => (
          <Tabs.Screen
            options={() => ({
              headerStyle: {
                backgroundColor: "#133B8A",
              },
              headerTitleStyle: {
                fontWeight: "light",
              },
              headerTintColor: "#fff",
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.openDrawer();
                  }}
                >
                  <HeaderButtons>
                    {/* Bind it to this icon */}
                    <Ionicons
                      name="menu"
                      size={30}
                      color="#ffff"
                      style={{ marginLeft: 7, alignItems: "center" }}
                    />
                  </HeaderButtons>
                </TouchableOpacity>
              ),
            })}
            key={name}
            name={name}
          />
        ))}
      </Tabs>
    </>
  );
}
