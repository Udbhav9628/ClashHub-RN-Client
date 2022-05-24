import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS } from "../../constants/Theame";
import Entypo from 'react-native-vector-icons/Entypo';

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
          flex: 1,
          marginHorizontal: SIZES.padding,
        }}
      >
        {/* App Icon */}
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Entypo name='behance' style={{ color: 'red', fontSize: 50 }} />
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
              lineHeight: 30,
              fontWeight: "bold",
              color: COLORS.black,
            }}
          >
            {Title}
          </Text>
          <Text
            style={{
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
    marginTop: SIZES.padding,
    paddingVertical: SIZES.padding,
    backgroundColor: COLORS.white,
  },
});
export default AuthLayout;
