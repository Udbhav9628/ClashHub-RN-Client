import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { SIZES, COLORS } from "../constants/Theame";
import Icon from "react-native-vector-icons/FontAwesome5";

const Heading = ({ navigation, Title }: { navigation: any; Title: string }) => {
  return (
    <View style={styles.Container}>
      {/* Header */}
      <View style={styles.Header}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.HeaderLeft}
          onPress={() => navigation.goBack()}
        >
          <Icon name="angle-left" size={20} color="black" />
        </TouchableOpacity>
        <View
          style={{
            marginLeft: 85,
          }}
        >
          <Text
            style={{
              color: COLORS.black,
              fontSize: 20,
              fontWeight: "700",
            }}
          >
            {Title}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: COLORS.white,
  },
  Header: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 8,
    marginHorizontal: SIZES.h4,
  },
  HeaderLeft: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: "#CDCDCD",
    borderRadius: SIZES.radius,
  },
});
