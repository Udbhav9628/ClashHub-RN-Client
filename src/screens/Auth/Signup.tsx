import React, { useState, useEffect } from "react";
import AuthLayout from "./AuthLayout";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet
} from "react-native";
import { COLORS, SIZES } from "../../constants/Theame";
import FormInput from "./FormInput";
import { validateNumber } from "../../utils/Utils";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import getAuth from "@react-native-firebase/auth";
import OTPInputView from '@twotalltotems/react-native-otp-input';
import messaging from '@react-native-firebase/messaging';
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Register_User,
  Clear_Auth_Error,
  Clear_Auth_Sucess,
} from "../../store/Authentication/Authaction";

const Signup = ({ navigation }: { navigation: any }) => {
  const [Name, setName] = useState("");
  const [UserName, setUserName] = useState("");
  const [Phone_No, setPhone_No] = useState();
  const [Phone_No_Msg, setPhone_No_Msg] = useState("");
  const [NavigatetoOTP, setNavigatetoOTP] = useState(false)
  const [Nowregister, setNowregister] = useState(false)

  const dispatch = useDispatch();
  const Register_User_func = bindActionCreators(Register_User, dispatch);

  async function HandleOnPress() {
    if (
      Name !== "" &&
      UserName !== "" &&
      Phone_No !== "" &&
      Phone_No_Msg === ""
    ) {
      console.log(`+91${Phone_No}`);

      signInWithPhoneNumber(`+91${Phone_No}`)
      setNavigatetoOTP(true)
    } else if (Name === "" || Phone_No === "" || UserName === "") {
      Alert.alert("Error", "Fill All Details First", [{ text: "OK" }]);
    } else if (Phone_No !== "") {
      Alert.alert("Error", "Phone_No is Less 10 characters", [{ text: "OK" }]);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(user: any) {
    if (user) {
      setNowregister(true)
    }
  }

  useEffect(() => {
    if (Nowregister) {

      Register()
    }
  }, [Nowregister])


  async function Register() {
    await messaging().registerDeviceForRemoteMessages();
    const Msgtoken = await messaging().getToken();

    const auths = getAuth();
    const User = auths.currentUser;
    const AuthToken = await User?.getIdToken()
    const Data = {
      Name,
      UserName,
      Phone_No: `+91${Phone_No}`,
      FCMToken: Msgtoken
    }
    Register_User_func(Data, AuthToken)
  }

  const [confirm, setConfirm] = useState({});

  async function signInWithPhoneNumber(phoneNumber: any) {
    console.log('In Function');
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
      // console.log(responce);
      // Register();
    } catch (error) {
      console.log('Invalid code.');
    }
  }



  // const [Timer, setTimer] = useState(60);
  // useEffect(() => {
  //   let Intervel = setInterval(() => {
  //     console.log('In Interval');

  //     setTimer((prevtimer) => {
  //       if (prevtimer > 0) {
  //         return prevtimer - 1;
  //       } else {
  //         return prevtimer;
  //       }
  //     });
  //   }, 1000);
  //   return () => {
  //     clearInterval(Intervel);
  //   };
  // }, []); //Runs only for The First Time

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      style={{ backgroundColor: COLORS.white, flex: 1 }}
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
            onPress={() => navigation.navigate("homes")}
          >
            <Text style={style.FooterContainer_Text}>Continue</Text>
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
      </View>) : (<View>
        <AuthLayout
          Title={"Getting Started"}
          SubTitle={"create an account to continue"}
        />
        <View
          style={{
            flex: 1,
            marginTop: 5,
            paddingHorizontal: SIZES.padding,
          }}
        >
          {/* Name */}
          <FormInput
            containerStyle={{}}
            label="Name"
            Placeholder={"Your Full Name"}
            KeyboardType="default"
            autocomplete="off"
            maxLength={30}
            autoCapatilize={"words"}
            secureTextEntry={false}
            onchange={(Value: any) => {
              const text = Value.replace(/\s{2,}/g, ' ').trim()
              setName(text);
            }}
            errorMsg={""}
            prepandComponent={null}
            appendComponent={null
            }
          />
          {/* UserName */}
          <FormInput
            containerStyle={{ marginTop: SIZES.radius }}
            label="Username"
            Placeholder={"Create Username"}
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
          {/* mobile */}
          <FormInput
            label="Mobile"
            Placeholder={"Enter Mobile No"}
            secureTextEntry={false}
            KeyboardType="phone-pad"
            maxLength={15}
            autocomplete="off"
            autoCapatilize={"none"}
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
          {/* Sign In */}
          <TouchableOpacity
            style={{
              height: 55,
              alignItems: "center",
              justifyContent: "center",
              marginTop: SIZES.padding,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.primary,
            }}
            onPress={HandleOnPress}
          >
            <Text
              style={{
                color: COLORS.white,
                fontWeight: "bold",
                fontSize: SIZES.body3,
                lineHeight: 22,
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>

          {/* Sign In */}
          <View
            style={{
              flexDirection: "row",
              marginTop: SIZES.padding,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: SIZES.body4, lineHeight: 22 }}>
              If you already have an Account?{"  "}
            </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text
                style={{
                  fontSize: SIZES.h3,
                  lineHeight: 22,
                  color: COLORS.primary,
                  fontWeight: "bold",
                }}
              >
                Login Here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>)}

    </ScrollView>
  );
};

export default Signup;

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
