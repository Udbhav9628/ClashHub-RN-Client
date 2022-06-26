import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Dpheight, DPwidth, SIZES } from "../constants/Theame";
import { crousal } from "../constants/Data";

const Crousal = ({ }: {}) => {
  // Search Component
  // function Search_Comp() {
  //   return (
  //     <View
  //       style={{
  //         height: 40,
  //         flexDirection: 'row',
  //         alignItems: 'center',
  //         marginHorizontal: SIZES.padding,
  //         marginVertical: SIZES.base,
  //         paddingHorizontal: SIZES.radius,
  //         borderRadius: SIZES.radius,
  //         backgroundColor: COLORS.lightGray2,
  //       }}>
  //       {/* ICon */}
  //       <Image
  //         source={icons.search}
  //         style={{
  //           height: 20,
  //           width: 20,
  //           tintColor: COLORS.black,
  //         }}
  //       />
  //       {/* Text iNput */}
  //       <TextInput
  //         style={{
  //           flex: 1,
  //           marginLeft: SIZES.radius,
  //           fontSize: 16,
  //           lineHeight: 22,
  //         }}
  //         placeholder="Search Here..."
  //       />

  //       {/* Filter Buttoon */}
  //       <TouchableOpacity
  //       // onPress={}
  //       >
  //         <Image
  //           source={icons.filter}
  //           style={{
  //             width: 20,
  //             height: 20,
  //             tintColor: '#000',
  //           }}
  //         />
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

  return (
    <>
      <FlatList
        horizontal
        data={crousal}
        keyExtractor={(Item) => `${Item.id}`}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View
            style={{
              marginLeft: SIZES.padding,
              marginRight: index === crousal.length - 1 ? SIZES.padding : 0,
            }}
          >
            <TouchableOpacity>
              <View style={style.NotificationWrapper}>
                <Image
                  source={item.image}
                  style={{
                    width: DPwidth(87.4),
                    height: Dpheight(17.3),
                    resizeMode: "stretch",
                    borderRadius: SIZES.radius,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </>
  );
};

const style = StyleSheet.create({
  Image: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
    borderRadius: SIZES.radius,
  },
  NotificationWrapper: {
    height: Dpheight(17.3),
    width: DPwidth(88),
  },
});

export default Crousal;
