import React, { useState, useEffect } from "react";
import AuthLayout from "./AuthLayout";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { COLORS, SIZES } from "../../constants/Theame";
import FormInput from "./FormInput";
import { validateNumber } from "../../utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Login_User,
  Clear_Auth_Error,
  Clear_Auth_Sucess,
} from "../../store/Authentication/Authaction";
import messaging from '@react-native-firebase/messaging';

const Login = ({ navigation }: { navigation: any }) => {
  const [Phone_No, setPhone_No] = useState();
  const [Phone_No_Msg, setPhone_No_Msg] = useState("");

  const [Disable, setDisable] = useState(false);

  const dispatch = useDispatch();
  const Login_User_Func = bindActionCreators(Login_User, dispatch);
  const Clear_Error_Func = bindActionCreators(Clear_Auth_Error, dispatch);
  const Clear_Sucess_Func = bindActionCreators(Clear_Auth_Sucess, dispatch);

  async function HandleOnPress() {
    setDisable(true);
    if (
      Phone_No !== "" &&
      Phone_No_Msg === ""
    ) {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      const data = {
        Phone_No: Phone_No,
        FCMToken: token
      };
      Login_User_Func(data);
    } else if (Phone_No === "") {
      setDisable(false);
      Alert.alert("Error", "Enter Mobile No to Login", [
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
    </ScrollView>
  );
};

export default Login;
