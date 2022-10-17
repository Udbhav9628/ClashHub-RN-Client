import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from "react-native";
import React, { useEffect } from "react";
import { SIZES, COLORS, DPwidth, Dpheight } from "../../constants/Theame";
import Heading from "../../components/Heading";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

const Profile = ({ navigation }: { navigation: any }) => {

  const { User } = useSelector((state: any) => state.FetchUser_reducer);


  return (
    <View style={styles.Container}>
      <Heading navigation={navigation} Title={" Your Profile"} />
      {/* Profile */}
      <View style={styles.Profile}>
        <Image source={{ uri: `${User.PhotoUrl}` }}
          style={{
            width: DPwidth(31),
            height: Dpheight(15),
            borderRadius: Dpheight(455),
          }} />
        <View style={styles.Textwrapper}>
          <Text style={styles.Name}>{User.User}</Text>
          <Text style={styles.Caption}>{User.UserName}</Text>
        </View>
      </View>
      {/* Stats */}
      <View style={styles.statswrapper}>
        <View>
          <Text style={styles.statsTitle}>5</Text>
          <Text style={styles.statsCaption}>Match</Text>
        </View>
        <View>
          <Text style={styles.statsTitle}>12</Text>
          <Text style={styles.statsCaption}>Kills</Text>
        </View>
        <View>
          <Text style={styles.statsTitle}>&#x20B9;54</Text>
          <Text style={styles.statsCaption}>Earning</Text>
        </View>
      </View>
      {/* Dsahboard */}
      <View style={styles.Elevation}>
        <TouchableOpacity onPress={() => {
          Alert.alert(
            "Message",
            "Feature Comming Soon",
            [
              {
                text: "ok",
              },
            ]
          );
        }}>
          <View style={styles.NotificationWrapper}>
            <Icon name="shirt" size={Dpheight(3.5)} color="black" />
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
              <Icon name="chevron-forward-outline" size={Dpheight(3)} color="black" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.Elevation}>
        <TouchableOpacity onPress={() => {
          Alert.alert(
            "Message",
            "Feature Comming Soon",
            [
              {
                text: "ok",
              },
            ]
          );
        }}>
          <View style={styles.NotificationWrapper}>
            <Icon name="game-controller-sharp" size={Dpheight(3.5)} color="black" />
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
              <Icon name="chevron-forward-outline" size={Dpheight(3)} color="black" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.Elevation}>
        <TouchableOpacity onPress={() => {
          Alert.alert(
            "Message",
            "Feature Comming Soon",
            [
              {
                text: "ok",
              },
            ]
          );
        }}>
          <View style={styles.NotificationWrapper}>
            <Icon name="people" size={Dpheight(3.5)} color="black" />
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
              <Icon name="chevron-forward-outline" size={Dpheight(3)} color="black" />
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
    textAlign: 'center',
    fontSize: SIZES.Size24,
    color: "#000",
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
    fontSize: SIZES.h3,
    fontWeight: "bold",
  },
  statsCaption: {
    lineHeight: SIZES.h1,
    fontSize: SIZES.h3,
    fontWeight: "bold",
    color: COLORS.gray,
  },
  Caption: {
    textAlign: "center",
    lineHeight: SIZES.h1,
    fontSize: SIZES.h3,
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
    height: Dpheight(8.7),
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
    color: "#000",
    lineHeight: SIZES.h1,
    fontSize: SIZES.Size4,
    fontWeight: "bold",
  },
});
