import React, { useState, useEffect } from "react";
import AuthLayout from "./AuthLayout";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, SIZES } from "../../constants/Theame";
import FormInput from "./FormInput";
import { validateNumber } from "../../utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Login_User,
  Clear_Auth_Message
} from "../../store/Authentication/Authaction";
import messaging from '@react-native-firebase/messaging';
import getAuth from "@react-native-firebase/auth";
import auth from '@react-native-firebase/auth';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const Login = ({ navigation }: { navigation: any }) => {
  const [Phone_No, setPhone_No] = useState();
  const [Phone_No_Msg, setPhone_No_Msg] = useState("");
  const [Disable, setDisable] = useState(false);
  const [Nowregister, setNowregister] = useState(false)
  const [NavigatetoOTP, setNavigatetoOTP] = useState(false)

  const dispatch = useDispatch();
  const Login_User_Func = bindActionCreators(Login_User, dispatch);

  function HandleOnPress() {
    setDisable(true);
    if (
      Phone_No !== "" &&
      Phone_No_Msg === ""
    ) {
      signInWithPhoneNumber(`+91${Phone_No}`)
      setNavigatetoOTP(true)
    } else if (Phone_No === "") {
      setDisable(false);
      Alert.alert("Error", "Enter Mobile No to Login", [
        {
          text: "OK",
        },
      ]);
    }
  }

  const { loading, sucess, Message } = useSelector(
    (state: any) => state.FetchUser_reducer
  );

  const Clear_Auth_Message_func = bindActionCreators(Clear_Auth_Message, dispatch);

  useEffect(() => {
    if (Message) {
      Clear_Auth_Message_func()
      Alert.alert("Error", Message, [
        {
          text: "OK",
        },
      ]);
    }
  }, [Message])


  const [confirm, setConfirm] = useState({});
  async function signInWithPhoneNumber(phoneNumber: any) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wront" + error, [
        {
          text: "OK",
        },
      ]);
    }
  }

  async function confirmCode(code: any, confirm: any) {
    try {
      const responce = await confirm.confirm(code);
      console.log(responce);
    } catch (error) {
      Alert.alert("Error", 'Invalid code.', [
        {
          text: "OK",
        },
      ]);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      const auths = getAuth();
      const users = auths.currentUser;
      let unsubscribe: any;
      if (users) {
        auth().signOut().then(() => console.log('User signed out!'));
      }
      try {
        unsubscribe = auth().onAuthStateChanged((user) => {
          if (user) {
            setNowregister(true)
          }
        });
      } catch (error) {
        Alert.alert("Error", "Something went wront" + error, [
          {
            text: "OK",
          },
        ]);
      }
      return () => {
        unsubscribe()
      };
    }, [])
  );

  useEffect(() => {
    if (Nowregister) {
      Login()
    }
  }, [Nowregister])

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
      // Clear_Sucess_Func();
      setDisable(false);
      navigation.navigate("EnterInApp");
    }
  }, [sucess]);

  // useEffect(() => {
  //   if (Error) {
  //     Alert.alert("Error", Error, [
  //       {
  //         text: "OK",
  //         onPress: () => {
  //           setDisable(false);
  //           // Clear_Error_Func();
  //         },
  //       },
  //     ]);
  //   }
  // }, [Error]);
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      style={{ backgroundColor: COLORS.white }}
    >
      {NavigatetoOTP ? (<View>
        <AuthLayout
          Title={"OTP Authentication"}
          SubTitle={`An Authentication code has been send to ${Phone_No}`}
        />
        {/* Otp Section */}
        <View style={style.OtpContainer}>
          <OTPInputView
            pinCount={6}
            style={style.OTPInputView}
            codeInputFieldStyle={style.codeInputFieldStyle}
            onCodeFilled={(code) => {
              confirmCode(code, confirm);
            }}
          />
        </View>

        {/* CountDown Timer for OTP */}
        {/* <View style={style.TimerContainer}>
          <Text
            style={{
              marginRight: SIZES.base,
              fontSize: SIZES.h3,
              lineHeight: 22,
            }}
          >
            Didn't recieved code?
          </Text>
          <TouchableOpacity
            onPress={() => {
              setTimer(60);
            }}
            disabled={Timer === 0 ? false : true}
          >
            <Text
              style={{
                color: Timer === 0 ? COLORS.primary : COLORS.gray2,
                fontWeight: "bold",
                fontSize: SIZES.h3,
                lineHeight: 22,
              }}
            >
              {Timer === 0 ? "Resend" : `Resend in ${Timer} s`}
            </Text>
          </TouchableOpacity>
        </View> */}

        {/* Footer Section */}
        <View>
          <TouchableOpacity
            style={style.FooterContainer_Touchable}
          >
            {loading ? (
              <View>
                <ActivityIndicator size="large" color={COLORS.primary} />
              </View>
            ) : (
              <Text
                style={{
                  color: COLORS.white,
                  fontWeight: "bold",
                  fontSize: SIZES.body3,
                  lineHeight: 22,
                }}
              >
                Continue
              </Text>
            )}
          </TouchableOpacity>
        </View>
        {/* Terms And Conditions */}
        <View style={style.TermsandConditions}>
          <Text style={style.TimerContainer_Text}>
            By singinup you agree to our.
          </Text>
          <TouchableOpacity>
            <Text style={style.TermsandConditions_Text2}>
              Terms And Conditions
            </Text>
          </TouchableOpacity>
        </View>
      </View>) : (<>
        <View style={{ marginTop: 50 }}><AuthLayout Title={"Let's Sign You In"} SubTitle={"Login To continue"} /></View>
        <View
          style={{
            flex: 1,
            marginTop: 230,
            paddingHorizontal: SIZES.padding,
          }}
        >
          <FormInput
            label="Mobile"
            Placeholder={"Enter Mobile No"}
            secureTextEntry={false}
            KeyboardType="phone-pad"
            autocomplete="off"
            autoCapatilize={"none"}
            maxLength={15}
            containerStyle={{ marginTop: SIZES.radius }}
            onchange={(Value: any) => {
              validateNumber(Value, setPhone_No_Msg);
              setPhone_No(Value);
            }}
            errorMsg={Phone_No_Msg}
            prepandComponent={null}
            appendComponent={
              null
            }
          />
          {/* Sign In Button */}
          <TouchableOpacity
            style={{
              height: 55,
              alignItems: "center",
              justifyContent: "center",
              marginTop: SIZES.padding,
              borderRadius: SIZES.radius,
              backgroundColor: Disable
                ? COLORS.transparentPrimray
                : COLORS.primary,
            }}
            onPress={HandleOnPress}
            disabled={Disable}
          >
            {loading ? (
              <View>
                <ActivityIndicator size="large" color={COLORS.primary} />
              </View>
            ) : (
              <Text
                style={{
                  color: COLORS.white,
                  fontWeight: "bold",
                  fontSize: SIZES.body3,
                  lineHeight: 22,
                }}
              >
                Login
              </Text>
            )}
          </TouchableOpacity>

          {/* Sign Up */}
          <View
            style={{
              flexDirection: "row",
              marginTop: SIZES.padding,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: SIZES.body4, lineHeight: 22 }}>
              Don't have an Account?{"  "}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text
                style={{
                  fontSize: SIZES.h3,
                  lineHeight: 22,
                  color: COLORS.primary,
                  fontWeight: "bold",
                }}
              >
                Register Here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>)}
    </ScrollView>
  );
};

export default Login;

const style = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  OtpContainer: {
    marginTop: SIZES.padding,
  },
  OTPInputView: {
    height: "10%",
  },
  codeInputFieldStyle: {
    width: 65,
    height: 65,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.transparentBlack1,
    fontSize: SIZES.h3,
    lineHeight: 22,
  },
  TimerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: SIZES.padding,
  },
  TimerContainer_Text: {
    color: COLORS.darkGray,
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  FooterContainer_Touchable: {
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SIZES.padding,
    marginHorizontal: SIZES.padding,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
  },
  FooterContainer_Text: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  TermsandConditions: {
    marginTop: SIZES.padding,
    alignItems: "center",
  },
  TermsandConditions_Text: {
    color: COLORS.darkGray,
    fontSize: SIZES.h4,
    lineHeight: 22,
  },
  TermsandConditions_Text2: {
    color: COLORS.primary,
    fontSize: SIZES.h4,
    lineHeight: 22,
  },
});
