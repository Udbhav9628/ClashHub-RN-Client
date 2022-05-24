import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SIZES, COLORS, FONTS } from "../constants/Theame";
const MyMatchesMenu = () => {
  const [SelectedMenu, setSelectedMenu] = useState("Upcomming");
  return (
    <View
      style={{
        marginTop: 5,
        marginBottom: 13,
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          setSelectedMenu("Upcomming");
        }}
      >
        <Text
          style={{
            color: SelectedMenu === "Upcomming" ? COLORS.primary : COLORS.black,
            fontFamily: "Poppins-Regular",
            fontSize: 17,
            fontWeight: "bold",
          }}
        >
          Scheduled
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setSelectedMenu("Ongoing");
        }}
      >
        <Text
          style={{
            color: SelectedMenu === "Ongoing" ? COLORS.primary : COLORS.black,
            fontFamily: "Poppins-Regular",
            fontSize: 17,
            fontWeight: "bold",
          }}
        >
          Underway
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setSelectedMenu("Resultant");
        }}
      >
        <Text
          style={{
            color: SelectedMenu === "Resultant" ? COLORS.primary : COLORS.black,
            fontFamily: "Poppins-Regular",
            fontSize: 17,
            fontWeight: "bold",
          }}
        >
          Finished
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyMatchesMenu;

const styles = StyleSheet.create({});
