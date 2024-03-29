import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS, Dpheight } from "../../constants/Theame";
import Ionicons from 'react-native-vector-icons/Ionicons';

const AuthLayout = ({
  Title,
  SubTitle,
}: {
  Title: string;
  SubTitle: String;
}) => {
  return (
    <View style={style.conatiner}>
      <View
        style={{
          marginHorizontal: SIZES.padding,
        }}
      >
        {/* App Icon */}
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Ionicons name="game-controller-sharp" size={Dpheight(10)} color="#000" />
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                ...FONTS.body2,
                color: COLORS.black,
                fontWeight: "700",
              }}
            >
              Clash
            </Text>
            <Text
              style={{
                ...FONTS.body2,
                color: COLORS.primary,
                fontWeight: "700",
              }}
            >
              Hub
            </Text>
          </View>
        </View>

        {/* Title & Sub Title*/}
        <View
          style={{
            marginTop: SIZES.base,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: SIZES.h2,
              fontWeight: "bold",
              color: COLORS.black,
            }}
          >
            {Title}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              marginTop: SIZES.base,
              color: COLORS.darkGray,
              fontSize: SIZES.body3,
            }}
          >
            {SubTitle}
          </Text>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  conatiner: {
    flex: 1,
    marginTop: '15%',
    backgroundColor: COLORS.white,
  },
});
export default AuthLayout;
