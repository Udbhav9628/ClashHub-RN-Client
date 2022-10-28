import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SIZES, COLORS, Dpheight, DPwidth } from "../../constants/Theame";
import GameItems from "../Home/GameItems";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Clear_ReFetch_Joined_Matches,
} from "../../store/Match/Matchaction";
import MyMatchesMenu from "../../components/MyMatchesMenu";
import { GamesTypes } from "../../constants/Data";
import { ReturnGameImage } from "../../utils/Utils";
import { Ip_Address } from '../../constants/Data';
import axios from 'axios';
import { Return_Token } from '../../utils/Utils';

const MyJoinedMatches = ({ navigation }: { navigation: any }) => {
  const [SelectedMenu, setSelectedMenu] = useState("Scheduled");
  const [Refetch, setRefetch] = useState(true);//check
  const [loading, setloading] = useState(true)
  const [Data_Length, setData_Length] = useState(0)
  const [PreMatchType, setPreMatchType] = useState('')

  const [Page, setPage] = useState(1);

  const [Matches_State, setMatches_State] = useState([] as Array<any>);

  const { ReFetch_Joined_Matches } = useSelector(
    (state: any) => state.Join_Match_Reducer
  );

  const dispatch = useDispatch();

  const Clear_Re_Fetch_Joined_Matches = bindActionCreators(
    Clear_ReFetch_Joined_Matches,
    dispatch
  );

  async function FetchData(MatchType: any, Page: Number, Reset: Boolean) {
    try {
      const Token: string = (await Return_Token(
        'Get_Joined_Matches_Fail',
        dispatch,
      )) as string;
      const response = await axios.get(
        `${Ip_Address}/GetJoinedMatches?MatchType=${MatchType}&Page=${Page}`,
        {
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            authToken: Token,
          },
        },
      );
      if (PreMatchType === MatchType && !Reset) {
        setMatches_State([...Matches_State, ...response.data])
      } else {
        setMatches_State(response.data)
      }
      setloading(false);
      setPreMatchType(MatchType);
      setData_Length(response.data.length);
    } catch (error: any) {
      Alert.alert("Error", error.message, [
        {
          text: "OK",
          onPress: () => {
            setSelectedMenu("Scheduled")
            setloading(false)
          },
        },
      ]);
    }
  }

  useEffect(() => {
    if (Refetch || ReFetch_Joined_Matches) {
      setRefetch(false)
      Clear_Re_Fetch_Joined_Matches();
      FetchData(SelectedMenu, 1, true);
    }
  }, [ReFetch_Joined_Matches]);

  function WhenEndReached() {
    if (Data_Length === 10) {
      FetchData(SelectedMenu, Page + 1, false);
      setPage((Previous) => Previous + 1);
    }
  }

  return (
    <View style={styles.Container}>
      <View>
        <MyMatchesMenu SelectedMenu={SelectedMenu} setSelectedMenu={setSelectedMenu} GamesTypes={GamesTypes} Fetch_Matchs={FetchData} setPage={setPage} SetLoading={setloading} Club_Id={null} />
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
      ) : Matches_State.length === 0 ? (
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
            No {SelectedMenu} Matches
          </Text>
        </View>
      ) : (
        <FlatList
          data={Matches_State}
          keyExtractor={(Item) => `${Item?._id}`}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshing={false}
          onRefresh={() => {
            setloading(true)
            FetchData(SelectedMenu, 1, true)
            setPage(1)
          }}
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
                height: "88%",
                width: DPwidth(29),
                resizeMode: "stretch",
              }}
              Item={item}
              GameImage={ReturnGameImage(item?.Game_Name)}
              onPress={() =>
                navigation.navigate("GameDetailsPage", {
                  Item: item, SelectedMenu: SelectedMenu, GameImage: ReturnGameImage(item?.Game_Name)
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
