import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { COLORS, Dpheight, DPwidth, SIZES } from "../../../constants/Theame";
import React, { useState, useEffect } from "react";
import { CalculateLength } from "../../../utils/Utils";
import Textinput from "./Textinput";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Create_Guild,
  Clear_Guild_Reducer_Error,
  Clear_Guild_Reducer_Sucess,
} from "../../../store/Guild/GuildAction";
import Heading from "../../../components/Heading";
import AuthLayout from "../../Auth/AuthLayout";

const Createguild = ({ navigation }: { navigation: any }) => {
  const [GuildName, setGuildName] = useState("");
  const [GuildNameLength, setGuildNameLength] = useState();

  const [GuildID, setGuildID] = useState("");
  const [GuildIDLength, setGuildIDLength] = useState();

  const [GuildDescription, setGuildDescription] = useState("");
  const [GuildDescriptionLength, setGuildDescriptionLength] = useState();

  const dispatch = useDispatch();
  const Create_Guild_action = bindActionCreators(Create_Guild, dispatch);

  const Clear_Guild_Sucess = bindActionCreators(
    Clear_Guild_Reducer_Sucess,
    dispatch
  );

  const Clear_Guild_Error = bindActionCreators(
    Clear_Guild_Reducer_Error,
    dispatch
  );

  const { User } = useSelector((state: any) => state.FetchUser_reducer);
  const { loading, Error, sucess } = useSelector(
    (state: any) => state.Create_Guild_Reducer
  );

  function CreateGuildOnClick(Data: object) {
    if (User) {
      Create_Guild_action(Data);
    } else {
      Alert.alert("Error", Error + " , Reload", [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("Signin");
          },
        },
        {
          text: "Cancel",
        },
      ]);
    }
  }

  useEffect(() => {
    if (sucess) {
      Clear_Guild_Sucess();
      Alert.alert("Message", "Club Created Sucessfully", [
        {
          text: "OK",
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }
  }, [sucess]);

  useEffect(() => {
    if (Error) {
      Clear_Guild_Error();
      Alert.alert("Error", Error + " , Try Again", [
        {
          text: "OK",
        },
      ]);
    }
  }, [Error]);
  return (
    <>
      <Heading navigation={navigation} Title={"Create Club"} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.Container}
      >
        <View>
          <View>
            {/* Title & Sub Title*/}
            <AuthLayout Title={"Let's Create Your Club"} SubTitle={"This is one time Process"} />

            {/* Content / Children */}
          </View>
        </View>
        <View
          style={{
            marginTop: SIZES.base,
            paddingHorizontal: SIZES.padding,
          }}
        >
          <Textinput
            containerStyle={{ flex: 1, marginTop: 15 }}
            label="Club Name"
            Placeholder={"Enter Name"}
            KeyboardType="default"
            autoCapatilize={"words"}
            maxLength={30}
            onchange={(Value: any) => {
              CalculateLength(Value, setGuildNameLength, 30);
              const text = Value.replace(/\s{2,}/g, ' ').trim()
              setGuildName(text);
            }}
            Msg={
              GuildNameLength || GuildNameLength === 0 ? GuildNameLength : 30
            }
          />
          <Textinput
            containerStyle={{ flex: 1, marginTop: 20 }}
            label="Club Username"
            Placeholder={"It must be Unique"}
            KeyboardType="default"
            autoCapatilize={"words"}
            maxLength={20}
            onchange={(Value: any) => {
              CalculateLength(Value, setGuildIDLength, 20);
              const text = Value.replace(/\s{2,}/g, ' ').trim()
              setGuildID(text);
            }}
            Msg={
              GuildIDLength || GuildIDLength === 0 ? GuildIDLength : 20
            }
          />
          <Textinput
            containerStyle={{ flex: 1, marginTop: 20 }}
            label="Club Description"
            Placeholder={"Entre Description"}
            KeyboardType="default"
            autoCapatilize={"words"}
            maxLength={80}
            onchange={(Value: any) => {
              CalculateLength(Value, setGuildDescriptionLength, 80);
              const text = Value.replace(/\s{2,}/g, ' ').trim()
              setGuildDescription(text);
            }}
            Msg={
              GuildDescriptionLength || GuildDescriptionLength === 0
                ? GuildDescriptionLength
                : 80
            }
          />
          {/* Create Guild Button */}
          <TouchableOpacity
            style={{
              height: Dpheight(6.9),
              alignItems: "center",
              justifyContent: "center",
              marginTop: 40,
              marginBottom: 40,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.primary,
            }}
            onPress={() => {
              if (GuildName === "" || GuildID === "" || GuildDescription === "") {
                Alert.alert("Alert", "Please Fill All Details", [
                  {
                    text: "OK",
                  },
                ]);
                return;
              }
              const Data = {
                GuildName: GuildName,
                GuildID: GuildID,
                GuildDescription: GuildDescription,
              };
              CreateGuildOnClick(Data);
            }}
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
                }}
              >
                Create Guild
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default Createguild;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  Header: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 40,
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
});
