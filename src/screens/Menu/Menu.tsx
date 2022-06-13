import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { COLORS, SIZES } from "../../constants/Theame";
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
      {FetchUser_reducer.User ? (
        <>
          {/* MENU */}
          <View style={styles.menuWrapper}>
            <TouchableOpacity
              style={styles.menuTouchableOpacity}
              onPress={() => {
                navigation.navigate("YourProfile");
              }}
            >
              <View style={styles.menuItem}>
                <Icon name="person" size={28} color="black" />
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
                <Icon name="wallet" size={28} color="black" />
                <Text style={styles.Menutitle}>Wallet</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuTouchableOpacity}
              onPress={() => {
                navigation.navigate("YourGuild");
              }}
            >
              <View style={styles.menuItem}>
                <Icon name="people" size={28} color="black" />
                <Text style={styles.Menutitle}>Your Guild</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuTouchableOpacity}>
              <View style={styles.menuItem}>
                <Icon name="shirt" size={28} color="black" />
                <Text style={styles.Menutitle}>Your Team</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuTouchableOpacity}>
              <View style={styles.menuItem}>
                <Icon name="call" size={28} color="black" />
                <Text style={styles.Menutitle}>Support</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuTouchableOpacity}
              onPress={() => {
                SignOut_Func()
              }}
            >
              <View style={styles.menuItem}>
                <Icon name="log-out" size={28} color="black" />
                <Text style={styles.Menutitle}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={styles.userInfoSection}>
            <View
              style={{
                marginHorizontal: SIZES.padding,
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Signin");
                }}
                style={{
                  height: 35,
                  width: 150,
                  marginTop: SIZES.base,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  backgroundColor: COLORS.primary,
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    fontWeight: "bold",
                    fontSize: SIZES.body3,
                    lineHeight: 22,
                  }}
                >
                  Login
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 35,
                  width: 150,
                  marginTop: SIZES.base,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  backgroundColor: COLORS.primary,
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    fontWeight: "bold",
                    fontSize: SIZES.body3,
                    lineHeight: 22,
                  }}
                >
                  Create Account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* MENU */}
          <View style={styles.menuWrapper}>
            <TouchableOpacity style={styles.menuTouchableOpacity}>
              <View style={styles.menuItem2}>
                {/* <Icon name="square-phone" size={28} color="black" /> */}
                <Text style={styles.Menutitle}>Support</Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}
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
    fontSize: 17,
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
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
