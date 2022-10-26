import { Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { COLORS, SIZES, FONTS } from "../constants/Theame";
import StyleSheet from 'react-native-media-query';

const MyMatchesMenu = ({ SelectedMenu, setSelectedMenu, GamesTypes, Fetch_Matchs, setPage, SetLoading, Club_Id }: { SelectedMenu: any; setSelectedMenu: any; GamesTypes: any; Fetch_Matchs: any; setPage: Function; SetLoading: Function; Club_Id: any }) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={GamesTypes}
      keyExtractor={(Item) => `${Item.id}`}
      contentContainerStyle={{
        marginHorizontal: SIZES.padding,
        marginTop: 5,
        marginBottom: 13,
      }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{
            marginRight: 53,
          }}
          onPress={() => {
            SetLoading(true)
            setPage(1);
            if (Club_Id) {
              Fetch_Matchs(Club_Id, item.Name, 1, true);
            } else {
              Fetch_Matchs(item.Name, 1, true);
            }
            setSelectedMenu(item.Name);
          }}
        >
          <Text
            style={{
              color:
                SelectedMenu === item.Name
                  ? COLORS.primary
                  : COLORS.black,
              ...styles.Title
            }}
          >
            {item.Name}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default MyMatchesMenu;

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