import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { COLORS, SIZES, FONTS } from "../../constants/Theame";
import Icons from "../../constants/Icons";

const GameItems = ({
  ContainerStyle,
  Imagestyle,
  Item,
  onPress,
}: {
  ContainerStyle: any;
  Imagestyle: any;
  Item: any;
  onPress: any;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderBottomRightRadius: 30,
        flexDirection: "row",
        borderRadius: SIZES.radius,
        ...ContainerStyle,
      }}
    >
      {/* Image*/}
      <View style={{ marginRight: 3 }}>
        <Image source={Icons.Pubg2} style={Imagestyle} />
      </View>
      {/* Info */}
      <View>
        {/* Name */}
        <Text
          style={{ ...FONTS.body3, fontWeight: "700", color: COLORS.black }}
        >
          {Item.Game_Name} Squad Match
        </Text>
        {/* Description */}
        <Text style={{ ...FONTS.h4, color: COLORS.darkGray2 }}>
          Play Match win and earn
        </Text>
        {/* More Info Section */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginRight: 48,
              marginLeft: SIZES.base,
            }}
          >
            <Text style={{ ...FONTS.h4, color: COLORS.darkGray2 }}>
              Prize Pool
            </Text>
            <Text
              style={{ color: COLORS.black, ...FONTS.h4, fontWeight: "700" }}
            >
              800
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ ...FONTS.h4, color: COLORS.darkGray2 }}>Type</Text>
            <Text
              style={{ color: COLORS.black, ...FONTS.h4, fontWeight: "700" }}
            >
              Solo
            </Text>
          </View>
        </View>
        {/* 2nd Row */}
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginRight: 48,
              marginLeft: 13,
            }}
          >
            <Text style={{ ...FONTS.h4, color: COLORS.darkGray2 }}>Map</Text>
            <Text
              style={{ color: COLORS.black, ...FONTS.h4, fontWeight: "700" }}
            >
              Miramar
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 5,
            }}
          >
            <Text style={{ ...FONTS.h4, color: COLORS.darkGray2 }}>View</Text>
            <Text
              style={{ color: COLORS.black, ...FONTS.h4, fontWeight: "700" }}
            >
              FPP
            </Text>
          </View>
        </View>
      </View>
      {/* Calories */}
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          top: 2,
          right: 5,
        }}
      >
        <Image
          source={Icons.calories}
          style={{
            width: 25,
            height: 25,
          }}
        />
        <Text
          style={{
            color: COLORS.darkGray2,
            ...FONTS.body4,
            fontWeight: "bold",
          }}
        >
          {new Date(Item.Date_Time).toLocaleTimeString()}
        </Text>
      </View>
      {/* Bottom Box */}
      <View
        style={{
          height: 30,
          width: 53,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
          backgroundColor: COLORS.lightOrange,
          borderTopLeftRadius: 25,
          borderBottomRightRadius: 25,
          bottom: 0,
          right: 0,
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h3,
            fontWeight: "bold",
          }}
        >
          &#x20B9; 10
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default GameItems;
