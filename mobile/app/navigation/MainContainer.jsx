// import * as React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { HeaderButtons } from "react-navigation-header-buttons";
// import Ionicons from "react-native-vector-icons/Ionicons";


// // Screens
// import Dashboard from "./screens/Dashboard";
// import MemberScreen from "./screens/MemberScreen";
// import Notifications from "./screens/Notifications";
// import Discussions from "./screens/Discussions";

// // constants
// import { routes } from "../constants/routes";

// const Tab = createBottomTabNavigator();


// const MainContainer = ({ navigation }) => {

//   return (
//     <>
//       <Tab.Navigator
//         initialRouteName={routes[0].name}
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color }) => {
//             const { name } = route;
//             const { iconName, iconNameOutline } = routes.find((r) => r.name === name);

//             return <Ionicons name={focused ? iconName : iconNameOutline} size={20} color={color} />;
//           },
//           tabBarInactiveTintColor: "grey",
//           tabBarActiveTintColor: "#133B8A",
//           tabBarStyle: {
//             padding: 10,
//             height: 60,
//             backgroundColor: "white",
//           },
//           tabBarLabelStyle: [{ paddingBottom: 7, fontSize: 10 }],
//         })}
//       >
//         {routes.map(({ name }) => (
//           <Tab.Screen
//             options={({ navigation }) => ({
//               headerStyle: {
//                 backgroundColor: "#133B8A",
//               },
//               headerTitleStyle: {
//                 fontWeight: 'light',
//               },
//               headerTintColor: "#fff",
//               headerLeft: () => (
//                 <HeaderButtons>
//                   {/* Bind it to this icon */}
//                  <Ionicons
//                     name="menu"
//                     size={30}
//                     color="#ffff"
//                     style={{ marginLeft: 7, alignItems:"center" }}
//                   />
//                 </HeaderButtons>
//               ),
//             })}
//             key={name}
//             name={name}
//             component={getScreenComponent(name)}
//           />
//         ))}
//       </Tab.Navigator>
//     </>
//   );
// };

// const getScreenComponent = (name) => {
//   switch (name) {
//     case "Dashboard":
//       return Dashboard;
//     case "Members":
//       return MemberScreen;
//     case "Discussions":
//       return Discussions;
//     case "Notifications":
//       return Notifications;
//     default:
//       return null;
//   }
// };

// export default MainContainer;
