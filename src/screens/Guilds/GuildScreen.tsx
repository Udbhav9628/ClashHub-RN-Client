import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  ActivityIndicator,
  ScrollView,
  RefreshControl
} from "react-native";
import React, { useEffect, useState } from "react";
import { SIZES, COLORS, Dpheight, DPwidth } from "../../constants/Theame";
import { Ip_Address } from '../../constants/Data';
import axios from 'axios';
import { Return_Token } from '../../utils/Utils';
import Heading from "../../components/Heading";

const GuildScreen = ({ navigation }: { navigation: any }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout: any) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setData_Length(0);
    setPage(1);
    setData([] as Array<any>);
    Fetch_Data(1, false);
    wait(500).then(() => setRefreshing(false));
  }, []);

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
        `${Ip_Address}/fetchallGuild?Page=${Page}`,
        {
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            authToken: Token,
          },
        },
      );
      if (Data.length > 0 && Issame) {
        setData([...Data, ...response.data])
      } else {
        setData(response.data)
      }
      setLoading(false)
      setData_Length(response.data.length);
    } catch (error: any) {
      Alert.alert("Error", error.message, [
        {
          text: "OK",
        },
      ]);
    }
  }

  function WhenEndReached() {
    if (Data_Length === 20) {
      Fetch_Data(Page + 1, true);
      setPage((Previous) => Previous + 1);
    }
  }

  useEffect(() => {
    Fetch_Data(1, false)
  }, []);

  return (
    <View style={styles.Container}>
      <View style={{ marginBottom: 6 }}>
        <Heading navigation={navigation} Title={"All Clubs"} />
      </View>
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
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          <Text
            style={{
              fontSize: SIZES.h2,
              textAlign: 'center',
              fontWeight: "700",
              marginTop: 330
            }}
          >
            No Guilds Available
          </Text>
        </ScrollView>
      ) : (
        <FlatList
          data={Data}
          keyExtractor={(Item) => `${Item._id}`}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onRefresh={() => {
            setLoading(true)
            setData_Length(0)
            setPage(1)
            setData([] as Array<any>)
            Fetch_Data(1, false);
          }}
          refreshing={Loading}
          renderItem={({ item }: { item: any }) => (
            <View style={styles.Elevation}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("GuildDetail", {
                    Item: item,
                  });
                }}
              >
                <View style={styles.NotificationWrapper}>
                  <Image source={{ uri: `https://api.multiavatar.com/${item.Profile_Pic}.png` }}
                    style={{
                      height: Dpheight(8),
                      width: DPwidth(17),
                      borderRadius: Dpheight(45),
                    }} />
                  <Text style={styles.NotificationText}>{item.GuildName}</Text>
                  <Text style={styles.NotificationText2}>
                    {item.How_Many_Followers} Followers
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          onEndReached={() => {
            WhenEndReached();
          }}
          onEndReachedThreshold={0.4}
          ListFooterComponent={(<View>
            {Data_Length === 20 && <View
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

export default GuildScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  NotificationWrapper: {
    height: Dpheight(20),
    width: DPwidth(38.3),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.lightGray2,
    borderRadius: SIZES.radius,
  },
  Elevation: {
    backgroundColor: "white",
    borderRadius: SIZES.radius,
    elevation: 2,
    marginVertical: 8,
    marginHorizontal: SIZES.padding,
    //For Ios Only -- SHOWdow code
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  NotificationText: {
    color: "#000",
    lineHeight: SIZES.h1,
    fontSize: SIZES.body3,
    fontWeight: "bold",
  },
  NotificationText2: {
    lineHeight: SIZES.h1,
    fontSize: SIZES.body4,
    fontWeight: "600",
    color: COLORS.gray,
  },
});
