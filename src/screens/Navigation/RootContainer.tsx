import * as React from "react";
import {
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Auth/Login";
import BottonTabs from "../Navigation/BottonTabs";
import Signup from "../Auth/Signup";
import GameDetailsPage from "../Home/GameDetailsPage";
import Wallet from "../Wallet/Wallet";
import GuildDetails from "../Guilds/GuildDetails";
import Profile from "../Menu/Profile";
import YourGuild from "../Menu/YourGuild";
import YourGuildMatches from "../Menu/YourGuild/YourGuildMatches";
import AllMatches from "../Home/AllMatches";
import GuildMatchesDetails from "../Menu/YourGuild/GuildMatchesDetails";
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { FetchUser } from "../../store/Authentication/Authaction";
import ClubWallet from "../Wallet/ClubWallet";
import SpecificUserProfile from "../Menu/YourGuild/SpecificUserProfile";
import PaymentSucess from "../Wallet/Payment_Sucess";
import GuildScreen from "../Guilds/GuildScreen";
import messaging from '@react-native-firebase/messaging';

const Stack = createStackNavigator();

export default function App() {
  const { sucess, Error } = useSelector(
    (state: any) => state.FetchUser_reducer
  );

  const dispatch = useDispatch();
  const FetchUser_Func = bindActionCreators(FetchUser, dispatch);

  React.useEffect(() => {
    try {
      const Unsubscriber = auth().onAuthStateChanged((user) => {
        if (user) {
          FetchUser_Func(user);
          Unsubscriber();
        } else {
          FetchUser_Func(null);
          Unsubscriber();
        }
      });
    } catch (error) {
      Alert.alert("Error", "Something went wront" + error, [
        {
          text: "OK",
        },
      ]);
    }
  }, []);

  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage.notification?.body && remoteMessage.notification?.title) {
        Alert.alert(remoteMessage.notification?.title, remoteMessage.notification?.body, [
          {
            text: 'OK'
          }
        ])
      }
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer independent={true}>
      {sucess ? (
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
            name="ALLClubsScreen"
            component={GuildScreen}
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
            name="ClubWallet"
            component={ClubWallet}
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
            name="GuildMatchesDetails"
            component={GuildMatchesDetails}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SpecificUserProfile"
            component={SpecificUserProfile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PaymentSucess"
            component={PaymentSucess}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      ) : (
        Error && <Stack.Navigator>
          <Stack.Screen
            name="Register"
            component={Signup}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
