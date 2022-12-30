import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { COLORS, SIZES, FONTS, DPwidth, Dpheight } from "../../constants/Theame";
import { useFocusEffect } from "@react-navigation/native";
import Icons from "../../constants/Icons";
import Progressbar from "../../components/Progressbar";

const GameItems = ({
  ContainerStyle,
  Imagestyle,
  Item,
  GameImage,
  onPress,
}: {
  ContainerStyle: any;
  Imagestyle: any;
  Item: any;
  GameImage: any;
  onPress: any;
}) => {

  const [Days, setDays] = useState(0);
  const [Hours, setHours] = useState(0);
  const [Minutes, setMinutes] = useState(0);

  const Second = 1000;
  const Minute = Second * 60;
  const Hour = Minute * 60;
  const Day = Hour * 24;

  const [Match_Cancelled, setMatch_Cancelled] = useState(false)

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

  function Return_Match_Status() {
    if (Days === 0 && Hours === 0 && Minutes === 0 && Item.Match_Status === 'Started' && !Match_Cancelled) {
      return (<Text
        style={{
          color: COLORS.primary,
          fontFamily: 'Poppins-Regular',
          fontSize: Dpheight(0.7) * DPwidth(0.6),
          fontWeight: "bold",
        }}
      >
        Live
      </Text>)
    } else if (Days === 0 && Hours === 0 && Minutes === 0 && Item.Match_Status === 'Completed') {
      return (<Text
        style={{
          color: COLORS.Green2,
          fontFamily: 'Poppins-Regular',
          fontSize: Dpheight(0.7) * DPwidth(0.6),
          fontWeight: "bold",
        }}
      >
        Finished
      </Text>)
    } else if (Match_Cancelled) {
      return (<Text
        style={{
          color: '#DC3535',
          fontFamily: 'Poppins-Regular',
          fontSize: Dpheight(0.7) * DPwidth(0.6),
          fontWeight: "bold",
        }}
      >
        Suspended
      </Text>)
    }
  }

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
      <View style={{
        marginRight: 15,
        width: '28%'
      }}>
        <Image source={GameImage} style={Imagestyle} />
      </View>
      {/* Info */}
      <View style={{
        width: '70.1%'
      }}>
        {/* Name */}
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: Dpheight(0.7) * DPwidth(0.8), fontWeight: "700", color: COLORS.black
          }}
        >
          {Item._id.slice(-2)} {Item?.Game_Name} {Item?.GameType}
        </Text>
        {/* Description */}
        <Progressbar step={Item?.Joined_User.length} totalsteps={Item?.Total_Players} Height={7} />
        {/* More Info Section */}
        <View
          style={{
            justifyContent: "center",
          }}
        >
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text style={{
              fontFamily: 'Poppins-Regular',
              fontSize: Dpheight(0.6) * DPwidth(0.7), color: COLORS.darkGray2
            }}>Entry </Text>
            <Text
              style={{
                color: COLORS.black, fontFamily: 'Poppins-Regular',
                fontSize: Dpheight(0.6) * DPwidth(0.7), fontWeight: "700"
              }}
            >
              &#x20B9; {Item?.EntryFee}
            </Text>
          </View>
        </View>
        {/* 2nd Row */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text style={{
              fontFamily: 'Poppins-Regular',
              fontSize: Dpheight(0.6) * DPwidth(0.7), color: COLORS.darkGray2
            }}>
              Map
            </Text>
            <Text
              style={{
                color: COLORS.black, fontFamily: 'Poppins-Regular',
                fontSize: Dpheight(0.6) * DPwidth(0.7), fontWeight: "700"
              }}
            >
              {Item?.Map}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{
              fontFamily: 'Poppins-Regular',
              fontSize: Dpheight(0.6) * DPwidth(0.7), color: COLORS.darkGray2
            }}>Type</Text>
            <Text
              style={{
                color: COLORS.black, fontFamily: 'Poppins-Regular',
                fontSize: Dpheight(0.6) * DPwidth(0.7), fontWeight: "700"
              }}
            >
              {Item?.GameType}
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
            width: DPwidth(6.2),
            height: Dpheight(3.5),
          }}
        />
        {Days === 0 && Hours === 0 && Minutes === 0 ? (
          Return_Match_Status()) : (<Text
            style={{
              color: COLORS.red,
              fontFamily: 'Poppins-Regular',
              fontSize: Dpheight(0.6) * DPwidth(0.7),
              fontWeight: "bold",
            }}
          >
            {Item.Match_Status !== 'Scheduled' && "Room Available "}
            {!Days || Days === 0 ? '' : `${Days}D,`} {!Hours || Hours === 0 ? '' : `${Hours}H:`}{Minutes}M
          </Text>)}
      </View>
      {/* Bottom Box */}
      <View
        style={{
          height: Dpheight(3.5),
          width: DPwidth(14.5),
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
          &#x20B9; {Item?.Perkill_Prize}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default GameItems;
