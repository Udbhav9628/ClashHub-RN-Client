import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { COLORS, SIZES, FONTS } from "../../constants/Theame";
import { useFocusEffect } from "@react-navigation/native";
import Icons from "../../constants/Icons";

const GameItems = ({
  ContainerStyle,
  Imagestyle,
  Item,
  onPress,
}: {
  ContainerStyle: any;
  Imagestyle: any;
  Item: any;
  onPress: any;
}) => {
  //Timer
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
      //TO DO - Remove this match from the all matches list
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

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderBottomRightRadius: 30,
        flexDirection: "row",
        borderRadius: SIZES.radius,
        ...ContainerStyle,
      }}
    >
      {/* Image*/}
      <View style={{ marginRight: 3 }}>
        <Image source={Icons.Pubg2} style={Imagestyle} />
      </View>
      {/* Info */}
      <View>
        {/* Name */}
        <Text
          style={{ ...FONTS.body3, fontWeight: "700", color: COLORS.black }}
        >
          {Item.Game_Name} Squad Match
        </Text>
        {/* Description */}
        <Text style={{ ...FONTS.h4, color: COLORS.darkGray2 }}>
          Play Match win and earn
        </Text>
        {/* More Info Section */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginRight: 48,
              marginLeft: SIZES.base,
            }}
          >
            <Text style={{ ...FONTS.h4, color: COLORS.darkGray2 }}>
              Prize Pool
            </Text>
            <Text
              style={{ color: COLORS.black, ...FONTS.h4, fontWeight: "700" }}
            >
              800
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ ...FONTS.h4, color: COLORS.darkGray2 }}>Type</Text>
            <Text
              style={{ color: COLORS.black, ...FONTS.h4, fontWeight: "700" }}
            >
              Solo
            </Text>
          </View>
        </View>
        {/* 2nd Row */}
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginRight: 48,
              marginLeft: 13,
            }}
          >
            <Text style={{ ...FONTS.h4, color: COLORS.darkGray2 }}>Map</Text>
            <Text
              style={{ color: COLORS.black, ...FONTS.h4, fontWeight: "700" }}
            >
              Miramar
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 5,
            }}
          >
            <Text style={{ ...FONTS.h4, color: COLORS.darkGray2 }}>View</Text>
            <Text
              style={{ color: COLORS.black, ...FONTS.h4, fontWeight: "700" }}
            >
              FPP
            </Text>
          </View>
        </View>
      </View>
      {/* Calories */}
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          top: 2,
          right: 5,
        }}
      >
        <Image
          source={Icons.calories}
          style={{
            width: 25,
            height: 25,
          }}
        />
        {Days === 0 && Hours === 0 && Minutes === 0 ? (<Text
          style={{
            color: COLORS.darkGray2,
            ...FONTS.body4,
            fontWeight: "bold",
          }}
        >

          It's Live
        </Text>) : (<Text
          style={{
            color: COLORS.darkGray2,
            ...FONTS.body4,
            fontWeight: "bold",
          }}
        >

          {!Days || Days === 0 ? '' : `${Days}D,`} {!Hours || Hours === 0 ? '' : `${Hours}H:`}{Minutes}M
        </Text>)}
      </View>
      {/* Bottom Box */}
      <View
        style={{
          height: 30,
          width: 53,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
          backgroundColor: COLORS.lightOrange,
          borderTopLeftRadius: 25,
          borderBottomRightRadius: 25,
          bottom: 0,
          right: 0,
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h3,
            fontWeight: "bold",
          }}
        >
          &#x20B9; 10
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default GameItems;
