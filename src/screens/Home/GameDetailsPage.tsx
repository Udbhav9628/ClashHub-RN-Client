import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SIZES, COLORS, FONTS, Dpheight, DPwidth } from "../../constants/Theame";
import Icons from "../../constants/Icons";
import BottomPopup from "../../components/BottomPopup";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Join_Match_action,
  Clear_Match_Reducer_Error,
  Clear_Match_Reducer_Sucess,
  RemoveMatchItem,
} from "../../store/Match/Matchaction";
import { useFocusEffect } from "@react-navigation/native";
import ModalJoinedPlayers from "../Menu/YourGuild/ModalJoinedPlayers";

const GameDetailsPage = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {

  const { Item, GameImage } = route.params;

  const [JoinedPlayermodal, setJoinedPlayermodal] = useState(false);

  const [disable_joinmatch_button, setdisable_joinmatch_button] = useState(false);

  const { Join_Sucess, Error, Responce } = useSelector(
    (state: any) => state.Join_Match_Reducer
  );

  const { User } = useSelector((state: any) => state.FetchUser_reducer);

  const { Home_Matchs } = useSelector(
    (state: any) => state.Get_Home_Page_Matches
  );

  const isJoined = Item.Joined_User.find((Item: any) => {
    return Item.UserId === User.id;
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

  useEffect(() => {
    if (Join_Sucess) {
      Alert.alert("Message", Responce, [
        {
          text: "OK",
          onPress: () => {
            Clear_Match_Sucess();
            Remove_Match_Item(Home_Matchs, Item._id);
            navigation.goBack()
          },
        },
      ]);
    }
  }, [Join_Sucess]);

  useEffect(() => {
    if (Error) {
      Alert.alert("Error", Error, [
        {
          text: "OK",
          onPress: () => {
            Clear_Match_ReducerError();
          },
        },
      ]);
    }
  }, [Error]);

  const [Days, setDays] = useState(0);
  const [Hours, setHours] = useState(0);
  const [Minutes, setMinutes] = useState(0);

  const Second = 1000;
  const Minute = Second * 60;
  const Hour = Minute * 60;
  const Day = Hour * 24;

  const [Room_Details, setRoom_Details] = useState("");
  const [Msg, setMsg] = useState("");

  function Timer_Function() {
    const Match_time = new Date(Item.Date_Time).getTime();
    const now = new Date().getTime();
    const Gap = Match_time - now;
    const TextDay = Math.floor(Gap / Day);
    const TextHour = Math.floor((Gap % Day) / Hour);
    const TextMinute = Math.floor((Gap % Hour) / Minute);
    if (Gap < 0) {
      //Stop Timer
      clearInterval(Timer);
      setRoom_Details(
        "You are Late, Reporting Time is 10 Min Before Match Time"
      );
      setMsg("Its Live");
    } else if (Gap <= 1200000) {
      setDays(TextDay);
      setHours(TextHour);
      setMinutes(TextMinute);
      setRoom_Details("Room Id & Password Is Avilable, Grab It Hurry");
    } else {
      //Set Timer
      setRoom_Details("Will Be Available 20 Min Before Match Time");
      setDays(TextDay);
      setHours(TextHour);
      setMinutes(TextMinute);
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
      {/* Header */}
      <View style={style.Header}>
        {/* Header Left */}
        <TouchableOpacity
          style={style.HeaderLeft}
          onPress={() => navigation.goBack()}
        >
          <Icon name="angle-left" size={20} color="black" />
        </TouchableOpacity>
        <View
          style={{
            marginLeft: "21%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.black,
              ...FONTS.body2,
              fontWeight: "700",
            }}
          >
            Match Details
          </Text>
        </View>
      </View>
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
                ...FONTS.h1,
                fontWeight: "700",
                color: COLORS.black,
              }}
            >
              {Item.Game_Name} {Item.GameType} Match
            </Text>
          </View>
          {Minutes !== 0 && (isJoined ? (
            <View style={style.EntryFeeWraper}>
              <Text
                style={{
                  ...FONTS.h1,
                  color: COLORS.primary,
                  fontWeight: "700",
                }}
              >
                Joined
              </Text>
            </View>
          ) : (
            <View style={style.EntryFeeWraper}>
              <Text
                style={{
                  ...FONTS.body2,
                  color: COLORS.primary,
                  fontWeight: "700",
                }}
              >
                Starts In
              </Text>
              <Text
                style={{
                  ...FONTS.body2,
                  color: COLORS.primary,
                  fontWeight: "700",
                }}
              >
                {!Days || Days === 0 ? '' : `${Days}D`} {!Hours || Hours === 0 ? '' : `${Hours}H:`}{`${Minutes}M`}
              </Text>
            </View>
          ))}
          {/* Match Info */}
          <View style={style.InfoWrapper}>
            {/* Info Left Details */}
            <View>
              {/* Joined Players Number */}
              <View style={style.InfoLeftItem}>
                <Text style={{ color: COLORS.darkGray2, ...FONTS.h3 }}>
                  Slots
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    ...FONTS.body3,
                    fontWeight: "700",
                  }}
                >
                  {Item.Joined_User.length}/{Item.Total_Players}
                </Text>
              </View>
              <View style={style.InfoLeftItem}>
                <Text style={{ color: COLORS.darkGray2, ...FONTS.h3 }}>
                  Prize
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    ...FONTS.body3,
                    fontWeight: "700",
                  }}
                >
                  &#x20B9; {Item.Perkill_Prize} Per Kill
                </Text>
              </View>
              {/* Match Map */}
              <View style={style.InfoLeftItem}>
                <Text style={{ color: COLORS.darkGray2, ...FONTS.h3 }}>
                  Map
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    ...FONTS.body3,
                    fontWeight: "700",
                  }}
                >
                  {Item.Map}
                </Text>
              </View>
              {/* Match Date */}
              <View style={style.InfoLeftItem}>
                <Text style={{ color: COLORS.darkGray2, ...FONTS.h3 }}>
                  Match Date
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    ...FONTS.body3,
                    fontWeight: "700",
                  }}
                >
                  {new Date(Item.Date_Time).toDateString()}
                </Text>
              </View>
              {/* Match Time */}
              <View style={style.InfoLeftItem}>
                <Text style={{ color: COLORS.darkGray2, ...FONTS.h3 }}>
                  Match Time
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    ...FONTS.body3,
                    fontWeight: "700",
                  }}
                >
                  {new Date(Item.Date_Time).toLocaleTimeString().slice(0, 5)}
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
      {/* Match By Guild */}
      {Item.Match_Status === 'Completed' && (<View style={style.Elevation}>
        <View>
          <ModalJoinedPlayers modalVisible={JoinedPlayermodal}
            setModalVisible={setJoinedPlayermodal}
            navigation={navigation}
            Joined_User={Item.Joined_User} Match={Item} ShowReportButton={true} />
        </View>
        <TouchableOpacity
          onPress={() => { setJoinedPlayermodal(true) }}>
          <View style={style.GuildWrapper}>
            <Image
              style={{
                marginHorizontal: 12,
                width: DPwidth(12),
                height: Dpheight(7),
                borderRadius: SIZES.radius,
                resizeMode: "cover",
              }}
              source={{
                uri: "https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-result-internet-marketing-service-flaticons-flat-flat-icons.png",
              }}
            />
            {/* Info Of Guild */}
            <View style={style.GuildInfo}>
              <View>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: SIZES.h3,
                    fontWeight: "bold",
                  }}
                >
                  Match Results
                </Text>
              </View>
              <View
                style={{
                  position: "absolute",
                  top: -2,
                  right: 15,
                }}
              >
                <Icon name="angle-right" size={24} color="black" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>)}
      {!isJoined && (
        <View>
          <TouchableOpacity
            onPress={() => {
              Join_Match_Action_Func(Item._id, Item.EntryFee);
            }}
            disabled={disable_joinmatch_button}
            style={{
              height: Dpheight(6.9),
              alignItems: "center",
              justifyContent: "center",
              marginTop: SIZES.padding,
              marginBottom: SIZES.padding,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.primary,
              marginHorizontal: SIZES.padding,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontWeight: "bold",
                fontSize: SIZES.body3,
              }}
            >
              Entry &#x20B9;10
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default GameDetailsPage;

const style = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  Header: {
    marginTop: 10,
    flexDirection: "row",
    marginHorizontal: SIZES.h3,
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
    margin: SIZES.padding,
    marginHorizontal: SIZES.padding,
    //For Ios Only -- SHOWdow code
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  GuildWrapper: {
    height: Dpheight(8),
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
});
