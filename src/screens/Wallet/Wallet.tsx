import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SIZES, COLORS } from "../../constants/Theame";
import Icons from "../../constants/Icons";
import { PaymentData } from "../../constants/Data";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Heading from "../../components/Heading";
import { useFocusEffect } from "@react-navigation/native";
import {
  GetUserWalletBallance,
  Make_Payment_action,
} from "../../store/Payment/PaymentAction";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HeadingComp from "../../components/HeadingComp";
import AllInOneSDKManager from 'paytm_allinone_react-native';
import { MID, URL_SCHEME } from '../../constants/Data';
import { Gernerate_Paytm_Token } from "../../store/Payment/PaymentAction";

const Wallet = ({ navigation }: { navigation: any }) => {
  const [TempLoading, setTempLoading] = useState(true);
  const dispatch = useDispatch();
  const Make_Payment = bindActionCreators(Make_Payment_action, dispatch);

  const Get_User_Wallet_Ballance = bindActionCreators(
    GetUserWalletBallance,
    dispatch
  );

  const { User } = useSelector((state: any) => state.AuthReducer);

  const { loading, sucess, Error, Amount } = useSelector(
    (state: any) => state.Get_Ballance_Reducer
  );

  // const [modalVisible, setModalVisible] = useState(false);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     setModalVisible(false);
  //   }, [])
  // );

  useFocusEffect(
    React.useCallback(() => {
      Get_User_Wallet_Ballance();
      setTempLoading(false);
    }, [])
  );
  //For Error
  useFocusEffect(
    React.useCallback(() => {
      if (Error) {
        Alert.alert("Error", Error, [{ text: "OK" }]);
      }
    }, [Error])
  );

  const AddMoneyFunction = async () => {
    let amt = "10.00";
    const token = await Gernerate_Paytm_Token();
    const parsed = JSON.parse(token.post_data)
    try {
      AllInOneSDKManager.startTransaction(
        parsed.body.orderId,//order id
        MID,
        token.responsePaytm.body.txnToken,//token
        amt,
        parsed.body.callbackUrl,
        true,
        true,
        URL_SCHEME
      )
        .then((result) => {
          console.log("gateway response", result);
        })
        .catch((err) => {
          console.log("gateway error", err);
        });
    } catch (error) {
      console.log("try catch error", error)
    }
    setTempLoading(false)
  }

  //**********************Header********************/
  function WalletTopSection() {
    return (
      <>
        {/* Card */}
        <View style={style.Body}>
          <ImageBackground source={Icons.Crad} style={style.Card_Image}>
            <Text
              style={{
                position: "absolute",
                top: 8,
                right: 12,
                fontSize: 24,
                fontWeight: "bold",
                color: COLORS.white,
              }}
            >
              Gamer
            </Text>
            {/* Currunt Ballance */}
            <View
              style={{
                position: "absolute",
                top: 60,
                paddingHorizontal: SIZES.padding,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  lineHeight: 22,
                  fontWeight: "bold",
                  color: COLORS.lightGray2,
                }}
              >
                Current Balance
              </Text>
              <Text
                style={{
                  marginTop: 8,
                  fontSize: 22,
                  lineHeight: 22,
                  fontWeight: "bold",
                  color: COLORS.white,
                }}
              >
                &#x20B9; {Amount.Ballance}
              </Text>
            </View>
            {/* User Details */}
            <View
              style={{
                position: "absolute",
                bottom: 10,
                paddingHorizontal: SIZES.padding,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "700",
                  color: COLORS.white,
                }}
              >
                @Munde_665
              </Text>
            </View>
            {/* Tag Line */}
            <View
              style={{
                position: "absolute",
                bottom: 10,
                right: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "700",
                  color: COLORS.white,
                }}
              >
                #PlayWinEarn
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 12,
          }}
        >
          {/* ADD MONEY */}
          <View style={style.Body}>
            <TouchableOpacity
              style={{
                alignItems: "center",
              }}
              onPress={() => {
                AddMoneyFunction()
                setTempLoading(true)
              }}
            >
              <MaterialCommunityIcons
                name="credit-card-plus"
                size={22}
                color="black"
              />
              <Text style={{ ...style.Menutitle, color: COLORS.black }}>
                Deposit
              </Text>
            </TouchableOpacity>
          </View>
          {/* WithDrea MONEY */}
          <View style={style.Body}>
            <TouchableOpacity
              style={{
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("PaymentSucess")}
            >
              <MaterialCommunityIcons
                name="credit-card-minus"
                size={22}
                color="black"
              />
              <Text style={{ ...style.Menutitle, color: COLORS.black }}>
                Withdraw
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 5 }}>
          <HeadingComp
            navigation={null}
            Title={"Transctions"}
            ShowViewAll={false}
            Navigate_to={''}
            Query={null}
          />
        </View>
      </>
    );
  }
  //**********************Header********************/

  return (
    <View style={style.Container}>
      <Heading navigation={navigation} Title={"     Wallet"} />
      {TempLoading || loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        sucess && (
          <>
            {/* Modal */}
            {/* <View>
              <AddMoneyModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                navigation={navigation}
              />
            </View> */}
            <FlatList
              data={PaymentData}
              keyExtractor={(Item) => `${Item.id}`}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={<>{WalletTopSection()}</>}
              renderItem={({ item }: { item: any }) => (
                <View style={style.Elevation}>
                  <TouchableOpacity key={item.key}>
                    <View style={style.NotificationWrapper}>
                      <View
                        style={{
                          height: 40,
                          width: 40,
                          marginRight: 5,
                          justifyContent: "center",
                          borderRadius: SIZES.radius,
                        }}
                      >
                        <Icon name="card" size={24} color="#000" />
                      </View>
                      <View>
                        <Text
                          style={{
                            ...style.NotificationText,
                            color: COLORS.black,
                          }}
                        >
                          {item.Name}
                        </Text>
                        <Text style={style.NotificationText2}>{item.Time}</Text>
                      </View>
                      <View style={style.Value}>
                        <Text
                          style={{ ...style.ValueText, color: COLORS.black }}
                        >
                          &#x20B9;{item.Value}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
          </>
        )
      )}
    </View>
  );
};

