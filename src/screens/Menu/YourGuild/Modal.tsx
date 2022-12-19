import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { COLORS, Dpheight, DPwidth, FONTS, SIZES } from "../../../constants/Theame";
import React, { useState, useEffect } from "react";
import { CalculateLength, ReturnGameMap, ReturnMap_Modal_Height } from "../../../utils/Utils";
import Icon from "react-native-vector-icons/Ionicons";
import Textinput from "./Textinput";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Create_Match,
  Clear_Match_Reducer_Error,
  Clear_Match_Reducer_Sucess,
} from "../../../store/Match/Matchaction";
import ModalGame from "../../../components/ModalGame";
import DateTimePicker from '@react-native-community/datetimepicker';
import ModalGameType from "../../../components/ModalGameType";
import { MatchType, PubgMap, TotalPlayers } from "../../../constants/Data";

const ModalScreen = ({
  Guild_Id,
  modalVisible,
  setModalVisible,
  navigation,
}: {
  Guild_Id: any;
  modalVisible: any;
  setModalVisible: any;
  navigation: any;
}) => {

  // Match Data
  const [Select_Game, setSelect_Game] = useState("");
  const [GameType, setGameType] = useState('');
  const [Map, setMap] = useState('')
  const [Total_Players, setTotal_Players] = useState('');
  const [Prize_Pool, setPrize_Pool] = useState('');
  const [PrizeLength, setPrizeLength] = useState();
  const [EntryFee, setEntryFee] = useState('');
  const [EntryFeeLength, setEntryFeeLength] = useState();
  // Match Data

  const [ModalGamemodalVisible, setModalGamemodalVisible] = useState(false);
  const [Modal_GameType_modalVisible, setModal_GameType_modalVisible] = useState(false);
  const [Modal_Map_modalVisible, setModal_Map_modalVisible] = useState(false);
  const [Modal_Player_modalVisible, setModal_Player_modalVisible] = useState(false);

  // Date Time
  const [dateTime, setdateTime] = useState(new Date())
  const [MaindateDateTime, setMaindateDateTime] = useState("")
  const [Formateddate, setFormateddate] = useState("")
  const [FormatedTime, setFormatedTime] = useState("")
  const [mode, setMode] = useState();
  const [Show, setShow] = useState(false);

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  }

  // Time Function
  const onChange = (event: any, selectedDate: any) => {
    setShow(false);

    let tempdate = new Date(selectedDate);

    const Match_HR = tempdate.getHours()
    const Match_Min = tempdate.getMinutes()

    tempdate.setHours(Match_HR, Match_Min, 0, 0);

    setMaindateDateTime(tempdate);
    setdateTime(tempdate);

    setFormateddate(tempdate.getDate() + " / " + (tempdate.getMonth() + 1) + " / " + tempdate.getFullYear());

    setFormatedTime(tempdate.getHours() + " : " + tempdate.getMinutes());
  }

  const dispatch = useDispatch();
  const Create_Match_action = bindActionCreators(Create_Match, dispatch);

  const Data = {
    Guild_Id: Guild_Id,
    Game_Name: Select_Game,
    GameType: GameType,
    GameMap: Map,
    Total_Players: Total_Players,
    EntryFee: EntryFee,
    Perkill_Prize: Prize_Pool,
    Date_Time: MaindateDateTime
  };

  const { User } = useSelector((state: any) => state.FetchUser_reducer);

  const Clear_Match_Error = bindActionCreators(
    Clear_Match_Reducer_Error,
    dispatch
  );

  const Clear_Match_Sucess = bindActionCreators(
    Clear_Match_Reducer_Sucess,
    dispatch
  );

  const { loading, Sucess, Error, Responce } = useSelector(
    (state: any) => state.Create_matches_Reducer
  );

  useEffect(() => {
    if (Sucess) {
      Clear_Match_Sucess();
      ClearData()
      Alert.alert("Alert", Responce, [
        {
          text: "OK",
          onPress: () => {
            setModalVisible(false);
          },
        },
      ]);
    }
  }, [Sucess]);

  useEffect(() => {
    if (Error) {
      ClearData()
      Clear_Match_Error()
      Alert.alert("Error", Error + " , Try Again", [
        {
          text: "OK",
          onPress: () => {
            setModalVisible(false);
          },
        },
      ]);
    }
  }, [Error]);

  function CreateMatchOnClick(Data: object) {
    if (User) {
      if (Select_Game === "" || GameType === '' || Map === '' || Total_Players === '' || EntryFee === '' || Prize_Pool === '' || MaindateDateTime === '') {
        Alert.alert("Alert", "Please Fill All Details To create Match", [
          {
            text: "OK",
          },
        ]);
        return
      }
      // 4 Hours
      let tempdate = new Date(MaindateDateTime);
      if (tempdate.getTime() <= Date.now() + 14400000) {
        setShow(false)
        Alert.alert("Alert", "Please Choose Match's Date & Time At least 4 Hours Ahead From Now", [
          {
            text: "OK",
          },
        ]);
        return
      }
      // 30 Days
      if (tempdate.getTime() >= Date.now() + 2592000000) {
        setShow(false)
        Alert.alert("Alert", "Please Choose Match's Date & Time atleast Within 30 Days", [
          {
            text: "OK",
          },
        ]);
        return
      }
      Create_Match_action(Data);
    } else {
      navigation.navigate("Signin");
    }
  }

  useEffect(() => {
    setMap('')
  }, [Select_Game])

  function ClearData() {
    setMaindateDateTime('')
    setFormateddate('')
    setFormatedTime('')
    setSelect_Game('')
    setGameType('')
    setMap('')
    setTotal_Players('')
    setPrize_Pool('')
    setPrizeLength()
    setEntryFee('')
    setEntryFeeLength()
  }

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
        ClearData()
      }}
    >
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.Container}
      >
        <View style={styles.CrossSign}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Icon name="arrow-back" size={28} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingVertical: SIZES.base,
            backgroundColor: COLORS.white,
          }}
        >
          <View
            style={{
              flex: 1,
              marginHorizontal: SIZES.padding,
            }}
          >
            {/* Title & Sub Title*/}
            <View
              style={{
                marginTop: SIZES.base,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: SIZES.h2,
                  fontWeight: "bold",
                }}
              >
                Let's Create Match
              </Text>
              <Text
                style={{
                  marginTop: SIZES.base,
                  color: COLORS.darkGray,
                  fontSize: SIZES.body3,
                  lineHeight: SIZES.h1,
                }}
              >
                Fill Details Below
              </Text>
            </View>
          </View>
        </View>
        {/* Content / Children */}
        <View
          style={{
            marginTop: SIZES.base,
            paddingHorizontal: SIZES.padding,
          }}
        >
          {/* SELECT GAME */}
          <View>
            <ModalGame modalVisible={ModalGamemodalVisible}
              setModalVisible={setModalGamemodalVisible} Selectected_Game={setSelect_Game} />
            <Text style={{
              color: COLORS.gray,
              fontWeight: "600",
              ...FONTS.body3,
            }}>Game</Text>
            <TouchableOpacity style={{
              height: Dpheight(7),
              alignItems: "flex-start",
              justifyContent: "center",
              marginTop: 5,
              paddingLeft: 25,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray2
            }}
              onPress={() => {
                setModalGamemodalVisible(!ModalGamemodalVisible);
              }}>
              <Text
                style={{
                  backgroundColor: COLORS.lightGray2,
                  color: COLORS.gray,
                  fontWeight: "500",
                  fontSize: SIZES.body4,
                }}
              >
                {Select_Game || "Select Game"}
              </Text>
            </TouchableOpacity>
          </View>
          {/* SELECT GAME Type */}
          <View style={{ marginTop: 15 }}>
            <ModalGameType modalVisible={Modal_GameType_modalVisible}
              setModalVisible={setModal_GameType_modalVisible} Selectected_GameType={setGameType}
              height={Dpheight(10)}
              Data={MatchType}
            />
            <Text style={{
              color: COLORS.gray,
              fontWeight: "600",
              ...FONTS.body3,
            }}>Game Type</Text>
            <TouchableOpacity style={{
              height: Dpheight(7),
              alignItems: "flex-start",
              justifyContent: "center",
              marginTop: 5,
              paddingLeft: 25,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray2
            }}
              onPress={() => {
                setModal_GameType_modalVisible(!Modal_GameType_modalVisible);
              }}>
              <Text
                style={{
                  backgroundColor: COLORS.lightGray2,
                  color: COLORS.gray,
                  fontWeight: "500",
                  fontSize: SIZES.body4,
                }}
              >
                {GameType || "Select GameType"}
              </Text>
            </TouchableOpacity>
          </View>
          {/* Choose Map */}
          <View style={{ marginTop: 15 }}>
            <ModalGameType modalVisible={Modal_Map_modalVisible}
              setModalVisible={setModal_Map_modalVisible} Selectected_GameType={setMap}
              height={ReturnMap_Modal_Height(Select_Game || "")}
              Data={ReturnGameMap(Select_Game || "")}
            />
            <Text style={{
              color: COLORS.gray,
              fontWeight: "600",
              ...FONTS.body3,
            }}>Choose Map</Text>
            <TouchableOpacity style={{
              height: Dpheight(7),
              alignItems: "flex-start",
              justifyContent: "center",
              marginTop: 5,
              paddingLeft: 25,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray2
            }}
              onPress={() => {
                setModal_Map_modalVisible(!Modal_Map_modalVisible);
              }}>
              <Text
                style={{
                  backgroundColor: COLORS.lightGray2,
                  color: COLORS.gray,
                  fontWeight: "500",
                  fontSize: SIZES.body4,
                }}
              >
                {Map || "Select Map"}
              </Text>
            </TouchableOpacity>
          </View>
          {/* Total Players */}
          <View style={{ marginTop: 15 }}>
            <ModalGameType modalVisible={Modal_Player_modalVisible}
              setModalVisible={setModal_Player_modalVisible} Selectected_GameType={setTotal_Players}
              height={Dpheight(43)}
              Data={TotalPlayers}
            />
            <Text style={{
              color: COLORS.gray,
              fontWeight: "600",
              ...FONTS.body3,
            }}>Total_Players</Text>
            <TouchableOpacity style={{
              height: Dpheight(7),
              alignItems: "flex-start",
              justifyContent: "center",
              marginTop: 5,
              paddingLeft: 25,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray2
            }}
              onPress={() => {
                setModal_Player_modalVisible(!Modal_Player_modalVisible);
              }}>
              <Text
                style={{
                  backgroundColor: COLORS.lightGray2,
                  color: COLORS.gray,
                  fontWeight: "500",
                  fontSize: SIZES.body4,
                }}
              >
                {Total_Players || "Select Max Players"}
              </Text>
            </TouchableOpacity>
          </View>
          {/* Entry Fees */}
          <Textinput
            containerStyle={{ flex: 1, marginTop: 15 }}
            label="Entry Fee"
            Placeholder={"Entry Fee for Joining Match"}
            KeyboardType="numeric"
            autoCapatilize={"none"}
            maxLength={2}
            onchange={(Value: any) => {
              CalculateLength(Value, setEntryFeeLength, 2);
              setEntryFee(Value);
            }}
            Msg={EntryFeeLength || EntryFeeLength === 0 ? EntryFeeLength : 2}
          />
          {/* Prize */}
          <Textinput
            containerStyle={{ flex: 1, marginTop: 15 }}
            label="Per Kill Pzize"
            Placeholder={"Entre Amount You want to give"}
            KeyboardType="numeric"
            autoCapatilize={"none"}
            maxLength={2}
            onchange={(Value: any) => {
              CalculateLength(Value, setPrizeLength, 2);
              setPrize_Pool(Value);
            }}
            Msg={PrizeLength || PrizeLength === 0 ? PrizeLength : 2}
          />
          {/* Date Time */}
          <View style={{ marginTop: 10, marginBottom: 8 }}>
            <Text style={{
              color: COLORS.gray,
              fontWeight: "600",
              ...FONTS.body3,
            }}>Date Time</Text>
          </View>
          {Show && (<DateTimePicker testID="dateTimePicker" value={dateTime} mode={mode} is24Hour={true} display='default' onChange={onChange} />)}
          <View style={{ flexDirection: "row", justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <TouchableOpacity style={{
              height: Dpheight(7),
              width: DPwidth(40.8),
              paddingLeft: 25,
              marginRight: 20,
              justifyContent: "center",
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray2
            }}
              onPress={() => {
                showMode('date')
              }}>
              <Text
                style={{
                  backgroundColor: COLORS.lightGray2,
                  color: COLORS.gray,
                  fontWeight: "500",
                  fontSize: SIZES.body4,
                }}
              >
                {Formateddate || "Chose Date"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              height: Dpheight(7),
              width: DPwidth(40.8),
              paddingLeft: 25,
              justifyContent: "center",
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray2
            }}
              onPress={() => {
                showMode('time')
              }}>
              <Text
                style={{
                  backgroundColor: COLORS.lightGray2,
                  color: COLORS.gray,
                  fontWeight: "500",
                  fontSize: SIZES.body4,
                }}
              >
                {FormatedTime || "Chose Time"}
              </Text>
            </TouchableOpacity>
          </View>
          {/* Create Match Button */}
          <TouchableOpacity
            style={{
              height: Dpheight(7),
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30,
              marginBottom: 40,
              borderRadius: SIZES.radius,
              backgroundColor: loading
                ? COLORS.transparentPrimray
                : COLORS.primary,
            }}
            onPress={() => {
              CreateMatchOnClick(Data);
            }}
            disabled={loading}
          >
            {loading ? (
              <View>
                <ActivityIndicator size="large" color={COLORS.white} />
              </View>
            ) : (
              <Text
                style={{
                  color: COLORS.white,
                  fontWeight: "bold",
                  fontSize: SIZES.body3,
                }}
              >
                Create Match
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({
  Container: { backgroundColor: COLORS.white, flex: 1 },
  CrossSign: { position: "absolute", top: 15, left: 20, zIndex: 999 },
});
