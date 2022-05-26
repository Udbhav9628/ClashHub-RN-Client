import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../../../constants/Theame";
import React, { useState, useEffect } from "react";
import { CalculateLength } from "../../../utils/Utils";
import Icon from "react-native-vector-icons/Ionicons";
import Textinput from "./Textinput";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Create_Match,
  Fetch_All_Matchs,
  Clear_Match_Reducer_Error,
  Clear_Match_Reducer_Sucess,
} from "../../../store/Match/Matchaction";
import ModalGame from "../../../components/ModalGame";
import DateTimePicker from '@react-native-community/datetimepicker';

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
  const [Select_Game, setSelect_Game] = useState("");
  const [Total_Players, setTotal_Players] = useState();
  const [PlayersLength, setPlayersLength] = useState();
  const [Prize_Pool, setPrize_Pool] = useState();
  const [PrizeLength, setPrizeLength] = useState();

  const [Disable, setDisable] = useState(false);

  const [ModalGamemodalVisible, setModalGamemodalVisible] = useState(false);

  const dispatch = useDispatch();
  const Create_Match_action = bindActionCreators(Create_Match, dispatch);

  const Data = {
    Guild_Id: Guild_Id,
    Game_Name: Select_Game,
    Total_Players: Total_Players,
    Prize_Pool: Prize_Pool,
  };

  const { User } = useSelector((state: any) => state.AuthReducer);

  const Fetch_All_Match = bindActionCreators(Fetch_All_Matchs, dispatch);

  const Clear_Match_Error = bindActionCreators(
    Clear_Match_Reducer_Error,
    dispatch
  );

  const Clear_Match_Sucess = bindActionCreators(
    Clear_Match_Reducer_Sucess,
    dispatch
  );

  const { loading, Sucess, Error } = useSelector(
    (state: any) => state.Create_matches_Reducer
  );

  useEffect(() => {
    if (Sucess) {
      Clear_Match_Sucess();
      Alert.alert("Alert", "Match Created Sucessfully", [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("YourGuildsMatches");
            Fetch_All_Match("");
            setModalVisible(!modalVisible);
          },
        },
      ]);
    }
  }, [Sucess]);

  useEffect(() => {
    if (Error) {
      Alert.alert("Error", Error + " , Try Again", [
        {
          text: "OK",
          onPress: () => {
            setDisable(false);
            Clear_Match_Error();
          },
        },
      ]);
    }
  }, [Error]);

  function CreateMatchOnClick(Data: object) {
    if (User) {
      Create_Match_action(Data);
    } else {
      navigation.navigate("Signin");
    }
  }

  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date');
  const [Ishow, setShow] = useState(false);
  const [text, settext] = useState('Empty');

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  }

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  }

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
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
                  lineHeight: 30,
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
                  lineHeight: 22,
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
          <DateTimePicker testID="dateTimePicker" value={date} mode="date" is24Hour={false} display='default' onChange={onChange} />
          {/* GameModal */}
          <ModalGame modalVisible={ModalGamemodalVisible}
            setModalVisible={setModalGamemodalVisible} Selectected_Game={setSelect_Game} />
          <View>
            <Text style={{
              color: COLORS.gray,
              fontWeight: "600",
              ...FONTS.body3,
            }}>Game</Text>
          </View>
          <TouchableOpacity style={{
            height: 55,
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
                fontSize: 14,
              }}
            >
              {Select_Game || "Select Game"}
            </Text>
          </TouchableOpacity>
          <Textinput
            containerStyle={{ flex: 1, marginTop: 15 }}
            label="Total Players"
            Placeholder={"Enter Total no Players"}
            KeyboardType="numeric"
            autoCapatilize={"none"}
            maxLength={3}
            onchange={(Value: any) => {
              CalculateLength(Value, setPlayersLength, 3);
              setTotal_Players(Value);
            }}
            Msg={PlayersLength || PlayersLength === 0 ? PlayersLength : 3}
          />
          <Textinput
            containerStyle={{ flex: 1, marginTop: 15 }}
            label="Amount To Give Per Kill"
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
          {/* Create Match Button */}
          <TouchableOpacity
            style={{
              height: 55,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 40,
              marginBottom: 40,
              borderRadius: SIZES.radius,
              backgroundColor: Disable
                ? COLORS.transparentPrimray
                : COLORS.primary,
            }}
            onPress={() => {
              CreateMatchOnClick(Data);
              setDisable(true);
            }}
            disabled={Disable}
          >
            {loading ? (
              <View>
                <ActivityIndicator size="large" color={COLORS.primary} />
              </View>
            ) : (
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
