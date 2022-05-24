import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { SIZES, FONTS, COLORS } from "../constants/Theame";

const HeadingComp = ({
  navigation,
  Title,
  ShowViewAll,
  Navigate_to,
  Query,
}: {
  Title: string;
  ShowViewAll: boolean;
  Navigate_to: string;
  Query: any;
  navigation: any;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: SIZES.base,
        marginHorizontal: "4%",
      }}
    >
      <Text
        style={{
          ...FONTS.h2,
          fontWeight: "700",
          color: COLORS.black,
        }}
      >
        {Title}
      </Text>
      {ShowViewAll && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Navigate_to, Query);
          }}
          style={{
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              ...FONTS.h3,
              fontWeight: "700",
              color: COLORS.black,
            }}
          >
            View all
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeadingComp;
