import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import Sidebar from "../components/custom-sidebar/custom-sidebar";

// Screens
import Dashboard from "./screens/dashboard-screen";
import MemberScreen from "./screens/member-screen";
import Notifications from "./screens/notifications-screen";
import Discussions from "./screens/discussion-screen";

// constants
import { routes } from "../constants/routes";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width: 330,
        },
        headerStyle: {
          backgroundColor: '#133B8A',
        },
        headerTintColor: 'white',
      }}
      drawerContent={Sidebar}
    >
      <Drawer.Screen  name="Home" component={TabNavigator} />
    </Drawer.Navigator>
  );
};


const TabNavigator = () => {

  return (
    <>
      <Tab.Navigator
        initialRouteName={routes[0].name}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            const { name } = route;
            const { iconName, iconNameOutline } = routes.find((r) => r.name === name);

            return <Ionicons name={focused ? iconName : iconNameOutline} size={20} color={color} />;
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
          <Tab.Screen
              options={() => ({
                headerShown: false
              })}
              key={name}
              name={name}
              component={getScreenComponent(name)}
          />
        ))}
      </Tab.Navigator>
    </>
  );
};

const getScreenComponent = (name) => {
  switch (name) {
    case "Dashboard":
      return Dashboard;
    case "Members":
      return MemberScreen;
    case "Discussions":
      return Discussions;
    case "Notifications":
      return Notifications;
    default:
      return null;
  }
};

export default DrawerNavigator;