export default Wallet;

const style = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  Body: {
    marginHorizontal: SIZES.padding,
    marginVertical: SIZES.base,
  },
  Card_Image: {
    height: 200,
    width: "100%",
    borderRadius: SIZES.radius,
    overflow: "hidden",
  },
  History: {
    marginTop: 30,
    marginBottom: 3,
    fontSize: 19,
    lineHeight: 22,
    fontWeight: "700",
    marginHorizontal: 12,
  },
  Menutitle: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "700",
    marginHorizontal: 15,
  },
  Elevation: {
    marginVertical: 1,
    margin: SIZES.padding,
    borderRadius: SIZES.radius,
  },
  // Elevation: {
  //   backgroundColor: COLORS.lightGray2,
  //   elevation: 1,
  //   marginVertical: 8,
  //   margin: SIZES.padding,
  //   borderRadius: SIZES.radius,
  //   //For Ios Only -- SHOWdow code
  //   shadowColor: "#171717",
  //   shadowOffset: { width: -2, height: 4 },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 3,
  // },
  NotificationWrapper: {
    height: 80,
    paddingHorizontal: SIZES.base,
    paddingVertical: 10,
    flexDirection: "row",
  },
  NotificationText: {
    maxWidth: "95%",
    fontSize: 14,
    fontWeight: "700",
  },
  NotificationText2: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.gray,
  },
  Value: {
    position: "absolute",
    top: 10,
    right: 15,
  },
  ValueText: {
    fontSize: 13,
    fontWeight: "bold",
    color: COLORS.black,
  },
});
