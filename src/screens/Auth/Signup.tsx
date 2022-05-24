import React, { useState } from "react";
import AuthLayout from "./AuthLayout";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { COLORS, SIZES } from "../../constants/Theame";
import FormInput from "./FormInput";
import { validateEmail, validatePassword } from "../../utils/Utils";
import SignwithGoogle from "./SignwithGoogle";
import Icons from "../../constants/Icons";

const Signup = ({ navigation }: { navigation: any }) => {
  const [Email, setEmail] = useState("");
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [PassworderrMsg, setPassworderrMsg] = useState("");
  const [EmailerrMsg, setEmailerrMsg] = useState("");
  const [ShowPassword, setShowPassword] = useState(false);

  function HandleOnPress() {
    if (
      Email !== "" &&
      Password !== "" &&
      EmailerrMsg === "" &&
      PassworderrMsg === ""
    ) {
      // navigation.navigate("OtpScreen");
    } else if (Email === "" || Password === "") {
      Alert.alert("Error", "Inputs Can't Be Blancked", [{ text: "OK" }]);
    } else if (EmailerrMsg !== "") {
      Alert.alert("Error", "Email is Wrong", [{ text: "OK" }]);
    } else if (PassworderrMsg !== "") {
      Alert.alert("Error", "Password is Less 8 characters", [{ text: "OK" }]);
    }
  }

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      style={{ backgroundColor: COLORS.white }}
    >
      <AuthLayout
        Title={"Getting Started"}
        SubTitle={"create an account to continue"}
      />
      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* Name */}
        <FormInput
          containerStyle={{ flex: 1 }}
          label="Name"
          Placeholder={"Enter Your Name"}
          KeyboardType="default"
          autocomplete="off"
          autoCapatilize={"none"}
          secureTextEntry={false}
          onchange={(Value: any) => {
            setUserName(Value);
          }}
          errorMsg={""}
          prepandComponent={null}
          appendComponent={
            <View style={{ justifyContent: "center" }}>
              <Image
                resizeMode="contain"
                style={{ height: 25, width: 25, borderRadius: 200 }}
                source={
                  Email === "" || (Email !== "" && EmailerrMsg === "")
                    ? Icons.Correct
                    : Icons.Incorrect
                }
              />
            </View>
          }
        />
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
                style={{ height: 25, width: 25, borderRadius: 200 }}
                source={
                  Email === "" || (Email !== "" && EmailerrMsg === "")
                    ? Icons.Correct
                    : Icons.Incorrect
                }
              />
            </View>
          }
        />
        {/* UserName */}
        <FormInput
          containerStyle={{ flex: 1 }}
          label="Username"
          Placeholder={"create username"}
          KeyboardType="default"
          autocomplete="off"
          autoCapatilize={"none"}
          secureTextEntry={false}
          onchange={(Value: any) => {
            setUserName(Value);
          }}
          errorMsg={""}
          prepandComponent={null}
          appendComponent={
            <View style={{ justifyContent: "center" }}>
              <Image
                resizeMode="contain"
                style={{ height: 25, width: 25, borderRadius: 200 }}
                source={
                  Email === "" || (Email !== "" && EmailerrMsg === "")
                    ? Icons.Correct
                    : Icons.Incorrect
                }
              />
            </View>
          }
        />
        {/* Create Password */}
        <FormInput
          label="Password"
          Placeholder={"Create Your Password"}
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
                source={ShowPassword ? Icons.EyeOpen : Icons.EyeClose}
              />
            </TouchableOpacity>
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

        {/* Sign Up With Google */}
        <SignwithGoogle label={"Sign Up With Google"} onpress={() => {}} />
      </View>
    </ScrollView>
  );
};

export default Signup;
