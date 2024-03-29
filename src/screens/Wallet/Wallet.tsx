import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  RefreshControl
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
import { Gernerate_Razorpay_Token, Check_Payment_Status } from "../../store/Payment/PaymentAction";
import TransctionModal from "./TransctionModal";
import BottomPopup from "../../components/BottomPopup";
import RazorpayCheckout from 'react-native-razorpay';
import AddMoneyModal from "../../components/AddMoneyModal";
import WithdrawModal from "./WithdrawModal";

const Wallet = ({ navigation }: { navigation: any }) => {
  const [TempLoading, setTempLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [Disable, setDisable] = useState(false);
  const [withdrawlsmodalVisible, setwithdrawlsModalVisible] = useState(false);
  const [Create_withdrawl, setCreate_withdrawl] = useState(false);
  const [Add_MoneymodalVisible, setAdd_MoneymodalVisible] = useState(false);

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

  const Check_Payment_Status_FUNC = bindActionCreators(
    Check_Payment_Status,
    dispatch
  );

  const Gernerate_Razorpay_Token_FUNC = bindActionCreators(
    Gernerate_Razorpay_Token,
    dispatch
  );

  const { loading, sucess, Error, Amount } = useSelector(
    (state: any) => state.Get_Ballance_Reducer
  );

  const { Tsucess, RazorPay_Token, TError } = useSelector(
    (state: any) => state.Razorpay_Token_Reducer
  );

  async function CheckOut() {
    try {
      var options = {
        image: 'https://i.pinimg.com/550x/71/1e/f7/711ef72cd86faa5e489ce9c908f27721.jpg',
        currency: 'INR',
        key: RazorPay_Token.key_id,
        amount: (RazorPay_Token.order.amount_due),
        name: 'ClashHub',
        order_id: RazorPay_Token.order.id,
        theme: { color: COLORS.primary }
      }
      const Data = await RazorpayCheckout.open(options);
      Check_Payment_Status_FUNC(Data.razorpay_order_id);
    } catch (error: any) {
      Alert.alert("Msg", `Payment Cancelled`, [{ text: "OK" }]);
    } finally {
      setTempLoading(false)
    }
  }

  useEffect(() => {
    if (Tsucess) {
      Clear_Payment_Reducer_Sucess_Func();
      CheckOut();
    }
  }, [Tsucess])

  useEffect(() => {
    if (TError) {
      Clear_Payment_Reducer_Error_Func()
      Alert.alert("Error", TError, [{ text: "OK" }]);
    }
  }, [TError])

  const AddMoneyFunction = async (Amount: Number) => {
    Gernerate_Razorpay_Token_FUNC(Amount)
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

  const { Addloading, Addsucess, Response } = useSelector(
    (state: any) => state.Add_Wallet_Ballance_Reducer
  );

  //Add Money Sucess
  useEffect(() => {
    if (Addsucess) {
      Clear_Payment_Reducer_Sucess_Func();
      if (Response === 253) {
        Alert.alert("Processing Payment!", "Amount Will be Added to Wallet Shortly! Check Back Later. If not Please reach out to us, We will make you Refund,     Sorry for the inconvenince", [{ text: "OK" }]);
      } else {
        navigation.navigate("PaymentSucess", {
          Matched_Joined: false
        })
      }
    }
  }, [Addsucess])

  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout: any) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTempLoading(false);
    Get_User_Wallet_Ballance();
    wait(500).then(() => setRefreshing(false));
  }, []);

  if (Addloading) {
    return (
      <View style={style.Container}>
        <Heading navigation={navigation} Title={"Wallet"} />
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
      <ScrollView style={style.Container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <Heading navigation={navigation} Title={"Wallet"} />
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
                        ClashHub
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
                  <View style={style.Elevation}>
                    {/* withdrawls modal */}
                    <BottomPopup
                      modalVisible={Create_withdrawl}
                      setModalVisible={setCreate_withdrawl}
                      MatchId={null}
                      Amount={Amount.Ballance}
                      Is_Club_Withdrawal={false}
                      Disable={Disable}
                      setDisable={setDisable}
                      navigation={navigation}
                      ModalContainerStyle={
                        {
                          position: "absolute",
                          bottom: -8,
                          left: 2,
                          right: 2,
                          margin: 20,
                          height: 380,
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
                    <WithdrawModal modalVisible={withdrawlsmodalVisible}
                      setModalVisible={setwithdrawlsModalVisible}
                      setCreate_withdrawl={setCreate_withdrawl} Is_Club_Withdrawal={false} />
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
                          <Text style={style.NotificationText}>Withdrawals</Text>
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
                    <AddMoneyModal
                      modalVisible={Add_MoneymodalVisible}
                      setModalVisible={setAdd_MoneymodalVisible}
                      AddMoneyFunction={AddMoneyFunction}
                      setTempLoading={setTempLoading}
                      TempLoading={TempLoading}
                      ModalContainerStyle={
                        {
                          position: "absolute",
                          bottom: -8,
                          left: 2,
                          right: 2,
                          margin: 20,
                          height: 250,
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
                    <TouchableOpacity
                      onPress={() => {
                        setAdd_MoneymodalVisible(true)
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
              </>
            </>
          )
        )}
      </ScrollView>
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
