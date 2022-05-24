import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { COLORS, SIZES } from "../../../constants/Theame";
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

const Createguild = ({ navigation }: { navigation: any }) => {
  const [GuildName, setGuildName] = useState("");
  const [GuildNameLength, setGuildNameLength] = useState();

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

  const Data = {
    GuildName: GuildName,
    GuildDescription: GuildDescription,
  };

  const { User } = useSelector((state: any) => state.AuthReducer);
  const { loading, Error, sucess } = useSelector(
    (state: any) => state.Create_Guild_Reducer
  );

  function CreateMatchOnClick(Data: object) {
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
      Alert.alert("Message", "Guild Created Sucessfully", [
        {
          text: "OK",
          onPress: () => {
            Clear_Guild_Sucess();
            navigation.goBack();
          },
        },
      ]);
    }
  }, [sucess]);

  useEffect(() => {
    if (Error) {
      Alert.alert("Error", Error + " , Try Again", [
        {
          text: "OK",
          onPress: () => {
            Clear_Guild_Error();
          },
        },
      ]);
    }
  }, [Error]);
  return (
    <>
      <Heading navigation={navigation} Title={" Create Guild"} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.Container}
      >
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
                Let's Create Your Guild
              </Text>
              <Text
                style={{
                  marginTop: SIZES.base,
                  color: COLORS.darkGray,
                  fontSize: SIZES.body3,
                  lineHeight: 22,
                }}
              >
                This is One Time Process
              </Text>
            </View>

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
            containerStyle={{ flex: 1 }}
            label="Enter Guild Name"
            Placeholder={"Enter Here"}
            KeyboardType="default"
            autoCapatilize={"words"}
            maxLength={10}
            onchange={(Value: any) => {
              CalculateLength(Value, setGuildNameLength, 10);
              setGuildName(Value);
            }}
            Msg={
              GuildNameLength || GuildNameLength === 0 ? GuildNameLength : 10
            }
          />
          <Textinput
            containerStyle={{ flex: 1, marginTop: 15 }}
            label="Guild Description"
            Placeholder={"Entre Description"}
            KeyboardType="default"
            autoCapatilize={"words"}
            maxLength={11}
            onchange={(Value: any) => {
              CalculateLength(Value, setGuildDescriptionLength, 11);
              setGuildDescription(Value);
            }}
            Msg={
              GuildDescriptionLength || GuildDescriptionLength === 0
                ? GuildDescriptionLength
                : 11
            }
          />
          {/* Create Guild Button */}
          <TouchableOpacity
            style={{
              height: 55,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 40,
              marginBottom: 40,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.primary,
            }}
            onPress={() => {
              CreateMatchOnClick(Data);
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
                  lineHeight: 22,
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
    marginTop: 10,
  },
  Header: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 40,
    marginHorizontal: SIZES.h4,
  },
  HeaderLeft: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: "#CDCDCD",
    borderRadius: SIZES.radius,
  },
});
