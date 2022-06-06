import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SIZES, COLORS } from "../../constants/Theame";
import Heading from "../../components/Heading";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

const Profile = ({ navigation }: { navigation: any }) => {

  const { User } = useSelector((state: any) => state.AuthReducer);

  return (
    <View style={styles.Container}>
      <Heading navigation={navigation} Title={" Your Profile"} />
      {/* Profile */}
      <View style={styles.Profile}>
        <Image source={{ uri: `https://api.multiavatar.com/${User.User}.png` }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
          }} />
        <View style={styles.Textwrapper}>
          <Text style={styles.Name}>{User.User}</Text>
          <Text style={styles.Caption}>Play, Win and Earn</Text>
        </View>
      </View>
      {/* Stats */}
      <View style={styles.statswrapper}>
        <View>
          <Text style={styles.statsTitle}>5</Text>
          <Text style={styles.statsCaption}>Played</Text>
        </View>
        <View>
          <Text style={styles.statsTitle}>12%</Text>
          <Text style={styles.statsCaption}>Winrate</Text>
        </View>
        <View>
          <Text style={styles.statsTitle}>&#x20B9;5454</Text>
          <Text style={styles.statsCaption}>Income</Text>
        </View>
      </View>
      {/* Dsahboard */}
      <View style={styles.Elevation}>
        <TouchableOpacity>
          <View style={styles.NotificationWrapper}>
            <Icon name="shirt" size={28} color="black" />
            <View style={styles.DashboardBox}>
              <Text style={styles.NotificationText}>Your Team</Text>
            </View>
            <View
              style={{
                position: "absolute",
                top: 22,
                right: 5,
              }}
            >
              <Icon name="chevron-forward-outline" size={28} color="black" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.Elevation}>
        <TouchableOpacity>
          <View style={styles.NotificationWrapper}>
            <Icon name="game-controller-sharp" size={28} color="black" />
            <View style={styles.DashboardBox}>
              <Text style={styles.NotificationText}>Game Accounts</Text>
            </View>
            <View
              style={{
                position: "absolute",
                top: 22,
                right: 5,
              }}
            >
              <Icon name="chevron-forward-outline" size={28} color="black" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.Elevation}>
        <TouchableOpacity>
          <View style={styles.NotificationWrapper}>
            <Icon name="people" size={28} color="black" />
            <View style={styles.DashboardBox}>
              <Text style={styles.NotificationText}>Joined Guilds</Text>
            </View>
            <View
              style={{
                position: "absolute",
                top: 22,
                right: 5,
              }}
            >
              <Icon name="chevron-forward-outline" size={28} color="black" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  Profile: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: SIZES.padding,
  },
  Textwrapper: {
    marginTop: 10,
    justifyContent: "center",
    marginHorizontal: SIZES.padding,
  },
  Name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  statswrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 15,
    marginBottom: 15,
    marginHorizontal: SIZES.padding,
  },
  statsTitle: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  statsCaption: {
    lineHeight: 25,
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.gray,
  },
  Caption: {
    textAlign: "center",
    lineHeight: 30,
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.gray,
  },
  Elevation: {
    backgroundColor: "white",
    borderRadius: SIZES.radius,
    elevation: 2,
    marginVertical: 8,
    margin: SIZES.padding,
    //For Ios Only -- SHOWdow code
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  NotificationWrapper: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightGray2,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.base,
  },
  DashboardBox: {
    marginLeft: 10,
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  NotificationText: {
    lineHeight: 30,
    fontSize: 17,
    fontWeight: "bold",
  },
});
