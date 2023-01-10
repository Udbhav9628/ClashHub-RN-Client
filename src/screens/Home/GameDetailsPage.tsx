import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet as RN_Styles,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SIZES, COLORS, Dpheight, DPwidth } from "../../constants/Theame";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Join_Match_action,
  Clear_Match_Reducer_Error,
  Clear_Match_Reducer_Sucess,
  RemoveMatchItem,
} from "../../store/Match/Matchaction";
import { Get_Specific_Club_Details } from "../../store/Guild/GuildAction";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusEffect } from "@react-navigation/native";
import PlayerGameNameInputModal from "./PlayerGameNameInputModal";
import JoinedUserModal from "./JoinedUserModal";
import RoomDetailsModal from "./RoomDetailsModal";
import MatchUpdateModal from "../../components/MatchUpdateModal";
import ModalClub_Menu from "./ModalClub_Menu";
import MoneyRefund_Comp from "./MoneyRefund_Comp";
import Heading from "../../components/Heading";
import Player from "../../components/Player";
import Iconss from "react-native-vector-icons/MaterialIcons";

const GameDetailsPage = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {

  const { Item, GameImage } = route.params;

  const [JoinedPlayermodal, setJoinedPlayermodal] = useState(false);

  const [PlayerInputModal, setPlayerInputModal] = useState(false)

  const [disable_joinmatch_button, setdisable_joinmatch_button] = useState(false);

  const [Disable, setDisable] = useState(false);

  const [MoneyRefund, setMoneyRefund] = useState(false)

  const [ShowYt_Modal, setShowYt_Modal] = useState(false);

  const [RoomDetailsModals, setRoomDetailsModal] = useState(false)
  const [Show_Club_Menu_Modal, setShow_Club_Menu_Modal] = useState(false)

  const { Join_Sucess, Error, Responce, loading } = useSelector(
    (state: any) => state.Join_Match_Reducer
  );

  const { User } = useSelector((state: any) => state.FetchUser_reducer);

  const { Home_Matchs } = useSelector(
    (state: any) => state.Get_Home_Page_Matches
  );

  const isJoined = Item.Joined_User.find((Item: any) => {
    return Item.UserId === User?.id;
  });

  const IsRefunded = Item.Joined_User.find((Item: any) => {
    return Item.Is_EntryFee_Refunded === true;
  });

  const dispatch = useDispatch();

  const Join_Match_Action_Func = bindActionCreators(
    Join_Match_action,
    dispatch
  );

  const Remove_Match_Item = bindActionCreators(RemoveMatchItem, dispatch);

  const Clear_Match_Sucess = bindActionCreators(
    Clear_Match_Reducer_Sucess,
    dispatch
  );

  const Clear_Match_ReducerError = bindActionCreators(
    Clear_Match_Reducer_Error,
    dispatch
  );

  const Get_Specific_Club_Details_Func = bindActionCreators(
    Get_Specific_Club_Details,
    dispatch
  );

  function formatTime(timeString: any) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
  }

  useEffect(() => {
    Get_Specific_Club_Details_Func(Item.GuildId);
  }, []);

  const Get_Specific_Club_Reducer = useSelector(
    (state: any) => state.Get_Specific_Club_Reducer
  );

  useEffect(() => {
    if (Join_Sucess) {
      Clear_Match_Sucess();
      if (Responce.Sucess) {
        Remove_Match_Item(Home_Matchs, Item._id);
        navigation.navigate("PaymentSucess", {
          Matched_Joined: true
        })
      } else {
        Alert.alert("Message", Responce.Msg, [
          {
            text: "OK",
            onPress: () => {
              setDisable(false);
            }
          },
        ]);
      }
    }
  }, [Join_Sucess]);

  useEffect(() => {
    if (Error) {
      Clear_Match_ReducerError();
      setDisable(false);
      Alert.alert("Error", Error, [
        {
          text: "OK",
        },
      ]);
    }
  }, [Error]);

  const [Days, setDays] = useState(0);
  const [Hours, setHours] = useState(0);
  const [Minutes, setMinutes] = useState(0);
  const [Match_Cancelled, setMatch_Cancelled] = useState(false)

  const Second = 1000;
  const Minute = Second * 60;
  const Hour = Minute * 60;
  const Day = Hour * 24;

  function Timer_Function() {
    const Match_time = new Date(Item.Date_Time).getTime();
    const now = new Date().getTime();
    const Gap = Match_time - now;
    const Gap2 = now - Match_time;

    if ((Gap2 >= 14400000 && Item.Match_Status === 'Started') || (Gap <= 0 && Item.Match_Status === 'Scheduled')) {
      clearInterval(Timer);
      setMatch_Cancelled(true)
    }
    if (Gap <= 0) {
      setMinutes(0);
    }
    else {
      const TextDay = Math.floor(Gap / Day);
      const TextHour = Math.floor((Gap % Day) / Hour);
      const TextMinute = Math.floor((Gap % Hour) / Minute);
      setDays(TextDay);
      setHours(TextHour);
      setMinutes(TextMinute + 1);
    }
  }

  let Timer: any;
  const Start_Timer = () => {
    Timer = setInterval(() => {
      Timer_Function()
    }, 1000);
  };
  useFocusEffect(
    React.useCallback(() => {
      Start_Timer();
      return () => clearInterval(Timer);
    }, [])
  );

  useEffect(() => {
    Timer_Function()
  }, []);

  useEffect(() => {
    if (Item.Joined_User.length === Item.Total_Players) {
      setdisable_joinmatch_button(true)
    }
  }, []);

  return (
    <View style={style.container}>
      {isJoined ? (
        // Joined
        <ScrollView>
          {/* Header */}
          <Heading navigation={navigation} Title={"Match Details"} />
          <View
            style={{
              flex: 1,
              marginTop: SIZES.padding,
              flexDirection: "row",
            }}
          >
            {/* all Info */}
            <View
              style={{
                width: "50%",
              }}
            >
              {/* Title */}
              <View style={style.TitleWraper}>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold', fontSize: 22,
                    fontWeight: "700",
                    color: COLORS.black,
                  }}
                >
                  {Item._id.slice(-2)} {Item.Game_Name} {Item.GameType} Match
                </Text>
              </View>
              {/* Match Status */}
              <View>
                {/* Secheduled */}
                {(Minutes !== 0) && (Item.Match_Status === 'Scheduled') && (
                  <View style={style.EntryFeeWraper}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-SemiBold', fontSize: 18,
                        color: COLORS.primary,
                        fontWeight: "700",
                      }}
                    >
                      Starts In
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-SemiBold', fontSize: 18,
                        color: COLORS.primary,
                        fontWeight: "700",
                      }}
                    >
                      {!Days || Days === 0 ? null : `${Days}D `}{!Hours || Hours === 0 ? '' : `${Hours}H `}{`${Minutes}M`}
                    </Text>
                  </View>
                )}
                {/*Room Available*/}
                {Minutes !== 0 && Item.Match_Status === 'Started' && (
                  <View style={style.EntryFeeWraper}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-SemiBold', fontSize: 18,
                        color: COLORS.primary,
                        fontWeight: "700",
                      }}
                    >
                      Room Available
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-SemiBold', fontSize: 18,
                        color: COLORS.primary,
                        fontWeight: "700",
                      }}
                    >
                      Starts in
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-SemiBold', fontSize: 18,
                        color: COLORS.primary,
                        fontWeight: "700",
                      }}
                    >
                      {!Days || Days === 0 ? null : `${Days}D `}{!Hours || Hours === 0 ? '' : `${Hours}H `}{`${Minutes}M`}
                    </Text>
                  </View>
                )}
                {/* Ongoing */}
                {Days === 0 && Hours === 0 && Minutes === 0 && Item.Match_Status === 'Started' && !Match_Cancelled && (
                  <View style={style.EntryFeeWraper}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-SemiBold', fontSize: 18,
                        color: COLORS.primary,
                        fontWeight: "700",
                      }}
                    >
                      Live
                    </Text>
                  </View>
                )}
                {/* Completed */}
                {Days === 0 && Hours === 0 && Minutes === 0 && Item.Match_Status === 'Completed' && (
                  <View style={style.EntryFeeWraper}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-SemiBold', fontSize: 18,
                        color: COLORS.primary,
                        fontWeight: "700",
                      }}
                    >
                      Finished
                    </Text>
                  </View>
                )}
                {/* Cancelled */}
                {Match_Cancelled && (
                  <View style={style.EntryFeeWraper}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-SemiBold', fontSize: 18,
                        color: COLORS.primary,
                        fontWeight: "700",
                      }}
                    >
                      Suspended
                    </Text>
                  </View>
                )}
              </View>
              {/* Match Info */}
              <View style={style.InfoWrapper}>
                {/* Info Left Details */}
                <View>
                  {/* Match Date */}
                  <View style={style.InfoLeftItem}>
                    <Text style={{
                      color: COLORS.darkGray2,
                      fontFamily: 'Poppins-SemiBold', fontSize: 14,
                    }}>
                      Match Date
                    </Text>
                    <Text
                      style={{
                        color: COLORS.black,
                        fontFamily: 'Poppins-SemiBold', fontSize: 16,
                        fontWeight: "700",
                      }}
                    >
                      {new Date(Item.Date_Time).toDateString()}
                    </Text>
                  </View>
                  {/* Match Time */}
                  <View style={style.InfoLeftItem}>
                    <Text style={{
                      color: COLORS.darkGray2,
                      fontFamily: 'Poppins-SemiBold', fontSize: 14,
                    }}>
                      Time
                    </Text>
                    <Text
                      style={{
                        color: COLORS.black,
                        fontFamily: 'Poppins-SemiBold', fontSize: 16,
                        fontWeight: "700",
                      }}
                    >{formatTime(new Date(Item.Date_Time).toLocaleTimeString())}
                    </Text>
                  </View>
                  <View style={style.InfoLeftItem}>
                    <Text style={{
                      color: COLORS.darkGray2,
                      fontFamily: 'Poppins-SemiBold', fontSize: 14,
                    }}>
                      Prize
                    </Text>
                    <Text
                      style={{
                        color: COLORS.primary,
                        fontFamily: 'Poppins-SemiBold', fontSize: 17,
                        fontWeight: "700",
                      }}
                    >
                      &#x20B9; {Item.Perkill_Prize} Per Kill
                    </Text>
                  </View>
                  <View style={style.InfoLeftItem}>
                    <Text style={{
                      color: COLORS.darkGray2,
                      fontFamily: 'Poppins-SemiBold', fontSize: 14,
                    }}>
                      Entry
                    </Text>
                    <Text
                      style={{
                        color: COLORS.black,
                        fontFamily: 'Poppins-SemiBold', fontSize: 16,
                        fontWeight: "700",
                      }}
                    >
                      &#x20B9; {Item.EntryFee}
                    </Text>
                  </View>
                  {/* Match Map */}
                  <View style={style.InfoLeftItem}>
                    <Text style={{
                      color: COLORS.darkGray2,
                      fontFamily: 'Poppins-SemiBold', fontSize: 14,
                    }}>
                      Map
                    </Text>
                    <Text
                      style={{
                        color: COLORS.black,
                        fontFamily: 'Poppins-SemiBold', fontSize: 16,
                        fontWeight: "700",
                      }}
                    >
                      {Item.Map}
                    </Text>
                  </View>
                  {/* Joined Players Number */}
                  <View style={style.InfoLeftItem}>
                    <Text style={{
                      color: COLORS.darkGray2,
                      fontFamily: 'Poppins-SemiBold', fontSize: 14,
                    }}>
                      Slots
                    </Text>
                    <Text
                      style={{
                        color: COLORS.black,
                        fontFamily: 'Poppins-SemiBold', fontSize: 16,
                        fontWeight: "700",
                      }}
                    >
                      {Item.Joined_User.length}/{Item.Total_Players}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            {/* Info Right Image */}
            <View>
              <Image source={GameImage} style={style.InfoWrapperImage} />
            </View>
          </View>
          {/* Hosted By */}
          <View style={{ marginHorizontal: SIZES.padding, marginTop: Dpheight(8) }}>
            <Text style={{
              fontFamily: 'Poppins-SemiBold', fontSize: 19,
              fontWeight: "700",
              color: COLORS.black,
            }}>Hosted by</Text>
            {Get_Specific_Club_Reducer.loading ? (<View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="small" color={COLORS.primary} />
            </View>) : (Get_Specific_Club_Reducer.Sucess ? (<TouchableOpacity onPress={() => setShow_Club_Menu_Modal(true)} style={{
              height: Dpheight(8),
              borderRadius: SIZES.radius,
              flexDirection: "row",
              alignItems: "center",
            }}>
              <Image
                style={{
                  margin: 3,
                  width: DPwidth(10),
                  height: Dpheight(4),
                  resizeMode: "contain",
                }}
                source={{ uri: `https://api.multiavatar.com/${Get_Specific_Club_Reducer?.Responce?.Profile_Pic}.png` }}
              />
              <View style={style.GuildInfo}>
                <View>
                  <Text
                    style={{
                      color: COLORS.black,
                      fontSize: 17,
                      fontWeight: "bold",
                    }}
                  >
                    {Get_Specific_Club_Reducer.Responce.GuildName}
                  </Text>
                </View>
                <ModalClub_Menu modalVisible={Show_Club_Menu_Modal}
                  setModalVisible={setShow_Club_Menu_Modal}
                  navigation={navigation}
                  Club_Details={Get_Specific_Club_Reducer.Responce}
                  Admin_Id={null}
                />
                <View style={{
                  position: "absolute",
                  right: 15
                }}>
                  <Icons name="dots-horizontal" size={20} color="black" />
                </View>
              </View>
            </TouchableOpacity>) : (<View style={{ height: Dpheight(8), justifyContent: "center", alignItems: 'center' }}>
              <Text style={{ textAlign: "center", fontSize: SIZES.h3 }}>Error</Text>
            </View>))}
          </View>
          {/* Bottom Buttons */}
          {/* Money Refund Show On Cancelled*/}
          <View style={{
            marginTop: 20,
            marginBottom: 60
          }}>
            <View style={{
              marginVertical: 30
            }}>
              {/* Go Live */}
              {Item.RoomDetails.YT_Video_id && <View style={style.Elevation}>
                <View>
                  <Player
                    Item={Item}
                    modalVisible={ShowYt_Modal}
                    setModalVisible={setShowYt_Modal}
                  />
                </View>
                <TouchableOpacity onPress={() => { setShowYt_Modal(true) }}
                >
                  <View style={style.GuildWrapper}>
                    <View style={{ margin: 13 }}><Iconss name="live-tv" size={Dpheight(3.4)} color="black" /></View>
                    <View style={style.GuildInfo}>
                      <View>
                        <Text
                          style={{
                            color: COLORS.black,
                            fontSize: 17,
                            fontWeight: "bold",
                          }}
                        >
                          Watch
                        </Text>
                      </View>
                      <View
                        style={{
                          position: "absolute",
                          top: -2,
                          right: 15,
                        }}
                      >
                        <Icon name="angle-right" size={20} color="black" />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>}
              {Match_Cancelled &&
                <View style={style.Elevation}>
                  <View>
                    <MoneyRefund_Comp modalVisible={MoneyRefund}
                      setModalVisible={setMoneyRefund}
                      Match_Id={Item._id}
                      setDisable={setDisable} />
                  </View>
                  <TouchableOpacity
                    onPress={() => { setMoneyRefund(true) }}>
                    <View style={style.GuildWrapper}>
                      <View style={{ margin: 10 }}><Icons name={IsRefunded ? "cash-check" : "cash-refund"} size={32} color="black" /></View>
                      {/* Info Of Guild */}
                      <View style={style.GuildInfo}>
                        <View>
                          <Text
                            style={{
                              color: COLORS.black,
                              fontSize: 17,
                              fontWeight: "bold",
                            }}
                          >
                            {IsRefunded ? "Refunded" : "Take Refund"}
                          </Text>
                        </View>
                        <View
                          style={{
                            position: "absolute",
                            top: -2,
                            right: 15,
                          }}
                        >
                          <Icon name="angle-right" size={20} color="black" />
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>}
              {/* Room Id and Pass */}
              <View style={style.Elevation}>
                <RoomDetailsModal modalVisible={RoomDetailsModals}
                  setModalVisible={setRoomDetailsModal}
                  MatchId={Item._id} RoomDetails={null} />
                <TouchableOpacity
                  onPress={() => { setRoomDetailsModal(true) }}>
                  <View style={style.GuildWrapper}>
                    <View style={{ margin: 12 }}><Icon name="info-circle" size={Dpheight(3)} color="black" /></View>
                    {/* Info Of Guild */}
                    <View style={style.GuildInfo}>
                      <View>
                        <Text
                          style={{
                            color: COLORS.black,
                            fontSize: 17,
                            fontWeight: "bold",
                          }}
                        >
                          Room Details
                        </Text>
                      </View>
                      <View
                        style={{
                          position: "absolute",
                          top: -2,
                          right: 15,
                        }}
                      >
                        <Icon name="angle-right" size={20} color="black" />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              {/* Participants */}
              <View style={style.Elevation}>
                <View>
                  <JoinedUserModal modalVisible={JoinedPlayermodal}
                    setModalVisible={setJoinedPlayermodal}
                    navigation={navigation}
                    Joined_User={Item.Joined_User}
                    Match={Item} />
                </View>
                <TouchableOpacity
                  onPress={() => { setJoinedPlayermodal(true) }}>
                  <View style={style.GuildWrapper}>
                    <View style={{ margin: 10 }}><Icon name="users" size={Dpheight(3)} color="black" /></View>
                    {/* Info Of Guild */}
                    <View style={style.GuildInfo}>
                      <View>
                        <Text
                          style={{
                            color: COLORS.black,
                            fontSize: 17,
                            fontWeight: "bold",
                          }}
                        >
                          {Item.Match_Status === 'Completed' ? "Results" : 'Particpants'}
                        </Text>
                      </View>
                      <View
                        style={{
                          position: "absolute",
                          top: -2,
                          right: 15,
                        }}
                      >
                        <Icon name="angle-right" size={20} color="black" />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            {/* Updates */}
            <View>
              <MatchUpdateModal
                Days={Days}
                Hours={Hours}
                Minutes={Minutes}
                Match_Status={Item.Match_Status} Match_Cancelled={Match_Cancelled} IsClub={false} />
            </View>
          </View>
        </ScrollView>
      ) : (
        // Not Joined
        <>
          <ScrollView>
            {/* Header */}
            <Heading navigation={navigation} Title={"Match Details"} />
            <View
              style={{
                flex: 1,
                marginTop: SIZES.padding,
                flexDirection: "row",
              }}
            >
              {/* all Info */}
              <View
                style={{
                  width: "50%",
                }}
              >
                {/* Title */}
                <View style={style.TitleWraper}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold', fontSize: 22,
                      fontWeight: "700",
                      color: COLORS.black,
                    }}
                  >
                    {Item._id.slice(-2)} {Item.Game_Name} {Item.GameType} Match
                  </Text>
                </View>
                {/* Match Status */}
                <View>
                  {/* Secheduled */}
                  {(Minutes !== 0) && (Item.Match_Status === 'Scheduled') && (
                    <View style={style.EntryFeeWraper}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-SemiBold', fontSize: 18,
                          color: COLORS.primary,
                          fontWeight: "700",
                        }}
                      >
                        Starts In
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Poppins-SemiBold', fontSize: 18,
                          color: COLORS.primary,
                          fontWeight: "700",
                        }}
                      >
                        {!Days || Days === 0 ? null : `${Days}D `}{!Hours || Hours === 0 ? '' : `${Hours}H `}{`${Minutes}M`}
                      </Text>
                    </View>
                  )}
                  {/*Join Now */}
                  {Minutes !== 0 && Item.Match_Status === 'Started' && (
                    <View style={style.EntryFeeWraper}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-SemiBold', fontSize: 18,
                          color: COLORS.primary,
                          fontWeight: "700",
                        }}
                      >
                        Room Available
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Poppins-SemiBold', fontSize: 18,
                          color: COLORS.primary,
                          fontWeight: "700",
                        }}
                      >
                        Starts in
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Poppins-SemiBold', fontSize: 18,
                          color: COLORS.primary,
                          fontWeight: "700",
                        }}
                      >
                        {!Days || Days === 0 ? null : `${Days}D `}{!Hours || Hours === 0 ? '' : `${Hours}H `}{`${Minutes}M`}
                      </Text>
                    </View>
                  )}
                  {/* Ongoing */}
                  {Days === 0 && Hours === 0 && Minutes === 0 && Item.Match_Status === 'Started' && !Match_Cancelled && (
                    <View style={style.EntryFeeWraper}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-SemiBold', fontSize: 18,
                          color: COLORS.primary,
                          fontWeight: "700",
                        }}
                      >
                        Live
                      </Text>
                    </View>
                  )}
                  {/* Completed */}
                  {Days === 0 && Hours === 0 && Minutes === 0 && Item.Match_Status === 'Completed' && (
                    <View style={style.EntryFeeWraper}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-SemiBold', fontSize: 18,
                          color: COLORS.primary,
                          fontWeight: "700",
                        }}
                      >
                        Finished
                      </Text>
                    </View>
                  )}
                  {/* Cancelled */}
                  {Match_Cancelled && (
                    <View style={style.EntryFeeWraper}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-SemiBold', fontSize: 18,
                          color: COLORS.primary,
                          fontWeight: "700",
                        }}
                      >
                        Suspended
                      </Text>
                    </View>
                  )}
                </View>
                {/* Match Info */}
                <View style={style.InfoWrapper}>
                  {/* Info Left Details */}
                  <View>
                    {/* Match Date */}
                    <View style={style.InfoLeftItem}>
                      <Text style={{
                        color: COLORS.darkGray2,
                        fontFamily: 'Poppins-SemiBold', fontSize: 14,
                      }}>
                        Match Date
                      </Text>
                      <Text
                        style={{
                          color: COLORS.black,
                          fontFamily: 'Poppins-SemiBold', fontSize: 16,
                          fontWeight: "700",
                        }}
                      >
                        {new Date(Item.Date_Time).toDateString()}
                      </Text>
                    </View>
                    {/* Match Time */}
                    <View style={style.InfoLeftItem}>
                      <Text style={{
                        color: COLORS.darkGray2,
                        fontFamily: 'Poppins-SemiBold', fontSize: 14,
                      }}>
                        Time
                      </Text>
                      <Text
                        style={{
                          color: COLORS.black,
                          fontFamily: 'Poppins-SemiBold', fontSize: 16,
                          fontWeight: "700",
                        }}
                      >{formatTime(new Date(Item.Date_Time).toLocaleTimeString())}
                      </Text>
                    </View>
                    <View style={style.InfoLeftItem}>
                      <Text style={{
                        color: COLORS.darkGray2,
                        fontFamily: 'Poppins-SemiBold', fontSize: 14,
                      }}>
                        Prize
                      </Text>
                      <Text
                        style={{
                          color: COLORS.primary,
                          fontFamily: 'Poppins-SemiBold', fontSize: 17,
                          fontWeight: "700",
                        }}
                      >
                        &#x20B9; {Item.Perkill_Prize} Per Kill
                      </Text>
                    </View>
                    {/* Match Map */}
                    <View style={style.InfoLeftItem}>
                      <Text style={{
                        color: COLORS.darkGray2,
                        fontFamily: 'Poppins-SemiBold', fontSize: 14,
                      }}>
                        Map
                      </Text>
                      <Text
                        style={{
                          color: COLORS.black,
                          fontFamily: 'Poppins-SemiBold', fontSize: 16,
                          fontWeight: "700",
                        }}
                      >
                        {Item.Map}
                      </Text>
                    </View>
                    {/* Joined Players Number */}
                    <View style={style.InfoLeftItem}>
                      <Text style={{
                        color: COLORS.darkGray2,
                        fontFamily: 'Poppins-SemiBold', fontSize: 14,
                      }}>
                        Slots
                      </Text>
                      <Text
                        style={{
                          color: COLORS.black,
                          fontFamily: 'Poppins-SemiBold', fontSize: 16,
                          fontWeight: "700",
                        }}
                      >
                        {Item.Joined_User.length}/{Item.Total_Players}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* Info Right Image */}
              <View>
                <Image source={GameImage} style={style.InfoWrapperImage} />
              </View>
            </View>
            {/* Hosted By */}
            <View style={{
              marginHorizontal: SIZES.padding,
              marginTop: 140,
              marginBottom: 100
            }}>
              <Text style={{
                fontFamily: 'Poppins-SemiBold', fontSize: 19,
                fontWeight: "700",
                color: COLORS.black,
              }}>Hosted by</Text>
              {Get_Specific_Club_Reducer.loading ? (<View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size='small' color={COLORS.primary} />
              </View>) : (Get_Specific_Club_Reducer.Sucess ? (<TouchableOpacity onPress={() => setShow_Club_Menu_Modal(true)} style={{
                height: Dpheight(8),
                borderRadius: SIZES.radius,
                flexDirection: "row",
                alignItems: "center",
              }}>
                <Image
                  style={{
                    margin: 3,
                    width: DPwidth(10),
                    height: Dpheight(4),
                    resizeMode: "contain",
                  }}
                  source={{ uri: `https://api.multiavatar.com/${Get_Specific_Club_Reducer?.Responce?.Profile_Pic}.png` }}
                />
                <View style={style.GuildInfo}>
                  <View>
                    <Text
                      style={{
                        color: COLORS.black,
                        fontSize: 17,
                        fontWeight: "bold",
                      }}
                    >
                      {Get_Specific_Club_Reducer.Responce.GuildName}
                    </Text>
                  </View>
                  <ModalClub_Menu modalVisible={Show_Club_Menu_Modal}
                    setModalVisible={setShow_Club_Menu_Modal}
                    navigation={navigation}
                    Club_Details={Get_Specific_Club_Reducer.Responce}
                    Admin_Id={null}
                  />
                  <View style={{
                    position: "absolute",
                    right: 15
                  }}>
                    <Icons name="dots-horizontal" size={20} color="black" />
                  </View>
                </View>
              </TouchableOpacity>) : (<View style={{ height: Dpheight(8), justifyContent: "center", alignItems: 'center' }}>
                <Text style={{ textAlign: "center", fontSize: SIZES.h3 }}>Error</Text>
              </View>))}
            </View>
          </ScrollView>
          {/* Join Button */}
          <View>
            <PlayerGameNameInputModal modalVisible={PlayerInputModal}
              setModalVisible={setPlayerInputModal}
              Disable={Disable}
              MatchId={Item._id}
              MatchType={Item.Game_Name}
              setDisable={setDisable}
              loading={loading}
              JoinMatchFunction={Join_Match_Action_Func} />
            <TouchableOpacity
              onPress={() => {
                if (Item.Joined_User.length === Item.Total_Players) {
                  Alert.alert("Message", "Oh Ho! Slots Full", [
                    {
                      text: "OK",
                    },
                  ]);
                  return;
                }
                const date = new Date(Item.Date_Time);
                const milliseconds = date.getTime();
                if (Date.now() >= milliseconds) {
                  Alert.alert("Message", "Oh Ho! You Are Late , Match Allready Started", [
                    {
                      text: "OK",
                    },
                  ]);
                  return;
                }
                setPlayerInputModal(true)
              }}
              disabled={disable_joinmatch_button}
              style={style.Floating_Button_Style}
            >
              {Item.Joined_User.length === Item.Total_Players ? (<Text
                style={{
                  color: COLORS.white,
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                Slots Full
              </Text>) : (<Text
                style={{
                  color: COLORS.white,
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                Entry &#x20B9;{Item.EntryFee}
              </Text>)}
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default GameDetailsPage;

const style = RN_Styles.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  TitleWraper: {
    marginHorizontal: SIZES.padding,
  },
  EntryFeeWraper: {
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
  },
  InfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SIZES.padding,
    marginLeft: SIZES.padding,
  },
  InfoLeftItem: {
    marginBottom: SIZES.base,
  },
  InfoWrapperImage: {
    width: DPwidth(52),
    height: Dpheight(50),
    resizeMode: "stretch",
  },
  Elevation: {
    backgroundColor: "white",
    borderRadius: SIZES.radius,
    elevation: 3,
    marginVertical: 8,
    marginHorizontal: SIZES.padding,
    //For Ios Only -- SHOWdow code
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  GuildWrapper: {
    height: 60,
    borderRadius: SIZES.radius,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  GuildInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  Floating_Button_Style: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 30,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SIZES.padding,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    marginHorizontal: SIZES.padding,
  },
});
