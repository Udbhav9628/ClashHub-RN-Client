import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SIZES, COLORS, FONTS } from "../../constants/Theame";
import Icons from "../../constants/Icons";
import BottomPopup from "../../components/BottomPopup";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Clear_Match_Reducer_Error,
  Clear_Match_Reducer_Sucess,
  RemoveMatchItem,
} from "../../store/Match/Matchaction";

const GameDetailsPage = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const { Item } = route.params;

  const [modalVisible, setModalVisible] = useState(false);

  const [Disable, setDisable] = useState(false);

  const { Join_Sucess, Error, Responce } = useSelector(
    (state: any) => state.Join_Match_Reducer
  );

  const { User } = useSelector((state: any) => state.AuthReducer);

  const { Home_Matchs } = useSelector(
    (state: any) => state.Get_Home_Page_Matches
  );

  const isJoined = Item.Joined_User.find((Item: any) => {
    return Item.UserId === User.id;
  });

  const dispatch = useDispatch();

  const Remove_Match_Item = bindActionCreators(RemoveMatchItem, dispatch);

  const Clear_Match_Sucess = bindActionCreators(
    Clear_Match_Reducer_Sucess,
    dispatch
  );

  const Clear_Match_ReducerError = bindActionCreators(
    Clear_Match_Reducer_Error,
    dispatch
  );

  useEffect(() => {
    if (Join_Sucess) {
      Alert.alert("Message", Responce, [
        {
          text: "OK",
          onPress: () => {
            Clear_Match_Sucess();
            Remove_Match_Item(Home_Matchs, Item._id);
            navigation.navigate("MyMatches");
          },
        },
      ]);
    }
  }, [Join_Sucess]);

  useEffect(() => {
    if (Error) {
      Alert.alert("Error", Error, [
        {
          text: "OK",
          onPress: () => {
            setDisable(false);
            setModalVisible(!modalVisible);
            Clear_Match_ReducerError();
          },
        },
      ]);
    }
  }, [Error]);

  return (
    <View style={style.container}>
      {/* Header */}
      <View style={style.Header}>
        {/* Header Left */}
        <TouchableOpacity
          style={style.HeaderLeft}
          onPress={() => navigation.goBack()}
        >
          <Icon name="angle-left" size={20} color="black" />
        </TouchableOpacity>
        <View
          style={{
            marginLeft: "24%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.black,
              ...FONTS.h2,
              fontWeight: "700",
            }}
          >
            Match Details
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding,
          flexDirection: "row",
        }}
      >
        {/* all Info */}
        <View
          style={{
            width: "50%",
          }}
        >
          {/* Title */}
          <View style={style.TitleWraper}>
            <Text
              style={{
                ...FONTS.body1,
                fontWeight: "700",
                color: COLORS.black,
              }}
            >
              {Item.Game_Name} Squad Match
            </Text>
          </View>
          {isJoined ? (
            <View style={style.EntryFeeWraper}>
              <Text
                style={{
                  ...FONTS.body2,
                  color: COLORS.primary,
                  fontWeight: "700",
                }}
              >
                Joined
              </Text>
            </View>
          ) : (
            <View style={style.EntryFeeWraper}>
              <Text
                style={{
                  ...FONTS.body2,
                  color: COLORS.primary,
                  fontWeight: "700",
                }}
              >
                Entry Fee
              </Text>
              <Text
                style={{
                  ...FONTS.body2,
                  color: COLORS.primary,
                  fontWeight: "700",
                }}
              >
                {" "}
                &#x20B9; 10
              </Text>
            </View>
          )}
          {/* Match Info */}
          <View style={style.InfoWrapper}>
            {/* Info Left Details */}
            <View>
              {/* Prize Per Kill */}
              <View style={style.InfoLeftItem}>
                <Text style={{ color: COLORS.darkGray2, ...FONTS.h4 }}>
                  Prize
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    ...FONTS.body3,
                    fontWeight: "700",
                  }}
                >
                  &#x20B9; {Item.Prize_Pool} Per Kill
                </Text>
              </View>
              {/* Match Type */}
              <View style={style.InfoLeftItem}>
                <Text style={{ color: COLORS.darkGray2, ...FONTS.h4 }}>
                  Match Type
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    ...FONTS.body3,
                    fontWeight: "700",
                  }}
                >
                  TPP
                </Text>
              </View>
              {/* Match Map */}
              <View style={style.InfoLeftItem}>
                <Text style={{ color: COLORS.darkGray2, ...FONTS.h4 }}>
                  Map
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    ...FONTS.body3,
                    fontWeight: "700",
                  }}
                >
                  Miramar
                </Text>
              </View>
              {/* Match Date */}
              <View style={style.InfoLeftItem}>
                <Text style={{ color: COLORS.darkGray2, ...FONTS.h4 }}>
                  Match Date
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    ...FONTS.body3,
                    fontWeight: "700",
                  }}
                >
                  23 March 2022
                </Text>
              </View>
              {/* Match Time */}
              <View style={style.InfoLeftItem}>
                <Text style={{ color: COLORS.darkGray2, ...FONTS.h4 }}>
                  Match Time
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    ...FONTS.body3,
                    fontWeight: "700",
                  }}
                >
                  08 : 00 PM
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Info Right Image */}
        <View style={style.InfoRight}>
          <Image source={Icons.Pubg2} style={style.InfoWrapperImage} />
        </View>
      </View>
      {/* Match By Guild */}
      <View style={style.Elevation}>
        <TouchableOpacity>
          <View style={style.GuildWrapper}>
            <Image
              style={{
                marginHorizontal: 12,
                width: 50,
                height: 50,
                borderRadius: SIZES.radius,
                resizeMode: "cover",
              }}
              source={{
                uri: "https://www.kindpng.com/picc/m/227-2272337_youtube-gaming-logo-png-png-download-transparent-gamer.png",
              }}
            />
            {/* Info Of Guild */}
            <View style={style.GuildInfo}>
              <View>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: SIZES.h3,
                    fontWeight: "bold",
                  }}
                >
                  The warriors
                </Text>
                <Text
                  style={{
                    fontSize: SIZES.h3,
                    lineHeight: 22,
                    fontWeight: "bold",
                    color: COLORS.gray,
                  }}
                >
                  200 Followers
                </Text>
              </View>
              <View
                style={{
                  position: "absolute",
                  top: 7,
                  right: 8,
                }}
              >
                <Icon name="angle-right" size={24} color="black" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {!isJoined && (
        <View>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            style={{
              height: 55,
              alignItems: "center",
              justifyContent: "center",
              marginTop: SIZES.padding,
              marginBottom: SIZES.padding,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.primary,
              marginHorizontal: SIZES.padding,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontWeight: "bold",
                fontSize: SIZES.body3,
              }}
            >
              Join Match
            </Text>
          </TouchableOpacity>
          {/* Modal */}
          <BottomPopup
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            // navigation={navigation}
            MatchId={Item._id}
            Disable={Disable}
            setDisable={setDisable}
          />
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightGray2,
    flex: 1,
  },
  Header: {
    marginTop: 10,
    flexDirection: "row",
    marginHorizontal: SIZES.h4,
  },
  HeaderLeft: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: "#CDCDCD",
    borderRadius: SIZES.radius,
  },
  TitleWraper: {
    marginHorizontal: SIZES.padding,
  },
  EntryFeeWraper: {
    flexDirection: "row",
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
  },
  InfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SIZES.padding,
    marginLeft: SIZES.padding,
  },
  InfoLeftItem: {
    marginBottom: SIZES.base,
  },
  InfoRight: {
    width: "50%",
  },
  InfoWrapperImage: {
    width: 200,
    height: 400,
    resizeMode: "stretch",
  },
  Elevation: {
    backgroundColor: "white",
    borderRadius: SIZES.radius,
    elevation: 5,
    marginVertical: 8,
    margin: SIZES.padding,
    marginHorizontal: SIZES.padding,
    //For Ios Only -- SHOWdow code
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  GuildWrapper: {
    backgroundColor: COLORS.lightGray2,
    height: 70,
    borderRadius: SIZES.radius,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  GuildInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
export default GameDetailsPage;
