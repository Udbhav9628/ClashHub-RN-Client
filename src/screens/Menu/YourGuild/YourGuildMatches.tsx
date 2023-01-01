import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SIZES, COLORS, Dpheight, DPwidth } from "../../../constants/Theame";
import Heading from "../../../components/Heading";
import GameItems from "../../Home/GameItems";
import { useSelector } from "react-redux";
import MyMatchesMenu from "../../../components/MyMatchesMenu";
import { GamesTypes } from "../../../constants/Data";
import { ReturnGameImage } from "../../../utils/Utils";
import { Ip_Address } from '../../../constants/Data';
import axios from 'axios';
import { Return_Token } from '../../../utils/Utils';

const YourGuildMatches = ({ navigation }: { navigation: any }) => {
  const [SelectedMenu, setSelectedMenu] = useState('');
  const [PreMatchType, setPreMatchType] = useState('')
  const [Matches, setMatches] = useState([] as Array<any>);
  const [loading, setloading] = useState(true)
  const [Page, setPage] = useState(1);
  const [Data_Length, setData_Length] = useState(0);

  const { Guild_Details } = useSelector(
    (state: any) => state.Get_user_Guild_details_reducer
  );

  async function Get_Guild_Matches(id: any, MatchType: string, Page: Number, Reset: Boolean) {
    try {
      const Token: string = (await Return_Token(
        'Get_Guild_Matches_Details_Fail',
        null,
      )) as string;
      const response = await axios.get(
        `${Ip_Address}/getGuildtournaments/${id}?MatchType=${MatchType}&Page=${Page}`,
        {
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            authToken: Token,
          },
        },
      );
      if (PreMatchType === MatchType && !Reset) {
        setMatches([...Matches, ...response.data.Data])
      } else {
        setMatches(response.data.Data)
      }
      setloading(false);
      setPreMatchType(MatchType);
      setData_Length(response.data.Data.length);
    } catch (error: any) {
      Alert.alert("Error", error.message, [
        {
          text: "OK",
          onPress: () => {
            setSelectedMenu('Scheduled')
            navigation.goBack();
          },
        },
      ]);
    }
  }

  useEffect(() => {
    setSelectedMenu('Scheduled')
    Get_Guild_Matches(Guild_Details._id, 'Scheduled', 1, true);
  }, [])

  function WhenEndReached() {
    if (Data_Length === 10) {
      Get_Guild_Matches(Guild_Details._id, SelectedMenu, Page + 1, false);
      setPage((Previous) => Previous + 1);
    }
  }

  return (
    <View style={styles.Container}>
      <Heading navigation={navigation} Title={"Club Matches"} />
      <View>
        <MyMatchesMenu SelectedMenu={SelectedMenu} setSelectedMenu={setSelectedMenu} GamesTypes={GamesTypes} Fetch_Matchs={Get_Guild_Matches} setPage={setPage} SetLoading={setloading} loading={loading} Club_Id={Guild_Details._id} />
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
      ) : Matches?.length === 0 ? (
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
          data={Matches}
          keyExtractor={(Item) => `${Item._id}`}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshing={false}
          // onRefresh={() => {
          //   setloading(true)
          //   Get_Guild_Matches(Guild_Details._id, 'Scheduled', 1, true);
          //   setPage(1)
          // }}
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
                marginTop: Dpheight(3),
                height: "88.3%",
                width: DPwidth(29),
                resizeMode: "stretch",
              }}
              Item={item}
              GameImage={ReturnGameImage(item.Game_Name)}
              onPress={() =>
                navigation.navigate("GuildMatchesDetails", {
                  Item: item, GameImage: ReturnGameImage(item.Game_Name)
                })
              }
            />
          )}
          onEndReached={() => {
            WhenEndReached();
          }}
          onEndReachedThreshold={0}
          ListFooterComponent={(<View>
            {Data_Length === 10 && <View
              style={{
                marginVertical: 16,
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color={COLORS.primary} />
            </View>}
          </View>)}
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
