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
import Iconss from "react-native-vector-icons/MaterialCommunityIcons";
import ModalScreen from "./YourGuild/Modal";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getUserGuildDetails,
  Update_Club_Pic,
  Clear_Guild_Reducer_Error,
  Clear_Guild_Reducer_Sucess
} from "../../store/Guild/GuildAction";
import Createguild from "./YourGuild/Createguild";
import ClubFollowres from "./YourGuild/ClubFollowres";
import { ScrollView } from "react-native-gesture-handler";
import PicModal from "./YourGuild/PicModal";

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

  const Clear_Guild_ReducerSucess = bindActionCreators(
    Clear_Guild_Reducer_Sucess,
    dispatch
  );

  useEffect(() => {
    Fetch_User_Guild_Details();
    setTempLoading(false);
  }, [])

  const [PicModal_Visible, setPicModal_Visible] = useState(false)

  const Update_Club_Pic_Func = bindActionCreators(
    Update_Club_Pic,
    dispatch
  );

  const Pic_Reducer = useSelector(
    (state: any) => state.Update_Club_Pic_Reducer
  );

  useEffect(() => {
    if (Pic_Reducer.Sucess) {
      Clear_Guild_ReducerSucess();
      Alert.alert("Sucess", "Profile Picture Changed", [
        {
          text: "OK",
          onPress: () => {
            setPicModal_Visible(false)
            navigation.goBack()
          },
        },
      ]);
    }
  }, [Pic_Reducer.Sucess]);

  useEffect(() => {
    if (Pic_Reducer.Error) {
      Clear_Guild_ReducerError();
      Alert.alert("Error", Pic_Reducer.Error, [
        {
          text: "OK",
        },
      ]);
    }
  }, [Pic_Reducer.Error]);


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
    <ScrollView style={styles.Container}>
      {TempLoading || loading ? (
        <View
          style={{
            marginTop: '100%',
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
          <Heading navigation={navigation} Title={"Your Club"} />
          <View style={styles.Profile}>
            <PicModal modalVisible={PicModal_Visible}
              setModalVisible={setPicModal_Visible}
              Club_Id={Guild_Details._id}
              loading={Pic_Reducer.loading}
              ChangePicFunction={Update_Club_Pic_Func} />
            <TouchableOpacity style={{
              width: DPwidth(31),
              height: Dpheight(15),
              marginBottom: 10,
            }}
              onPress={() => setPicModal_Visible(true)}>
              <View style={{
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 500
              }}>
                <Iconss name="tooltip-edit" size={28} color="black" />
              </View>
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  borderWidth: 3,
                  borderColor: COLORS.primary,
                  borderRadius: 500,
                  resizeMode: "contain",
                }}
                source={{ uri: `https://api.multiavatar.com/${Guild_Details.Profile_Pic}.png` }}
              />
            </TouchableOpacity>
            <View
              style={{
                marginTop: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.ProfileText}>{Guild_Details.GuildName}</Text>
              <Text style={styles.NotificationText2}>
                {Guild_Details.GuildID}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginVertical: 15,
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
                Club_Id={Guild_Details?._id} />
            </View>
            <TouchableOpacity onPress={() => { setJoinedPlayermodal(true) }}>
              <View style={styles.NotificationWrapper}>
                <Icons name="users" size={Dpheight(3.4)} color="black" />
                <View style={styles.DashboardBox}>
                  <Text style={styles.NotificationText}>{Guild_Details.How_Many_Followers} Follower</Text>
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
                    Your Club Matches
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
