import React, { useState, useEffect } from "react";
import AuthLayout from "./AuthLayout";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator
} from "react-native";
import { COLORS, SIZES, Dpheight } from "../../constants/Theame";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Login_User,
  Clear_Auth_Error
} from "../../store/Authentication/Authaction";
import messaging from '@react-native-firebase/messaging';
import getAuth from "@react-native-firebase/auth";
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin
} from '@react-native-google-signin/google-signin';
import Icon from "react-native-vector-icons/AntDesign";

const Login = ({ navigation }: { navigation: any }) => {
  const [Disable, setDisable] = useState(false);

  const dispatch = useDispatch();
  const Login_User_Func = bindActionCreators(Login_User, dispatch);
  const Clear_Auth_Error_Func = bindActionCreators(Clear_Auth_Error, dispatch);

  async function onGoogleButtonPress() {
    try {
      setDisable(true);
      await GoogleSignin.signOut();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      Login();
    } catch (error) {
      setDisable(false);
      Alert.alert("Error", "Something went wront" + error, [
        {
          text: "OK",
        },
      ]);
    }
  }


  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '624037012209-e0hlc0kf2bcfhohn976tu9um2obvjn30.apps.googleusercontent.com',
    });
  }, []);

  const { sucess, Message } = useSelector(
    (state: any) => state.FetchUser_reducer
  );

  useEffect(() => {
    if (Message) {
      Clear_Auth_Error_Func();
      Alert.alert(
        "Error",
        Message,
        [
          {
            text: "OK",
          },
        ]
      );
    }
  }, [Message]);

  async function Login() {
    await messaging().registerDeviceForRemoteMessages();
    const Msgtoken = await messaging().getToken();

    const auths = getAuth();
    const Currentuser = auths.currentUser;
    if (Currentuser) {
      const AuthToken = await Currentuser?.getIdToken()
      Login_User_Func(Msgtoken, AuthToken);
    }
  }

  useEffect(() => {
    if (sucess) {
      navigation.navigate("EnterInApp");
    }
  }, [sucess]);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      style={{ backgroundColor: COLORS.white }}
    >
      <View style={{ marginTop: "0%" }}><AuthLayout Title={"Welcome To ClashHub"} SubTitle={"Play Host Watch Earn"} />
        <View
          style={{
            marginTop: 320,
            paddingHorizontal: SIZES.padding,
          }}
        >
          {/* Sign In Button */}
          <TouchableOpacity
            style={{
              height: Dpheight(6.9),
              alignItems: "center",
              justifyContent: "center",
              marginTop: SIZES.padding,
              borderRadius: SIZES.radius,
              backgroundColor: Disable
                ? COLORS.transparentPrimray
                : COLORS.primary,
            }}
            onPress={onGoogleButtonPress}
            disabled={Disable}
          >
            {Disable ? (<View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color={COLORS.primary} />
            </View>) : (<View style={{ flexDirection: 'row' }}>
              <Icon name="google" size={26} color="white" />
              <Text
                style={{
                  textAlignVertical: "center",
                  marginLeft: 5,
                  color: COLORS.white,
                  fontWeight: "bold",
                  fontSize: SIZES.body3,
                }}
              >
                Login With Google
              </Text>
            </View>)}
          </TouchableOpacity>
        </View>
        {/* Register */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
          style={{
            flexDirection: "row",
            marginTop: 5,
            paddingTop: 17,
            paddingBottom: 180,
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: SIZES.h3 }}>
            Don't have an Account?{"  "}
          </Text>
          <View
          >
            <Text
              style={{
                fontSize: SIZES.h3,
                color: COLORS.primary,
                fontWeight: "bold",
              }}
            >
              Register Here
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;


