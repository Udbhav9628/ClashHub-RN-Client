import {
  StyleSheet as RN_Styles,
  Text,
  View,
  FlatList,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SIZES, COLORS, FONTS, Dpheight, DPwidth } from "../../constants/Theame";
import { GameTypesMenu } from "../../constants/Data";
import GameItems from "../Home/GameItems";
import Heading from "../../components/Heading";
import { ReturnGameImage } from "../../utils/Utils";
import StyleSheet from 'react-native-media-query';
import { Ip_Address } from '../../constants/Data';
import axios from 'axios';
import { Return_Token } from '../../utils/Utils';

const AllMatches = ({ route, navigation }: { route: any; navigation: any }) => {
  const [Loading, setLoading] = useState(true);
  const [Page, setPage] = useState(1);
  const [Data_Length, setData_Length] = useState(0);
  const [PreMatchType, setPreMatchType] = useState('')
  const [All_Matchs, setAll_Matches] = useState([] as Array<any>);

  const [SelectedMenu, setSelectedMenu] = useState(
    route.params.Query_Props ? route.params.Query_Props : ""
  );

  async function Fetch_All_Match(SelectedMenu: any, Page: Number, Reset: Boolean) {
    try {
      const Token: string = (await Return_Token(
        'Get_All_Matches_Fail',
        null,
      )) as string;
      const response = await axios.get(
        `${Ip_Address}/fetchalltournament?Game_Name=${SelectedMenu}&Page=${Page}`,
        {
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            authToken: Token,
          },
        },
      );
      if (PreMatchType === SelectedMenu && !Reset) {
        setAll_Matches([...All_Matchs, ...response.data.Data])
      } else {
        setAll_Matches(response.data.Data)
      }
      setLoading(false)
      setPreMatchType(SelectedMenu);
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
    if (Data_Length === 4) {//4 Here is ResultPerPage
      Fetch_All_Match(SelectedMenu, Page + 1, false);
      setPage((Previous) => Previous + 1);
    }
  }

  useEffect(() => {
    Fetch_All_Match(SelectedMenu, 1, true);
  }, []);

  return (
    <View style={style.Container}>
      <Heading navigation={navigation} Title={"All Matches"} />
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
                setLoading(true)
                setPage(1);
                Fetch_All_Match(item.Query_String, 1, true);
                setSelectedMenu(item.Query_String);
              }}
            >
              <Text
                style={{
                  color:
                    SelectedMenu === item.Query_String
                      ? COLORS.primary
                      : COLORS.black,
                  ...styles.Title
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {Loading ? (
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
      ) : All_Matchs.length === 0 ? (
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
            No Matches Available
          </Text>
        </View>
      ) : (
        <FlatList
          data={All_Matchs}
          keyExtractor={(Item) => `${Item._id}`}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onRefresh={() => {
            setLoading(true)
            Fetch_All_Match(SelectedMenu, 1, true)
            setPage(1);
          }}
          refreshing={Loading}
          renderItem={({ item }) => (
            <GameItems
              ContainerStyle={{
                ...style.Elevation,
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
          onEndReachedThreshold={0}
          ListFooterComponent={(<View>
            {Data_Length === 4 && <View
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

export default AllMatches;

const style = RN_Styles.create({
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

const { styles } = StyleSheet.create({
  Title: {
    fontFamily: 'Poppins-SemiBold', fontSize: 14,
    fontWeight: "700",
    '@media (min-height:  805.8181818181819)': {
      ...FONTS.body3,
      fontWeight: "700",
    },
  },
})
