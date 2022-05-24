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
import { SIZES, COLORS } from "../../constants/Theame";
import Heading from "../../components/Heading";
const logo = require("../../Assets/Images/logo_02.png");
import GameItems from "../Home/GameItems";
import HeadingComp from "../../components/HeadingComp";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Get_Guild_Matches_Details,
  Clear_Guild_Reducer_Error,
} from "../../store/Guild/GuildAction";
import { useFocusEffect } from "@react-navigation/native";

const GuildDetails = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const { Item } = route.params;

  const dispatch = useDispatch();
  const Get_Guild_Matches = bindActionCreators(
    Get_Guild_Matches_Details,
    dispatch
  );

  const Clear_Guild_ReducerError = bindActionCreators(
    Clear_Guild_Reducer_Error,
    dispatch
  );

  const { Guild_Matches, loading, Error } = useSelector(
    (state: any) => state.Get_Guild_Matchs_Reducer
  );

  useFocusEffect(
    React.useCallback(() => {
      Get_Guild_Matches(Item._id);
    }, [])
  );

  useEffect(() => {
    if (Error) {
      Alert.alert("Error", Error, [
        {
          text: "OK",
          onPress: () => {
            Clear_Guild_ReducerError();
            // Get_Guild_Matches(Item._id);
          },
        },
      ]);
    }
  }, [Error]);

  return (
    <View style={styles.Container}>
      <Heading navigation={navigation} Title={" Guild Details"} />
      <View style={styles.Profile}>
        <Image
          source={logo}
          style={{
            width: 150,
            height: 150,
            borderRadius: 50,
          }}
        />
        <Text style={styles.ProfileText}>{Item.GuildName}</Text>
        <Text style={styles.NotificationText2}>
          {Item.Members.length} Followers
        </Text>
        <TouchableOpacity
          style={{
            height: 50,
            width: 150,
            marginTop: SIZES.base,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: SIZES.padding,
            backgroundColor: COLORS.primary,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontWeight: "bold",
              fontSize: SIZES.body3,
              lineHeight: 22,
            }}
          >
            Join Guild
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
          height: 214,
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
                fontSize: 18,
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
                    height: 200,
                    width: 325,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingRight: SIZES.padding,
                    backgroundColor: COLORS.lightGray2,
                  }}
                  Imagestyle={{
                    marginTop: 20,
                    height: "90%",
                    width: 110,
                    marginRight: 2,
                    resizeMode: "stretch",
                  }}
                  Item={item}
                  onPress={() =>
                    navigation.navigate("GameDetailsPage", {
                      Item: item,
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
    lineHeight: 50,
    fontSize: 24,
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
  NotificationWrapper: {
    height: 140,
    width: 150,
  },
  Image: {
    height: 60,
    width: 60,
    borderRadius: SIZES.radius,
  },
  NotificationText: {
    lineHeight: 20,
    fontSize: 17,
    fontWeight: "bold",
  },
  NotificationText2: {
    lineHeight: 30,
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.gray,
  },
});
