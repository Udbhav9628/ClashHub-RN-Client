import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../../components/Header";
import Home from "../Home/Home";
import MyMatches from "../MyMatches/MyMatches";
import GuildScreen from "../Guilds/GuildScreen";
import Menu from "../Menu/Menu";
import { Dpheight } from "../../constants/Theame";
import HomeScreen from "../Videos/HomeScreen";

const Tab = createBottomTabNavigator();
const BottonTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName: any;
          if (route.name === "Home") {
            iconName = focused ? "home-sharp" : "home-outline";
          } else if (route.name === "MyMatches") {
            iconName = focused
              ? "game-controller-sharp"
              : "game-controller-outline";
          } else if (route.name === "Videos") {
            iconName = focused
              ? "ios-videocam"
              : "ios-videocam-outline";
          } else if (route.name === "Guilds") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Menu") {
            iconName = focused ? "menu-sharp" : "menu-outline";
          }
          return <Icon name={iconName} size={Dpheight(3.1)} color={color} />;
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
              title={"Clubs"}
              title2={null}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Videos"
        component={HomeScreen}
        options={{
          header: (props) => (
            <Header
              navigation={props.navigation}
              title={"Match's"}
              title2={" Videos"}
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
