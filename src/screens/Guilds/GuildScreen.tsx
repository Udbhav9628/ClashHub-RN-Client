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
import React, { useEffect } from "react";
import { SIZES, COLORS, Dpheight, DPwidth } from "../../constants/Theame";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Fetch_All_Guild,
  Clear_Guild_Reducer_Error,
} from "../../store/Guild/GuildAction";
const logo = require("../../Assets/Images/logo_02.png");

const GuildScreen = ({ navigation }: { navigation: any }) => {
  const { All_Guilds, Guild_loading, Guild_Error } = useSelector(
    (state: any) => state.Get_All_Guild
  );

  const dispatch = useDispatch();
  const FetchAll_Guild = bindActionCreators(Fetch_All_Guild, dispatch);

  const Clear_Guild_ReducerError = bindActionCreators(
    Clear_Guild_Reducer_Error,
    dispatch
  );

  useEffect(() => {
    FetchAll_Guild();
  }, []);

  useEffect(() => {
    if (Guild_Error) {
      Alert.alert("Error", Guild_Error + "  check ip and running , Reload", [
        {
          text: "OK",
          onPress: () => {
            Clear_Guild_ReducerError();
            // FetchAll_Guild();
          },
        },
      ]);
    }
  }, [Guild_Error]);

  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout: any) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    FetchAll_Guild();
    wait(500).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.Container}>
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
        <ScrollView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          <Text
            style={{
              fontSize: SIZES.h3,
              fontWeight: "700",
            }}
          >
            No Guilds Available
          </Text>
        </ScrollView>
      ) : (
        <FlatList
          data={All_Guilds}
          keyExtractor={(Item) => `${Item._id}`}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onRefresh={() => FetchAll_Guild()}
          refreshing={Guild_loading}
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
                  <Image source={{ uri: `https://api.multiavatar.com/${item.GuildName}.png` }}
                    style={{
                      height: Dpheight(8),
                      width: DPwidth(17),
                      borderRadius: Dpheight(45),
                    }} />
                  <Text style={styles.NotificationText}>{item.GuildName}</Text>
                  <Text style={styles.NotificationText2}>
                    {item.Followers.length} Followers
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
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
    alignItems: "center",
    justifyContent: "center",
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
