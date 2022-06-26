import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SIZES, COLORS, Dpheight } from "../../../constants/Theame";
import Heading from "../../../components/Heading";
import GameItems from "../../Home/GameItems";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Get_Guild_Matches_Details,
  Clear_Guild_Reducer_Error,
} from "../../../store/Guild/GuildAction";
import MyMatchesMenu from "../../../components/MyMatchesMenu";
import { GamesTypes } from "../../../constants/Data";
import { ReturnGameImage } from "../../../utils/Utils";

const YourGuildMatches = ({ navigation }: { navigation: any }) => {
  const [SelectedMenu, setSelectedMenu] = useState('');
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

  const { Guild_Details } = useSelector(
    (state: any) => state.Get_user_Guild_details_reducer
  );

  useEffect(() => {
    setSelectedMenu('Scheduled')
    Get_Guild_Matches(Guild_Details._id, 'Scheduled');
  }, [])

  useEffect(() => {
    if (Error) {
      Alert.alert("Error", Error, [
        {
          text: "OK",
          onPress: () => {
            Clear_Guild_ReducerError();
            setSelectedMenu('Scheduled')
            navigation.goBack();
          },
        },
      ]);
    }
  }, [Error]);

  return (
    <View style={styles.Container}>
      <Heading navigation={navigation} Title={"Guild Matches"} />
      <View>
        <MyMatchesMenu SelectedMenu={SelectedMenu} setSelectedMenu={setSelectedMenu} GamesTypes={GamesTypes} Fetch_Matchs={Get_Guild_Matches} Guild_id={Guild_Details?._id} />
      </View>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
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
              fontSize: SIZES.body3,
              fontWeight: "700",
            }}
          >
            No {SelectedMenu} Guild Matches
          </Text>
        </View>
      ) : (
        <FlatList
          data={Guild_Matches}
          keyExtractor={(Item) => `${Item._id}`}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <GameItems
              ContainerStyle={{
                ...styles.Elevation,
                height: Dpheight(25),
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal: SIZES.padding,
                paddingRight: SIZES.padding,
                marginBottom: SIZES.radius,
                backgroundColor: COLORS.lightGray2,
              }}
              Imagestyle={{
                marginTop: 20,
                height: "88%",
                width: 110,
                marginRight: 2,
                resizeMode: "stretch",
              }}
              Item={item}
              GameImage={ReturnGameImage(item.Game_Name)}
              onPress={() =>
                navigation.navigate("GuildMatchesDetails", {
                  Item: item, SelectedMenu: SelectedMenu, GameImage: ReturnGameImage(item.Game_Name)
                })
              }
            />
          )}
        />
      )}
    </View>

  );
};

export default YourGuildMatches;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  Elevation: {
    backgroundColor: "white",
    borderRadius: SIZES.radius,
    elevation: 3,
    marginVertical: 8,
    marginLeft: SIZES.padding,
    //For Ios Only -- SHOWdow code
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
