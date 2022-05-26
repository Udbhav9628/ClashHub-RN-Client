import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Auth/Login";
import BottonTabs from "../Navigation/BottonTabs";
import { useSelector } from "react-redux";
import Signup from "../Auth/Signup";
import GameDetailsPage from "../Home/GameDetailsPage";
import Wallet from "../Wallet/Wallet";
import GuildDetails from "../Guilds/GuildDetails";
import Profile from "../Menu/Profile";
import YourGuild from "../Menu/YourGuild";
import YourGuildMatches from "../Menu/YourGuild/YourGuildMatches";
import AllMatches from "../Home/AllMatches";
import Notification from "../Notification/Notification";
import StatusBarComp from "../../components/StatusBar";

const Stack = createStackNavigator();

export default function App() {
  const AuthReducer = useSelector((state: any) => state.AuthReducer);
  return (
    <>
      {/* <StatusBarComp /> */}
      <NavigationContainer independent={true}>
        {AuthReducer.User ? (
          <Stack.Navigator>
            <Stack.Screen
              name="EnterInApp"
              component={BottonTabs}
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
            <Stack.Screen
              name="AllMatches"
              component={AllMatches}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Wallet"
              component={Wallet}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="GuildDetail"
              component={GuildDetails}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="YourProfile"
              component={Profile}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="YourGuild"
              component={YourGuild}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="YourGuildsMatches"
              component={YourGuildMatches}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Notification"
              component={Notification}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Register"
              component={Signup}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
}
