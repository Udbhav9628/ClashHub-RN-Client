import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../../components/Header";
import Home from "../Home/Home";
import MyMatches from "../MyMatches/MyMatches";
import GuildScreen from "../Guilds/GuildScreen";
import Menu from "../Menu/Menu";

const Tab = createBottomTabNavigator();
const BottonTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let Icon_Bottom: any;
          let iconName: any;
          if (route.name === "Home") {
            iconName = focused ? "home-sharp" : "home-outline";
          } else if (route.name === "MyMatches") {
            iconName = focused
              ? "game-controller-sharp"
              : "game-controller-outline";
          } else if (route.name === "Guilds") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Menu") {
            iconName = focused ? "menu-sharp" : "menu-outline";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          header: (props) => (
            <Header
              navigation={props.navigation}
              title={"Clash"}
              title2={"Hub"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyMatches"
        component={MyMatches}
        options={{
          header: (props) => (
            <Header
              navigation={props.navigation}
              title={"My Matches"}
              title2={null}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Guilds"
        component={GuildScreen}
        options={{
          header: (props) => (
            <Header
              navigation={props.navigation}
              title={"Guilds"}
              title2={null}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          header: (props) => (
            <Header
              navigation={props.navigation}
              title={"Menu"}
              title2={null}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottonTabs;
