import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/Theame";
import Icons from "../../constants/Icons";
const SignwithGoogle = ({
  label,
  onpress,
}: {
  label: string;
  onpress: any;
}) => {
  return (
    <View>
      <TouchableOpacity onPress={onpress} style={style.ContainerStyle}>
        <Image source={Icons.Goggle} style={style.Image} />
        <Text style={style.Text}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  ContainerStyle: {
    height: 50,
    marginTop: SIZES.padding,
    borderRadius: SIZES.radius,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.lightGray2,
  },
  Image: {
    width: 20,
    height: 20,
  },
  Text: {
    marginLeft: SIZES.radius,
    color: COLORS.black,
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
});
export default SignwithGoogle;
