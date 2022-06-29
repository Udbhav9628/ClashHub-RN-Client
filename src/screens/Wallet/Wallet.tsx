import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SIZES, COLORS, FONTS, Dpheight } from "../../constants/Theame";
import Icons from "../../constants/Icons";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Heading from "../../components/Heading";
import { useFocusEffect } from "@react-navigation/native";
import { GetUserWalletBallance, Clear_Payment_Reducer_Error, Clear_Payment_Reducer_Sucess } from "../../store/Payment/PaymentAction";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AllInOneSDKManager from 'paytm_allinone_react-native';
import { MID, URL_SCHEME } from '../../constants/Data';
import { Gernerate_Paytm_Token, Add_Wallet_Ballance } from "../../store/Payment/PaymentAction";
import TransctionModal from "./TransctionModal";
import BottomPopup from "../../components/BottomPopup";

const Wallet = ({ navigation }: { navigation: any }) => {
  const [TempLoading, setTempLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [Disable, setDisable] = useState(false);
  const [withdrawlsmodalVisible, setwithdrawlsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const Get_User_Wallet_Ballance = bindActionCreators(
    GetUserWalletBallance,
    dispatch
  );
  const Clear_Payment_Reducer_Error_Func = bindActionCreators(
    Clear_Payment_Reducer_Error,
    dispatch
  );

  const Clear_Payment_Reducer_Sucess_Func = bindActionCreators(
    Clear_Payment_Reducer_Sucess,
    dispatch
  );

  const Add_Wallet_Ballance_FUNC = bindActionCreators(
    Add_Wallet_Ballance,
    dispatch
  );

  const { loading, sucess, Error, Amount } = useSelector(
    (state: any) => state.Get_Ballance_Reducer
  );

  // To DO - Chech comming responce see DOCUMENTATION
  const AddMoneyFunction = async () => {
    let amt = "10.00";
    const token = await Gernerate_Paytm_Token();
    const parsed = JSON.parse(token.post_data)
    console.log(parsed.body.orderId);
    console.log(parsed.body.callbackUrl);
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
          if (result.STATUS === 'TXN_SUCCESS') {
            console.log(result);
            Add_Wallet_Ballance_FUNC(result.TXNAMOUNT, result.TXNID, `Added To Gamer Wallet`, true, result.TXNDATE)
          }
        })
        .catch((err) => {
          console.log("gateway error", err);
        });
    } catch (error) {
      console.log("try catch error", error)
    }
    setTempLoading(false)
  }

  useFocusEffect(
    React.useCallback(() => {
      setTempLoading(false);
      Get_User_Wallet_Ballance();
    }, [])
  );

  useEffect(() => {
    if (Error) {
      Clear_Payment_Reducer_Error_Func()
      Alert.alert("Error", Error, [{ text: "OK" }]);
    }
  }, [Error])

  const { Addloading, Addsucess, AddError } = useSelector(
    (state: any) => state.Add_Wallet_Ballance_Reducer
  );

  //Add Money Sucess
  useEffect(() => {
    if (Addsucess) {
      Clear_Payment_Reducer_Sucess_Func()
      Get_User_Wallet_Ballance();
      Alert.alert("Message", 'Payment Sucessfull', [{ text: "OK" }]);
    }
  }, [Addsucess])

  //Add Money Fail
  useEffect(() => {
    if (AddError) {
      Clear_Payment_Reducer_Sucess_Func()
      Alert.alert("Error", 'Payment Faild!, Content Us if Money get duducted from your Bank, Do not worry we will make you refund if needed ', [{ text: "OK" }]);
    }
  }, [AddError])

  if (Addloading) {
    return (
      <View style={style.Container}>
        <Heading navigation={navigation} Title={"     Wallet"} />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              ...FONTS.h3,
              fontWeight: "700",
            }}
          >
            Do Not Press Back Button! Processing Payment
          </Text>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </View>
    );
  } else {
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
              <>
                {/* Card */}
                <View style={style.Body}>
                  <ImageBackground source={Icons.Crad} style={style.Card_Image}>
                    <Text
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 12,
                        fontSize: SIZES.body2,
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
                          fontSize: SIZES.h2,
                          fontWeight: "bold",
                          color: COLORS.lightGray2,
                        }}
                      >
                        Current Balance
                      </Text>
                      <Text
                        style={{
                          fontSize: SIZES.body2,
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
                          fontSize: SIZES.h3,
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
                          fontSize: SIZES.body5,
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
                    marginTop: 15,
                  }}
                >
                  {/* All Transctions */}
                  <View style={style.Elevation}>
                    {/* Transction modal */}
                    <View>
                      <TransctionModal modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        navigation={navigation} Which_Wallet={"Gamer"} />
                    </View>
                    <TouchableOpacity onPress={() => {
                      setModalVisible(true);
                    }}>
                      <View style={style.NotificationWrapper}>
                        <MaterialCommunityIcons
                          name="bank-transfer"
                          size={Dpheight(4.2)}
                          color="black"
                        />
                        <View style={style.DashboardBox}>
                          <Text style={style.NotificationText}>All Transactions</Text>
                        </View>
                        <View
                          style={{
                            position: "absolute",
                            top: 20,
                            right: 5,
                          }}
                        >
                          <Icon
                            name="chevron-forward-outline"
                            size={Dpheight(3)}
                            color="black"
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {/* Club Wallet */}
                  <View style={style.Elevation}>
                    <TouchableOpacity onPress={() => navigation.replace('ClubWallet')}>
                      <View style={style.NotificationWrapper}>
                        <MaterialCommunityIcons
                          name="wallet"
                          size={Dpheight(3.1)}
                          color="black"
                        />
                        <View style={style.DashboardBox}>
                          <Text style={style.NotificationText}>Club Wallet</Text>
                        </View>
                        <View
                          style={{
                            position: "absolute",
                            top: 20,
                            right: 5,
                          }}
                        >
                          <Icon
                            name="chevron-forward-outline"
                            size={Dpheight(3)}
                            color="black"
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {/* Withdraw Money */}
                  <View style={style.Elevation}>
                    {/* withdrawls modal */}
                    <BottomPopup
                      modalVisible={withdrawlsmodalVisible}
                      setModalVisible={setwithdrawlsModalVisible}
                      MatchId={null}
                      Amount={Amount.Ballance}
                      Disable={Disable}
                      setDisable={setDisable}
                      ModalContainerStyle={
                        {
                          position: "absolute",
                          bottom: -8,
                          left: 2,
                          right: 2,
                          margin: 20,
                          height: Dpheight(50),
                          backgroundColor: "white",
                          borderRadius: SIZES.radius,
                          shadowColor: COLORS.black,
                          shadowOpacity: 0.25,
                          shadowRadius: 4,
                          elevation: 5,
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                        }
                      }
                    />
                    <TouchableOpacity onPress={() => {
                      setwithdrawlsModalVisible(true)
                    }}>
                      <View style={style.NotificationWrapper}>
                        <MaterialCommunityIcons
                          name="credit-card-minus"
                          size={22}
                          color="black"
                        />
                        <View style={style.DashboardBox}>
                          <Text style={style.NotificationText}>Withdraw</Text>
                        </View>
                        <View
                          style={{
                            position: "absolute",
                            top: 20,
                            right: 5,
                          }}
                        >
                          <Icon
                            name="chevron-forward-outline"
                            size={Dpheight(3)}
                            color="black"
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {/* ADD MONEY */}
                  <View style={style.Elevation}>
                    <TouchableOpacity
                      onPress={() => {
                        AddMoneyFunction()
                        setTempLoading(true)
                      }}
                    >
                      <View style={style.NotificationWrapper}>
                        <MaterialCommunityIcons
                          name="credit-card-plus"
                          size={22}
                          color="black"
                        />
                        <View style={style.DashboardBox}>
                          <Text style={style.NotificationText}>Deposit</Text>
                        </View>
                        <View
                          style={{
                            position: "absolute",
                            top: 20,
                            right: 5,
                          }}
                        >
                          <Icon
                            name="chevron-forward-outline"
                            size={Dpheight(3)}
                            color="black"
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                {/* Text Notes */}
                <View style={{
                  position: "absolute",
                  bottom: 2,
                  right: 78
                }}>
                  <Text
                    style={{
                      marginBottom: 10,
                      color: COLORS.darkGray,
                      fontSize: SIZES.body5,
                      textAlign: 'center'
                    }}
                  >
                    This is Test Payment System
                  </Text>
                  <Text
                    style={{
                      marginBottom: 10,
                      color: COLORS.darkGray,
                      fontSize: SIZES.body5,
                      textAlign: 'center'
                    }}
                  >
                    Phone No = 77777 77777 and Otp = 489871
                  </Text>
                  <Text
                    style={{
                      marginBottom: 10,
                      color: COLORS.darkGray,
                      fontSize: SIZES.body5,
                      textAlign: 'center'
                    }}
                  >
                    Use This credentials To Pay With Paytm Wallet
                  </Text>
                </View>
              </>
            </>
          )
        )}
      </View>
    );
  }
};

export default Wallet;

const style = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  Body: {
    marginTop: SIZES.base,
    marginHorizontal: SIZES.padding,
  },
  Card_Image: {
    height: Dpheight(25.2),
    width: "100%",
    borderRadius: SIZES.radius,
    overflow: "hidden",
  },
  Elevation: {
    backgroundColor: "white",
    borderRadius: SIZES.radius,
    elevation: 2,
    marginVertical: 10,
    margin: SIZES.padding,
    //For Ios Only -- SHOWdow code
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  DashboardBox: {
    marginLeft: 10,
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  NotificationWrapper: {
    height: Dpheight(8.7),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightGray2,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.base,
  },
  NotificationText: {
    color: "#000",
    fontSize: SIZES.Size4,
    fontWeight: "bold",
  },
});
