import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { SIZES, COLORS, Dpheight, DPwidth } from "../../constants/Theame";
import Heading from "../../components/Heading";
const logo = require("../../Assets/Images/logo_02.png");
import GameItems from "../Home/GameItems";
import HeadingComp from "../../components/HeadingComp";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Get_Guild_Matches_Details,
  Clear_Guild_Reducer_Error,
  Clear_Guild_Reducer_Sucess,
  Join_Guild
} from "../../store/Guild/GuildAction";
import { useFocusEffect } from "@react-navigation/native";
import { ReturnGameImage } from "../../utils/Utils";

const GuildDetails = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const { Item } = route.params;

  const { User } = useSelector((state: any) => state.FetchUser_reducer);

  const is_Guild_Joined = Item.Followers.find((Item: any) => {
    return Item.FollowersId === User.id;
  });

  const dispatch = useDispatch();
  const Get_Guild_Matches = bindActionCreators(
    Get_Guild_Matches_Details,
    dispatch
  );

  const Clear_Guild_ReducerError = bindActionCreators(
    Clear_Guild_Reducer_Error,
    dispatch
  );

  const Clear_Guild_Reducer_Sucess_Func = bindActionCreators(
    Clear_Guild_Reducer_Sucess,
    dispatch
  );

  const Join_Guild_Func = bindActionCreators(
    Join_Guild,
    dispatch
  );

  const { Guild_Matches, loading, Error } = useSelector(
    (state: any) => state.Get_Guild_Matchs_Reducer
  );

  const Join_Guild_Reducer = useSelector(
    (state: any) => state.Join_Guild_Reducer
  );

  useFocusEffect(
    React.useCallback(() => {
      Get_Guild_Matches(Item._id, '');
    }, [])
  );

  useEffect(() => {
    if (Error) {
      Clear_Guild_ReducerError();
      Alert.alert("Error", Error, [
        {
          text: "OK",
        },
      ]);
    }
  }, [Error]);

  useEffect(() => {
    if (Join_Guild_Reducer.Sucess) {
      Clear_Guild_Reducer_Sucess_Func()
      Alert.alert("Message", Join_Guild_Reducer.Responce, [
        {
          text: "OK",
        },
      ]);
    }
  }, [Join_Guild_Reducer.Sucess]);

  useEffect(() => {
    if (Join_Guild_Reducer.Error) {
      Clear_Guild_ReducerError();
      Alert.alert("Error", Join_Guild_Reducer.Error, [
        {
          text: "OK",
        },
      ]);
    }
  }, [Join_Guild_Reducer.Error]);

  return (
    <View style={styles.Container}>
      <Heading navigation={navigation} Title={" Guild Details"} />
      <View style={styles.Profile}>
        <Image
          source={{ uri: `https://api.multiavatar.com/${Item.GuildName}.png` }}
          style={{
            width: DPwidth(31),
            height: Dpheight(15),
            borderRadius: Dpheight(455),
          }}
        />
        <Text style={styles.ProfileText}>{Item.GuildName}</Text>
        <Text style={styles.NotificationText2}>
          {Item.GuildID}
        </Text>
        <TouchableOpacity
          style={{
            height: Dpheight(6.5),
            width: DPwidth(35),
            marginTop: SIZES.padding,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: SIZES.padding,
            backgroundColor: COLORS.primary,
          }}
          onPress={() => {
            if (is_Guild_Joined) {
              Alert.alert("Message", "You Have Allready Joined This Club", [
                {
                  text: "OK",
                },
              ]);
            } else {
              Join_Guild_Func(Item._id)
            }
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontWeight: "bold",
              fontSize: SIZES.body3,
            }}
          >
            {is_Guild_Joined ? 'Joined' : 'Join Club'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 8 }}>
        <HeadingComp
          navigation={null}
          Title={"Upcomming Tournaments"}
          ShowViewAll={false}
          Navigate_to={""}
          Query={null}
        />
      </View>
      <View
        style={{
          height: Dpheight(26.8),
        }}
      >
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : Guild_Matches && Guild_Matches.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: SIZES.h2,
                fontWeight: "700",
              }}
            >
              No Guild's Matches
            </Text>
          </View>
        ) : (
          <View>
            <FlatList
              data={Guild_Matches}
              horizontal
              keyExtractor={(Item) => `${Item._id}`}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <GameItems
                  ContainerStyle={{
                    ...styles.Elevation,
                    marginRight:
                      index === Guild_Matches.length - 1 ? SIZES.padding : 0,
                    height: Dpheight(26),
                    width: DPwidth(83),
                    alignItems: "center",
                    justifyContent: "center",
                    paddingRight: SIZES.padding,
                    backgroundColor: COLORS.lightGray2,
                  }}
                  Imagestyle={{
                    marginTop: Dpheight(3),
                    height: "88.3%",
                    width: DPwidth(25),
                    resizeMode: "stretch",
                  }}
                  Item={item}
                  GameImage={ReturnGameImage(item.Game_Name)}
                  onPress={() =>
                    navigation.navigate("GameDetailsPage", {
                      Item: item,
                      GameImage: ReturnGameImage(item.Game_Name)
                    })
                  }
                />
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default GuildDetails;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  Profile: {
    alignItems: "center",
    marginTop: SIZES.padding,
  },
  ProfileText: {
    color: "#000",
    lineHeight: Dpheight(5),
    fontSize: SIZES.Size24,
    fontWeight: "bold",
  },
  Elevation: {
    backgroundColor: "white",
    borderRadius: SIZES.radius,
    elevation: 1,
    marginVertical: 8,
    marginLeft: SIZES.padding,
    //For Ios Only -- SHOWdow code
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  NotificationText2: {
    lineHeight: Dpheight(3),
    fontSize: SIZES.body3,
    fontWeight: "600",
    color: COLORS.gray,
  },
});
