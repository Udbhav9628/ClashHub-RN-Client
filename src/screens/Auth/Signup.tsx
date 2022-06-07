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
import { validateNumber } from "../../utils/Utils";

const Signup = ({ navigation }: { navigation: any }) => {
  const [Name, setName] = useState("");
  const [Name_Length, setName_Length] = useState("");
  const [UserName, setUserName] = useState("");
  const [UserName_Length, setUserName_Length] = useState("");
  const [Phone_No, setPhone_No] = useState();
  const [Phone_No_Msg, setPhone_No_Msg] = useState("");

  function HandleOnPress() {
    if (
      Name !== "" &&
      UserName !== "" &&
      Phone_No !== "" &&
      Phone_No_Msg === ""
    ) {
      navigation.navigate("OtpScreen");
    } else if (Name === "" || Phone_No === "" || UserName === "") {
      Alert.alert("Error", "Fill All Details First", [{ text: "OK" }]);
    } else if (Phone_No !== "") {
      Alert.alert("Error", "Phone_No is Less 10 characters", [{ text: "OK" }]);
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
            setName(Value);
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
            setUserName(Value);
          }}
          errorMsg={""}
          prepandComponent={null}
          appendComponent={null
          }
        />
        {/* Create Password */}
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
    </ScrollView>
  );
};

export default Signup;
