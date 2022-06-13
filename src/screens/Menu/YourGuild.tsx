import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SIZES, COLORS } from "../../constants/Theame";
import Heading from "../../components/Heading";
const logo = require("../../Assets/Images/logo_02.png");
import Icon from "react-native-vector-icons/Ionicons";
import ModalScreen from "./YourGuild/Modal";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getUserGuildDetails,
  Clear_Guild_Reducer_Error,
} from "../../store/Guild/GuildAction";
import Createguild from "./YourGuild/Createguild";
import { ScrollView } from "react-native-gesture-handler";

const YourGuild = ({ navigation }: { navigation: any }) => {
  const [TempLoading, setTempLoading] = useState(true);
  const { Guild_Details, Sucess_response, Error, loading } = useSelector(
    (state: any) => state.Get_user_Guild_details_reducer
  );
  const dispatch = useDispatch();
  const Fetch_User_Guild_Details = bindActionCreators(
    getUserGuildDetails,
    dispatch
  );
  const Clear_Guild_ReducerError = bindActionCreators(
    Clear_Guild_Reducer_Error,
    dispatch
  );

  useEffect(() => {
    Fetch_User_Guild_Details();
    setTempLoading(false);
  }, [])


  useEffect(() => {
    if (Error) {
      Alert.alert("Error", Error, [
        {
          text: "OK",
          onPress: () => {
            Clear_Guild_ReducerError();
            navigation.navigate("Menu");
          },
        },
      ]);
    }
  }, [Error]);

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <ScrollView style={styles.Container}>
      {TempLoading || loading ? (
        <>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        </>
      ) : Sucess_response ? (
        <View>
          <ModalScreen
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            navigation={navigation}
            Guild_Id={Guild_Details._id}
          />
          <Heading navigation={navigation} Title={"  Your Guild"} />
          <View style={styles.Profile}>
            <Image
              source={logo}
              style={{
                borderRadius: 50,
                width: 100,
                height: 100,
              }}
            />
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.ProfileText}>{Guild_Details.GuildName}</Text>
              <Text style={styles.NotificationText2}>
                {Guild_Details.Followers.length} Followers
              </Text>
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.NotificationText2}>
                  Play FreeFire Matches Here and win real cash Prize
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.statswrapper}>
            <View>
              <Text style={styles.statsTitle}>5</Text>
              <Text style={styles.statsCaption}>Match</Text>
            </View>
            <View>
              <Text style={styles.statsTitle}>12%</Text>
              <Text style={styles.statsCaption}>Accuracy</Text>
            </View>
            <View>
              <Text style={styles.statsTitle}>&#x20B9;5454</Text>
              <Text style={styles.statsCaption}>Income</Text>
            </View>
          </View>
          <View
            style={{
              marginVertical: SIZES.base,
              marginHorizontal: SIZES.padding,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
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
                Create Match
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: SIZES.padding,
              marginLeft: "4%",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
              }}
            >
              Dashboard
            </Text>
          </View>
          <View style={styles.Elevation}>
            <TouchableOpacity>
              <View style={styles.NotificationWrapper}>
                <Icon name="person" size={28} color="black" />
                <View style={styles.DashboardBox}>
                  <Text style={styles.NotificationText}>6565 Followers</Text>
                </View>
                <View
                  style={{
                    position: "absolute",
                    top: 22,
                    right: 5,
                  }}
                >
                  <Icon
                    name="chevron-forward-outline"
                    size={28}
                    color="black"
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.Elevation}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("YourGuildsMatches");
              }}
            >
              <View style={styles.NotificationWrapper}>
                <Icon name="game-controller-sharp" size={28} color="black" />
                <View style={styles.DashboardBox}>
                  <Text style={styles.NotificationText}>
                    Your Guild Matches
                  </Text>
                </View>
                <View
                  style={{
                    position: "absolute",
                    top: 22,
                    right: 5,
                  }}
                >
                  <Icon
                    name="chevron-forward-outline"
                    size={28}
                    color="black"
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.Elevation}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("YourGuildsMatches");
              }}
            >
              <View style={styles.NotificationWrapper}>
                <Icon name="game-controller-sharp" size={28} color="black" />
                <View style={styles.DashboardBox}>
                  <Text style={styles.NotificationText}>
                    To Update Result
                  </Text>
                </View>
                <View
                  style={{
                    position: "absolute",
                    top: 22,
                    right: 5,
                  }}
                >
                  <Icon
                    name="chevron-forward-outline"
                    size={28}
                    color="black"
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.Elevation}>
            <TouchableOpacity>
              <View style={styles.NotificationWrapper}>
                <Icon name="wallet" size={28} color="black" />
                <View style={styles.DashboardBox}>
                  <Text style={styles.NotificationText}>Guild Wallet</Text>
                </View>
                <View
                  style={{
                    position: "absolute",
                    top: 22,
                    right: 5,
                  }}
                >
                  <Icon
                    name="chevron-forward-outline"
                    size={28}
                    color="black"
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Createguild navigation={navigation} />
      )}
    </ScrollView>
  );
};

export default YourGuild;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  Profile: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: SIZES.base,
  },
  ProfileText: {
    fontSize: 24,
    fontWeight: "bold",
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
  NotificationText2: {
    marginVertical: 5,
    textAlign: "center",
    marginHorizontal: 50,
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.gray,
  },
  statswrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
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
});
