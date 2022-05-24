import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants/Theame";
import { GamesTypesData } from "../constants/Data";

const GameTypesComp = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.Container}>
      <FlatList
        horizontal
        data={GamesTypesData}
        keyExtractor={(Item) => `${Item.id}`}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginRight:
                index === GamesTypesData.length - 1 ? SIZES.padding : 0,
            }}
          >
            <TouchableOpacity
              style={styles.Elevation}
              onPress={() =>
                navigation.navigate("AllMatches", {
                  Query_Props: item.Query,
                })
              }
            >
              <View style={styles.NotificationWrapper}>
                <Image source={item.image} style={styles.Image} />
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default GameTypesComp;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: COLORS.white,
    marginTop: 2,
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
  NotificationWrapper: {
    height: 140,
    width: 150,
  },
  Image: {
    // resizeMode: "stretch",
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
