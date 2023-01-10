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
import React, { useEffect, useState } from "react";
import { SIZES, COLORS, Dpheight, DPwidth, FONTS } from "../../constants/Theame";
import Heading from "../../components/Heading";
import GameItems from "../Home/GameItems";
import HeadingComp from "../../components/HeadingComp";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Clear_Guild_Reducer_Error,
  Clear_Guild_Reducer_Sucess,
  Join_Guild
} from "../../store/Guild/GuildAction";
import { useFocusEffect } from "@react-navigation/native";
import { ReturnGameImage } from "../../utils/Utils";
import { ScrollView } from "react-native-gesture-handler";
import Icons from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/MaterialIcons";
import Iconss from "react-native-vector-icons/MaterialCommunityIcons";
import ModalClub_Menu from "../Home/ModalClub_Menu";
import ClubFollowres from "../Menu/YourGuild/ClubFollowres";
import { Ip_Address } from '../../constants/Data';
import axios from 'axios';
import { Return_Token } from '../../utils/Utils';

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
    return Item.FollowersId === User?.id;
  });

  const [Show_Admin_Menu, setShow_Admin_Menu] = useState(false)
  const [ShowFollowers, setShowFollowers] = useState(false)
  const [ClubJoined, setClubJoined] = useState(false)

  const dispatch = useDispatch();
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

  const Join_Guild_Reducer = useSelector(
    (state: any) => state.Join_Guild_Reducer
  );

  useEffect(() => {
    if (Join_Guild_Reducer.Sucess) {
      setClubJoined(true)
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


  const [Loading, setLoading] = useState(true);
  const [Page, setPage] = useState(1);
  const [Data_Length, setData_Length] = useState(0);
  const [Data, setData] = useState([] as Array<any>);

  async function Fetch_Data(Page: Number, Issame: Boolean) {
    try {
      const Token: string = (await Return_Token(
        null,
        null,
      )) as string;
      const response = await axios.get(
        `${Ip_Address}/getGuildtournaments/${Item._id}?MatchType=Scheduled&Page=${Page}`,
        {
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            authToken: Token,
          },
        },
      );
      if (Data.length > 0 && Issame) {
        setData([...Data, ...response.data.Data])
      } else {
        setData(response.data.Data)
      }
      setLoading(false)
      setData_Length(response.data.Data.length);
    } catch (error: any) {
      Alert.alert("Error", error.message, [
        {
          text: "OK",
        },
      ]);
    }
  }

  function WhenEndReached() {
    if (Data_Length === 10) {
      Fetch_Data(Page + 1, true);
      setPage((Previous) => Previous + 1);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      Fetch_Data(1, false);
      return () => {
        setLoading(true)
        setData_Length(0);
        setPage(1);
        setData([] as Array<any>);
      };
    }, [])
  );

  return (
    <ScrollView style={styles.Container}>
      <Heading navigation={navigation} Title={"Guild Details"} />
      <View style={styles.Profile}>
        <Image
          source={{ uri: `https://api.multiavatar.com/${Item.Profile_Pic}.png` }}
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
          {Join_Guild_Reducer.loading ? (<ActivityIndicator size="large" color={COLORS.primary} />) : (<Text
            style={{
              color: COLORS.white,
              fontWeight: "bold",
              fontSize: SIZES.body3,
            }}
          >
            {is_Guild_Joined || ClubJoined ? 'Joined' : 'Join Club'}
          </Text>)}
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 8 }}>
        <HeadingComp
          navigation={null}
          Title={"Upcomming Matches"}
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
        {Loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : Data && Data.length === 0 ? (
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
              No Upcomming Matches
            </Text>
          </View>
        ) : (
          <View>
            <FlatList
              data={Data}
              horizontal
              keyExtractor={(Item) => `${Item._id}`}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <GameItems
                  ContainerStyle={{
                    ...styles.Elevation,
                    marginRight:
                      index === Data.length - 1 ? SIZES.padding : 0,
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
              onEndReached={() => {
                WhenEndReached();
              }}
              onEndReachedThreshold={0.2}
              ListFooterComponent={(<View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}>
                {Data_Length === 10 && <View
                >
                  <ActivityIndicator size="large" color={COLORS.primary} />
                </View>}
              </View>)}
            />
          </View>
        )}
      </View>
      {/* {About Club} */}
      <View style={{ marginTop: 26, marginBottom: 120 }}>
        <Text style={{
          ...FONTS.body3,
          fontWeight: "700",
          color: COLORS.black,
          marginHorizontal: "4%",
        }}>About Club</Text>
        <View style={{
          height: Dpheight(21),
          borderRadius: SIZES.radius,
          alignItems: "flex-start",
          marginHorizontal: SIZES.padding,
        }}>
          <View style={{ paddingVertical: 20, flexDirection: 'row', alignItems: 'center' }}>
            <View><Icon name="description" size={28} color="black" /></View><Text
              style={{
                marginHorizontal: 12,
                color: COLORS.black,
                fontSize: SIZES.h3,
                textAlign: 'justify',
                marginRight: SIZES.padding,
              }}
            >
              {Item.GuildDescription}.
            </Text></View>
          <TouchableOpacity onPress={() => setShowFollowers(true)} style={{ paddingVertical: 20, flexDirection: 'row', alignItems: 'center' }}>
            <View><Icons name="users" size={22} color="black" /></View>
            <View>
              <ClubFollowres modalVisible={ShowFollowers}
                setModalVisible={setShowFollowers}
                navigation={navigation}
                Followers={Item.Followers} />
            </View>
            <View style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <Text
                style={{
                  marginHorizontal: 12,
                  color: COLORS.black,
                  fontSize: SIZES.h3,
                }}
              >
                {Item.Followers.length} Followers
              </Text>
              <View style={{
                position: "absolute",
                right: 15,
              }}><Iconss name="dots-horizontal" size={20} color="black" /></View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShow_Admin_Menu(true)} style={{ paddingVertical: 20, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ marginLeft: 4 }}><Icons name="user-tie" size={24} color="black" /></View>
            <View style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <ModalClub_Menu modalVisible={Show_Admin_Menu}
                setModalVisible={setShow_Admin_Menu}
                navigation={navigation}
                Club_Details={null}
                Admin_Id={Item.OwnerId}
              />
              <Text
                style={{
                  marginHorizontal: 12,
                  color: COLORS.black,
                  fontSize: SIZES.h3,
                }}
              >
                Admin
              </Text>
              <View style={{
                position: "absolute",
                right: 15,
              }}><Iconss name="dots-horizontal" size={20} color="black" /></View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
