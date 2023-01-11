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
import { COLORS, Dpheight, SIZES } from "../../constants/Theame";
import FormInput from "./FormInput";
import getAuth from "@react-native-firebase/auth";
import messaging from '@react-native-firebase/messaging';
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Register_User, Clear_Auth_Error } from "../../store/Authentication/Authaction";
import {
  GoogleSignin
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Icon from "react-native-vector-icons/AntDesign";

const Signup = ({ navigation }: { navigation: any }) => {
  const [UserName, setUserName] = useState("");

  const [Disable, setDisable] = useState(false);

  const dispatch = useDispatch();
  const Register_User_func = bindActionCreators(Register_User, dispatch);
  const Clear_Auth_Error_Func = bindActionCreators(Clear_Auth_Error, dispatch);

  const { loading, sucess, Message } = useSelector(
    (state: any) => state.FetchUser_reducer
  );

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '624037012209-e0hlc0kf2bcfhohn976tu9um2obvjn30.apps.googleusercontent.com',
    });
  }, []);

  async function onGoogleButtonPress() {
    try {
      if (UserName.length < 3) {
        Alert.alert("Error", "Please Enter UserName of Atleast 3 Character", [
          {
            text: "OK",
          },
        ]);
        return;
      }
      setDisable(true);
      await GoogleSignin.signOut();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const User = await auth().signInWithCredential(googleCredential);
      Register(User.user.displayName, User.user.email, User.user.photoURL)
    } catch (error) {
      setDisable(false);
      Alert.alert("Error", "Something went wront" + error, [
        {
          text: "OK",
        },
      ]);
    }
  }

  async function Register(Name: string | null, Email: string | null, PhotoUrl: string | null) {
    await messaging().registerDeviceForRemoteMessages();
    const Msgtoken = await messaging().getToken();

    const auths = getAuth();
    const CurrentUser = auths.currentUser;
    if (CurrentUser) {
      const AuthToken = await CurrentUser?.getIdToken()
      const Data = {
        Name,
        Email,
        UserName,
        PhotoUrl,
        FCMToken: Msgtoken
      }
      Register_User_func(Data, AuthToken)
    }
  }

  useEffect(() => {
    if (sucess) {
      navigation.navigate("EnterInApp");
    }
  }, [sucess]);

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


  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      style={{ backgroundColor: COLORS.white, flex: 1 }}
    >
      <View>
        <AuthLayout
          Title={"Getting Started"}
          SubTitle={"Create an account to continue"}
        />
        <View
          style={{
            flex: 1,
            marginTop: 220,
            paddingHorizontal: 22,
          }}
        >
          {/* UserName */}
          <FormInput
            containerStyle={{ marginTop: SIZES.radius }}
            label="Username"
            Placeholder={"Choose Unique Username"}
            KeyboardType="default"
            autocomplete="off"
            maxLength={25}
            autoCapatilize={"none"}
            secureTextEntry={false}
            onchange={(Value: any) => {
              const text = Value.replace(/\s{2,}/g, ' ').trim()
              setUserName(text);
            }}
            errorMsg={""}
            prepandComponent={null}
            appendComponent={null
            }
          />
          {/* Sign In */}
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
          >{Disable ? (<View
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
              Sign Up With Google
            </Text>
          </View>)}
          </TouchableOpacity>

          {/* Sign In */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={{
              flexDirection: "row",
              marginTop: 5,
              paddingTop: 17,
              paddingBottom: 180,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: SIZES.h3 }}>
              Already have an Account?{"  "}
            </Text>
            <View>
              <Text
                style={{
                  fontSize: SIZES.h3,
                  color: COLORS.primary,
                  fontWeight: "bold",
                }}
              >
                Login Here
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  );
};

export default Signup;
