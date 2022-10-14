import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { SIZES, COLORS, Dpheight, DPwidth } from "../constants/Theame";
import Icon from "react-native-vector-icons/FontAwesome5";

const Heading = ({ navigation, Title }: { navigation: any; Title: string }) => {
  return (
    <View style={styles.Container}>
      {/* Header */}
      <View style={styles.Header}>
        {/* Back Button */}
        <View style={{ width: '26%' }}>
          <TouchableOpacity
            style={styles.HeaderLeft}
            onPress={() => navigation.goBack()}
          >
            <Icon name="angle-left" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{ width: '68%' }}>
          <Text
            style={{
              color: COLORS.black,
              fontSize: SIZES.body2,
              fontWeight: "700",
            }}
          >
            {Title}
          </Text>
        </View>
        <View>
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
    marginHorizontal: SIZES.h3,
    justifyContent: 'space-between',
  },
  HeaderLeft: {
    alignItems: "center",
    justifyContent: "center",
    width: DPwidth(10),
    height: Dpheight(5),
    borderWidth: 2,
    borderColor: "#CDCDCD",
    borderRadius: SIZES.radius,
  },
});
