import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Crousal from "../../components/Crousal";
import HeadingComp from "../../components/HeadingComp";
import GameTypesComp from "../../components/GameTypesComp";
import { SIZES, COLORS, FONTS } from "../../constants/Theame";
import GameItems from "./GameItems";
import { bindActionCreators } from "redux";
import {
  Fetch_Home_Page_Matchs,
  Clear_Match_Reducer_Error,
} from "../../store/Match/Matchaction";
import {
  Fetch_All_Guild,
  Clear_Guild_Reducer_Error,
} from "../../store/Guild/GuildAction";
import StatusBarComp from "../../components/StatusBar";

const Home = ({ navigation }: { navigation: any }) => {
  const { Home_Matchs, loading, Error } = useSelector(
    (state: any) => state.Get_Home_Page_Matches
  );

  const { All_Guilds, Guild_loading, Guild_Error } = useSelector(
    (state: any) => state.Get_All_Guild
  );

  const dispatch = useDispatch();
  const Fetch_Home_Page_Match = bindActionCreators(
    Fetch_Home_Page_Matchs,
    dispatch
  );

  const FetchAll_Guild = bindActionCreators(Fetch_All_Guild, dispatch);

  const Clear_Match_ReducerError = bindActionCreators(
    Clear_Match_Reducer_Error,
    dispatch
  );

  const Clear_Guild_ReducerError = bindActionCreators(
    Clear_Guild_Reducer_Error,
    dispatch
  );

  useEffect(() => {
    Fetch_Home_Page_Match();
    FetchAll_Guild();
  }, []);

  useEffect(() => {
    if (Error) {
      Alert.alert(
        "Home Match Error",
        Error + "  check ip and running , Reload",
        [
          {
            text: "OK",
            onPress: () => {
              Clear_Match_ReducerError();
              // Fetch_Home_Page_Match();
            },
          },
        ]
      );
    }
  }, [Error]);

  useEffect(() => {
    if (Guild_Error) {
      Alert.alert(
        "Guild Error",
        Guild_Error + "  check ip and running , Reload",
        [
          {
            text: "OK",
            onPress: () => {
              Clear_Guild_ReducerError();
            },
          },
        ]
      );
    }
  }, [Guild_Error]);

  return (
    <ScrollView style={styles.Container}>
      <StatusBarComp />
      <View style={styles.Crousal}>{<Crousal />}</View>
      <View style={styles.Heading}>
        <HeadingComp
          navigation={null}
          Title={"Browse Games"}
          ShowViewAll={false}
          Navigate_to={""}
          Query={null}
        />
      </View>
      <GameTypesComp navigation={navigation} />
      <HeadingComp
        navigation={navigation}
        Title={"Matches"}
        ShowViewAll={true}
        Navigate_to={"AllMatches"}
        Query={{
          Query_Props: null,
        }}
      />
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
        ) : Home_Matchs && Home_Matchs.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                ...FONTS.h4,
                fontWeight: "700",
              }}
            >
              No Matches Available
            </Text>
          </View>
        ) : (
          <FlatList
            data={Home_Matchs}
            horizontal
            keyExtractor={(Item) => `${Item._id}`}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <GameItems
                ContainerStyle={{
                  ...styles.Elevation,
                  marginRight:
                    index === Home_Matchs.length - 1 ? SIZES.padding : 0,
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
        )}
      </View>
      <View
        style={{
          height: 214,
          marginBottom: 5,
        }}
      >
        <HeadingComp
          navigation={navigation}
          Title={"Guilds"}
          ShowViewAll={true}
          Navigate_to={"Guilds"}
          Query={null}
        />
        {Guild_loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : All_Guilds && All_Guilds.length === 0 ? (
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
              No Guilds Available
            </Text>
          </View>
        ) : (
          <FlatList
            data={All_Guilds}
            horizontal
            keyExtractor={(Item) => `${Item._id}`}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }: { item: any; index: any }) => (
              <View
                style={{
                  ...styles.Elevation,
                  marginRight:
                    index === All_Guilds.length - 1 ? SIZES.padding : 0,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("GuildDetail", {
                      Item: item,
                    });
                  }}
                >
                  <View
                    style={{
                      height: 160,
                      width: 150,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: COLORS.lightGray2,
                      borderRadius: SIZES.radius,
                    }}
                  >
                    <Image
                      source={{ uri: `https://api.multiavatar.com/${item.GuildName}.png` }}
                      style={{
                        height: 60,
                        width: 60,
                        borderRadius: SIZES.radius,
                      }}
                    />
                    <Text
                      style={{
                        lineHeight: 30,
                        fontSize: 17,
                        fontWeight: "bold",
                        color: COLORS.black,
                      }}
                    >
                      {item.GuildName}
                    </Text>
                    <Text
                      style={{
                        lineHeight: 30,
                        fontSize: 17,
                        fontWeight: "600",
                        color: COLORS.gray,
                      }}
                    >
                      {item.Followers.length} Followers
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: COLORS.white,
  },
  Crousal: {
    marginTop: 0,
  },
  Heading: {
    marginTop: 5,
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
  NotificationWrapper: {
    height: 140,
    width: 150,
  },
  Image: {
    height: 140,
    width: 150,
    borderRadius: SIZES.radius,
  },
  NotificationText: {
    lineHeight: 20,
    fontSize: 17,
    fontWeight: "bold",
  },
});
