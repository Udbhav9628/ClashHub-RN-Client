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
import { SIZES, COLORS, FONTS, Dpheight, DPwidth } from "../../constants/Theame";
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
import { ReturnGameImage } from "../../utils/Utils";

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
        Title={"Starting Soon"}
        ShowViewAll={true}
        Navigate_to={"AllMatches"}
        Query={{
          Query_Props: null,
        }}
      />
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
                    height: Dpheight(26),
                    width: DPwidth(83),
                    alignItems: "center",
                    justifyContent: "center",
                    paddingRight: SIZES.padding,
                    backgroundColor: COLORS.lightGray2,
                  }}
                  Imagestyle={{
                    marginTop: Dpheight(3),
                    height: "100%",
                    width: DPwidth(29),
                    marginRight: DPwidth(1),
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
      <View
        style={{
          height: Dpheight(26.8),
          marginBottom: 5,
        }}
      >
        <HeadingComp
          navigation={navigation}
          Title={"Popular Clubs"}
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
                ...FONTS.h3,
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
                      height: Dpheight(20),
                      width: DPwidth(38.3),
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: COLORS.lightGray2,
                      borderRadius: SIZES.radius,
                    }}
                  >
                    <Image
                      source={{ uri: `https://api.multiavatar.com/${item.GuildName}.png` }}
                      style={{
                        height: Dpheight(7.5),
                        width: DPwidth(16),
                        borderRadius: Dpheight(45),
                      }}
                    />
                    <Text
                      style={{
                        lineHeight: SIZES.h1,
                        fontSize: SIZES.Size4,
                        fontWeight: "bold",
                        color: COLORS.black,
                      }}
                    >
                      {item.GuildName}
                    </Text>
                    <Text
                      style={{
                        lineHeight: SIZES.h1,
                        fontSize: SIZES.body4,
                        fontWeight: "600",
                        color: COLORS.gray,
                      }}
                    >
                      {item.Followers.length} Followers
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
            }
          />
        )}
      </View >
    </ScrollView >
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
});
