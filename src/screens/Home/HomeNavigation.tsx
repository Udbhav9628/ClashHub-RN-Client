import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import GameDetailsPage from "./GameDetailsPage";

const Stack = createNativeStackNavigator();
const HomeNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GameDetailsPage"
        component={GameDetailsPage}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
