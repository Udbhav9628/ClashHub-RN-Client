import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SIZES, COLORS, FONTS } from "../../constants/Theame";
import { GameTypesMenu } from "../../constants/Data";
import GameItems from "../Home/GameItems";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Fetch_All_Matchs,
  Clear_Match_Reducer_Error,
} from "../../store/Match/Matchaction";
import Heading from "../../components/Heading";

const AllMatches = ({ route, navigation }: { route: any; navigation: any }) => {
  //const [All_Matches_State, setAll_Matches_State] = useState([] as Array<any>);

  const [TempLoading, setTempLoading] = useState(true);

  const { All_Matchs, loading, Error } = useSelector(
    (state: any) => state.Get_All_Matches
  );

  const [SelectedMenu, setSelectedMenu] = useState(
    route.params.Query_Props ? route.params.Query_Props : ""
  );

  const dispatch = useDispatch();
  const Fetch_All_Match = bindActionCreators(Fetch_All_Matchs, dispatch);

  const Clear_Match_ReducerError = bindActionCreators(
    Clear_Match_Reducer_Error,
    dispatch
  );

  useEffect(() => {
    Fetch_All_Match(SelectedMenu);
    setTempLoading(false);
  }, []);

  useEffect(() => {
    if (Error) {
      Alert.alert("Error", Error + "  check ip and running , Reload", [
        {
          text: "OK",
          onPress: () => {
            Clear_Match_ReducerError();
          },
        },
      ]);
    }
  }, [Error]);

  return (
    <View style={styles.Container}>
      <Heading navigation={navigation} Title={" All Matches"} />
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={GameTypesMenu}
          keyExtractor={(Item) => `${Item.id}`}
          contentContainerStyle={{
            marginTop: 5,
            marginBottom: 15,
          }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{
                marginLeft: SIZES.padding,
                marginRight:
                  index === GameTypesMenu.length - 1 ? SIZES.padding : 0,
              }}
              onPress={() => {
                Fetch_All_Match(item.Query_String);
                setSelectedMenu(item.Query_String);
              }}
            >
              <Text
                style={{
                  color:
                    SelectedMenu === item.Query_String
                      ? COLORS.primary
                      : COLORS.black,
                  ...FONTS.body3,
                  fontWeight: "700",
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {TempLoading || loading ? (
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
      ) : All_Matchs && All_Matchs.length === 0 ? (
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
            No Matches Available
          </Text>
        </View>
      ) : (
        <FlatList
          data={All_Matchs}
          keyExtractor={(Item) => `${Item._id}`}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onRefresh={() => Fetch_All_Match(SelectedMenu)}
          refreshing={loading}
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

export default AllMatches;

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
