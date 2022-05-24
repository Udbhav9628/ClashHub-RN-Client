import React, { useState, useEffect } from "react";
import AuthLayout from "./AuthLayout";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { COLORS, SIZES } from "../../constants/Theame";
import FormInput from "./FormInput";
import { validateEmail, validatePassword } from "../../utils/Utils";
import SignwithGoogle from "./SignwithGoogle";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Login_User,
  Clear_Auth_Error,
  Clear_Auth_Sucess,
} from "../../store/Authentication/Authaction";
import Icons from "../../constants/Icons";

const Login = ({ navigation }: { navigation: any }) => {
  const [Email, setEmail] = useState("udbhav9628@gmail.com");
  const [Password, setPassword] = useState("Udbhav9628");
  const [PassworderrMsg, setPassworderrMsg] = useState("");
  const [EmailerrMsg, setEmailerrMsg] = useState("");
  const [ShowPassword, setShowPassword] = useState(false);

  const [Disable, setDisable] = useState(false);

  const dispatch = useDispatch();
  const Login_User_Func = bindActionCreators(Login_User, dispatch);
  const Clear_Error_Func = bindActionCreators(Clear_Auth_Error, dispatch);
  const Clear_Sucess_Func = bindActionCreators(Clear_Auth_Sucess, dispatch);

  function HandleOnPress() {
    setDisable(true);
    if (
      Email !== "" &&
      Password !== "" &&
      EmailerrMsg === "" &&
      PassworderrMsg === ""
    ) {
      const data = {
        Email: Email,
        Password: Password,
      };
      Login_User_Func(data);
    } else if (Email === "" || Password === "") {
      setDisable(false);
      Alert.alert("Error", "Inputs Can't Be Blancked", [
        {
          text: "OK",
        },
      ]);
    } else if (EmailerrMsg !== "") {
      setDisable(false);
      Alert.alert("Error", "Email is Wrong", [
        {
          text: "OK",
        },
      ]);
    } else if (PassworderrMsg !== "") {
      setDisable(false);
      Alert.alert("Error", "Password is Less 8 characters", [
        {
          text: "OK",
        },
      ]);
    }
  }

  const { loading, sucess, Error } = useSelector(
    (state: any) => state.AuthReducer
  );

  useEffect(() => {
    if (sucess) {
      Clear_Sucess_Func();
      setDisable(false);
      navigation.navigate("EnterInApp");
    }
  }, [sucess]);

  useEffect(() => {
    if (Error) {
      Alert.alert("Error", Error + " , Try Again", [
        {
          text: "OK",
          onPress: () => {
            setDisable(false);
            Clear_Error_Func();
          },
        },
      ]);
    }
  }, [Error]);
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      style={{ backgroundColor: COLORS.white }}
    >
      <AuthLayout Title={"Let's Sign You In"} SubTitle={"Login To continue"} />
      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* Form Input */}
        <FormInput
          containerStyle={{ flex: 1 }}
          label="Email"
          Placeholder={"Enter E-mail"}
          KeyboardType="email-address"
          autocomplete="email"
          autoCapatilize={"none"}
          secureTextEntry={false}
          onchange={(Value: any) => {
            //validateEmail
            validateEmail(Value, setEmailerrMsg);
            setEmail(Value);
          }}
          errorMsg={EmailerrMsg}
          prepandComponent={null}
          appendComponent={
            <View style={{ justifyContent: "center" }}>
              <Image
                resizeMode="contain"
                style={{ height: 25, width: 25, borderRadius: 100 }}
                source={
                  Email === "" || (Email !== "" && EmailerrMsg === "")
                    ? Icons.Correct
                    : Icons.Incorrect
                }
              />
            </View>
          }
        />
        <FormInput
          label="Password"
          Placeholder={"Enter Password"}
          secureTextEntry={!ShowPassword}
          KeyboardType="default"
          autocomplete="off"
          autoCapatilize={"none"}
          containerStyle={{ marginTop: SIZES.radius }}
          onchange={(Value: any) => {
            //validate Password
            validatePassword(Value, setPassworderrMsg);
            setPassword(Value);
          }}
          errorMsg={PassworderrMsg}
          prepandComponent={null}
          appendComponent={
            <TouchableOpacity
              style={{ justifyContent: "center" }}
              onPress={() => setShowPassword(!ShowPassword)}
            >
              <Image
                resizeMode="contain"
                style={{ height: 25, width: 25, borderRadius: 200 }}
                source={ShowPassword ? Icons.EyeClose : Icons.EyeOpen}
              />
            </TouchableOpacity>
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
              Sign In
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
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign In With Google */}
        <SignwithGoogle label={"Continue With Google"} onpress={() => { }} />
      </View>
    </ScrollView>
  );
};

export default Login;
