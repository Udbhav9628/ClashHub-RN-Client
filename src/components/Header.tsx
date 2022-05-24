import React from "react";
import { View, Text } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants/Theame";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

const Header = ({
  navigation,
  title,
  title2,
}: {
  navigation: any;
  title: string;
  title2: any;
}) => {
  const AuthReducer = useSelector((state: any) => state.AuthReducer);

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        height: 55,
      }}
    >
      <View
        style={{
          marginTop: 15,
          flexDirection: "row",
        }}
      >
        {/* Title */}
        <View style={{ marginLeft: 15, flex: 1 }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                ...FONTS.h2,
                color: COLORS.black,
                fontWeight: "700",
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                ...FONTS.h2,
                color: COLORS.primary,
                fontWeight: "700",
              }}
            >
              {title2}
            </Text>
          </View>
        </View>
        {AuthReducer.User ? (
          // IF LOGGEDIN IN
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: SIZES.padding,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Wallet");
              }}
              style={{
                marginHorizontal: SIZES.h1,
              }}
            >
              <Icon name="wallet" size={22} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Notification");
              }}
              style={{
                marginTop: 2,
              }}
            >
              <Icons name="notifications" size={22} color="black" />
            </TouchableOpacity>
          </View>
        ) : (
          // IF NOT LOGED IN
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 25,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Signin");
              }}
            >
              <Icon name="sign-in-alt" size={22} color="black" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default Header;
