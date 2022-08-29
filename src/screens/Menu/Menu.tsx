import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { COLORS, Dpheight, SIZES } from "../../constants/Theame";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  SignOut,
} from "../../store/Authentication/Authaction";

const Menu = ({ navigation }: { navigation: any }) => {
  const FetchUser_reducer = useSelector((state: any) => state.FetchUser_reducer);
  const dispatch = useDispatch();
  const SignOut_Func = bindActionCreators(SignOut, dispatch);
  return (
    <View style={styles.container}>
      <View style={styles.menuWrapper}>
        <TouchableOpacity
          style={styles.menuTouchableOpacity}
          onPress={() => {
            navigation.navigate("YourGuild");
          }}
        >
          <View style={styles.menuItem}>
            <Icon name="people" size={Dpheight(3.5)} color="black" />
            <Text style={styles.Menutitle}>Your Club</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuTouchableOpacity}
          onPress={() => {
            navigation.navigate("YourProfile");
          }}
        >
          <View style={styles.menuItem}>
            <Icon name="person" size={Dpheight(3.5)} color="black" />
            <Text style={styles.Menutitle}>Profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Wallet");
          }}
          style={styles.menuTouchableOpacity}
        >
          <View style={styles.menuItem}>
            <Icon name="wallet" size={Dpheight(3.5)} color="black" />
            <Text style={styles.Menutitle}>Wallet</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuTouchableOpacity}>
          <View style={styles.menuItem}>
            <Icon name="call" size={Dpheight(3.5)} color="black" />
            <Text style={styles.Menutitle}>Help</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuTouchableOpacity}
          onPress={() => {
            SignOut_Func()
          }}
        >
          <View style={styles.menuItem}>
            <Icon name="log-out" size={Dpheight(3.5)} color="black" />
            <Text style={styles.Menutitle}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  userInfoSection: {
    marginTop: SIZES.base,
    marginBottom: SIZES.base,
  },
  Menutitle: {
    fontSize: SIZES.body3,
    color: "#000",
    fontWeight: "bold",
    marginHorizontal: 15,
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 8,
  },
  menuItem2: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 8,
    alignContent: "center",
    justifyContent: "center",
  },
  menuTouchableOpacity: {
    borderRadius: SIZES.radius,
    marginHorizontal: SIZES.padding,
  },
});
