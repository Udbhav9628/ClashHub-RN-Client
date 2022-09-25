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
import { SIZES, COLORS, DPwidth, Dpheight } from "../../constants/Theame";
import Heading from "../../components/Heading";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/FontAwesome5";
import ModalScreen from "./YourGuild/Modal";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getUserGuildDetails,
  Clear_Guild_Reducer_Error,
} from "../../store/Guild/GuildAction";
import Createguild from "./YourGuild/Createguild";
import ClubFollowres from "./YourGuild/ClubFollowres";

const YourGuild = ({ navigation }: { navigation: any }) => {
  const [TempLoading, setTempLoading] = useState(true);
  const { Guild_Details, Sucess_response, Error, loading } = useSelector(
    (state: any) => state.Get_user_Guild_details_reducer
  );
  const [JoinedPlayermodal, setJoinedPlayermodal] = useState(false);
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
      Clear_Guild_ReducerError();
      Alert.alert("Error", Error, [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("Menu");
          },
        },
      ]);
    }
  }, [Error]);

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.Container}>
      {TempLoading || loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
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
              source={{ uri: `https://api.multiavatar.com/${Guild_Details.GuildName}.png` }}
              style={{
                width: DPwidth(31),
                height: Dpheight(15),
                borderRadius: Dpheight(455),
              }}
            />
            <View
              style={{
                marginTop: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.ProfileText}>{Guild_Details.GuildName}</Text>
              <Text style={styles.NotificationText2}>
                {Guild_Details.Followers.length} Followers
              </Text>
              {/* <View style={{ marginBottom: 10 }}>
                <Text style={styles.NotificationText2}>
                  {Guild_Details.GuildDescription}
                </Text>
              </View> */}
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
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
              style={{
                height: Dpheight(4),
                width: DPwidth(40),
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
                color: "#000",
                fontSize: SIZES.h2,
                fontWeight: "700",
              }}
            >
              Dashboard
            </Text>
          </View>
          <View style={styles.Elevation}>
            <View>
              <ClubFollowres modalVisible={JoinedPlayermodal}
                setModalVisible={setJoinedPlayermodal}
                navigation={navigation}
                Followers={Guild_Details.Followers} />
            </View>
            <TouchableOpacity onPress={() => { setJoinedPlayermodal(true) }}>
              <View style={styles.NotificationWrapper}>
                <Icons name="users" size={Dpheight(3.4)} color="black" />
                <View style={styles.DashboardBox}>
                  <Text style={styles.NotificationText}>{Guild_Details.Followers.length} Follower</Text>
                </View>
                <View
                  style={{
                    position: "absolute",
                    top: 20,
                    right: 5,
                  }}
                >
                  <Icon
                    name="chevron-forward-outline"
                    size={Dpheight(3)}
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
                <Icon name="game-controller-sharp" size={Dpheight(3.5)} color="black" />
                <View style={styles.DashboardBox}>
                  <Text style={styles.NotificationText}>
                    Your Guild Matches
                  </Text>
                </View>
                <View
                  style={{
                    position: "absolute",
                    top: 20,
                    right: 5,
                  }}
                >
                  <Icon
                    name="chevron-forward-outline"
                    size={Dpheight(3)}
                    color="black"
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.Elevation}>
            <TouchableOpacity onPress={() => navigation.replace('ClubWallet')} >
              <View style={styles.NotificationWrapper}>
                <Icon name="wallet" size={Dpheight(3.5)} color="black" />
                <View style={styles.DashboardBox}>
                  <Text style={styles.NotificationText}>Club Wallet</Text>
                </View>
                <View
                  style={{
                    position: "absolute",
                    top: 20,
                    right: 5,
                  }}
                >
                  <Icon
                    name="chevron-forward-outline"
                    size={Dpheight(3)}
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
    </View>
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
    textAlign: 'center',
    fontSize: SIZES.Size24,
    color: "#000",
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
  NotificationText2: {
    marginVertical: 5,
    textAlign: "center",
    marginHorizontal: 50,
    fontSize: SIZES.body3,
    fontWeight: "600",
    color: COLORS.gray,
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
});
