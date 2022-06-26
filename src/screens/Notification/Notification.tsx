import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import { SIZES, COLORS } from "../../constants/Theame";
import { Notification_Data } from "../../constants/Data";
import Heading from "../../components/Heading";
const logo = require("../../Assets/Images/logo_02.png");

const Notification = ({ navigation }: { navigation: any }) => {
  return (
    <View style={style.Container}>
      {/* Header */}
      <Heading navigation={navigation} Title={" Notification"} />
      {/* Notification Content */}
      <View>
        <FlatList
          data={Notification_Data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: { item: any }) => (
            <TouchableOpacity key={item.key}>
              <View style={style.NotificationWrapper}>
                <Image
                  source={logo}
                  style={{
                    height: 40,
                    width: 40,
                    marginRight: 5,
                    borderRadius: SIZES.radius,
                  }}
                />
                <View>
                  <Text style={style.NotificationText}>{item.title}</Text>
                  <Text style={style.NotificationText2}>2 Days ago</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Notification;

const style = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  NotificationWrapper: {
    maxWidth: "90%",
    paddingHorizontal: SIZES.padding,
    paddingVertical: 18,
    borderRadius: SIZES.radius,
    flexDirection: "row",
  },
  NotificationText: {
    fontSize: SIZES.body3,
    fontWeight: "bold",
    color: COLORS.black,
  },
  NotificationText2: {
    fontSize: SIZES.body3,
    fontWeight: "600",
    color: COLORS.gray,
  },
});
