import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SIZES, COLORS } from "../../constants/Theame";
import GameItems from "../Home/GameItems";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Get_Joined_Matchs,
  Clear_Match_Reducer_Error,
  Clear_ReFetch_Joined_Matches,
} from "../../store/Match/Matchaction";
import MyMatchesMenu from "../../components/MyMatchesMenu";
import { GamesTypes } from "../../constants/Data";

const MyJoinedMatches = ({ navigation }: { navigation: any }) => {
  const [SelectedMenu, setSelectedMenu] = useState("Scheduled");
  const [Refetch, setRefetch] = useState(true);
  const { Joined_Matches, loading, Error } = useSelector(
    (state: any) => state.Get_Joined_Match_Reducer
  );

  const { ReFetch_Joined_Matches } = useSelector(
    (state: any) => state.Join_Match_Reducer
  );

  const dispatch = useDispatch();
  const Fetch_Joined_Matchs = bindActionCreators(Get_Joined_Matchs, dispatch);

  const Clear_Match_ReducerError = bindActionCreators(
    Clear_Match_Reducer_Error,
    dispatch
  );
  const Clear_Re_Fetch_Joined_Matches = bindActionCreators(
    Clear_ReFetch_Joined_Matches,
    dispatch
  );

  useEffect(() => {
    if (Refetch || ReFetch_Joined_Matches) {
      setRefetch(false)
      Clear_Re_Fetch_Joined_Matches();
      Fetch_Joined_Matchs(SelectedMenu);
    }
  }, [ReFetch_Joined_Matches]);

  useEffect(() => {
    if (Error) {
      Alert.alert("Error", Error + "  check ip and running , Reload", [
        {
          text: "OK",
          onPress: () => {
            Clear_Match_ReducerError();
            // Fetch_Joined_Matchs(SelectedMenu);
            setSelectedMenu("Scheduled")
          },
        },
      ]);
    }
  }, [Error]);

  return (
    <View style={styles.Container}>
      <MyMatchesMenu SelectedMenu={SelectedMenu} setSelectedMenu={setSelectedMenu} GamesTypes={GamesTypes} Fetch_Joined_Matchs={Fetch_Joined_Matchs} />
      {loading ? (
        <>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        </>
      ) : Joined_Matches && Joined_Matches.length === 0 ? (
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
            You haven't joined any Match
          </Text>
        </View>
      ) : (
        <FlatList
          data={Joined_Matches}
          keyExtractor={(Item) => `${Item._id}`}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <GameItems
              ContainerStyle={{
                ...styles.Elevation,
                height: 200,
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal: SIZES.padding,
                paddingRight: SIZES.padding,
                marginBottom: SIZES.radius,
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
      )}
    </View>
  );
};

export default MyJoinedMatches;

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
