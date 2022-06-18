import React, { useState, useEffect } from "react";
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
  FlatList,
  StyleSheet
} from "react-native";
import { SIZES, COLORS, FONTS } from "../constants/Theame";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Join_Match_action } from "../store/Match/Matchaction";
import HeadingComp from "./HeadingComp";
import { Create_withdrawls_request, GetPendingWithdrawls, Clear_Payment_Reducer_Error, Clear_Payment_Reducer_Sucess } from "../store/Payment/PaymentAction";
import Icon from "react-native-vector-icons/Feather";

const BottomPopup = ({
  ModalContainerStyle,
  modalVisible,
  setModalVisible,
  MatchId,
  Amount,
  Disable,
  setDisable,
}: {
  ModalContainerStyle: any;
  modalVisible: any;
  setModalVisible: any;
  MatchId: any;
  Amount: any;
  Disable: boolean;
  setDisable: Function;
}) => {
  const { loading } = useSelector((state: any) => state.Join_Match_Reducer);

  const [WithdrawlsAmount, setWithdrawlsAmount] = useState(0)

  const { PWloading, Pending_Withdrawls, Error } = useSelector(
    (state: any) => state.PendingWithdrawls_Reducer
  );

  const Create_withdrawls_Reducer = useSelector(
    (state: any) => state.Create_withdrawls_Reducer
  );

  const dispatch = useDispatch();
  const Join_Match_Action_Func = bindActionCreators(
    Join_Match_action,
    dispatch
  );
  const Create_withdrawls_request_Func = bindActionCreators(
    Create_withdrawls_request,
    dispatch
  );
  const GetPendingWithdrawls_Func = bindActionCreators(
    GetPendingWithdrawls,
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

  useEffect(() => {
    if (modalVisible) {
      GetPendingWithdrawls_Func()
    }
  }, [modalVisible])

  useEffect(() => {
    if (Error) {
      Clear_Payment_Reducer_Error_Func()
      Alert.alert("Error", Error, [{ text: "OK" }]);
    }
  }, [Error])

  useEffect(() => {
    if (Create_withdrawls_Reducer.sucess) {
      Clear_Payment_Reducer_Sucess_Func()
      Alert.alert("Error", Create_withdrawls_Reducer.Sucess_Responce, [{ text: "OK" }]);
    }
  }, [Create_withdrawls_Reducer.sucess])

  useEffect(() => {
    if (Create_withdrawls_Reducer.Error) {
      Clear_Payment_Reducer_Error_Func()
      Alert.alert("Error", Create_withdrawls_Reducer.Error, [{ text: "OK" }]);
    }
  }, [Create_withdrawls_Reducer.Error])

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={{ ...ModalContainerStyle }}>
        {MatchId ? (
          <View
            style={{
              padding: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: COLORS.black,
                }}
              >
                Pay And Join Match
              </Text>
            </View>
            <Text
              style={{
                marginTop: 15,
                fontSize: 30,
                fontWeight: "bold",
                color: COLORS.black,
              }}
            >
              &#x20B9; 10
            </Text>
            <TouchableOpacity
              onPress={() => {
                Join_Match_Action_Func(MatchId, "10");
                setDisable(true);
              }}
              disabled={Disable}
              style={{
                height: 55,
                width: 100,
                alignItems: "center",
                justifyContent: "center",
                marginTop: SIZES.padding,
                marginBottom: SIZES.padding,
                borderRadius: SIZES.radius,
                backgroundColor: Disable
                  ? COLORS.transparentPrimray
                  : COLORS.primary,
                marginHorizontal: SIZES.padding,
              }}
            >
              {loading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                <Text
                  style={{
                    color: COLORS.white,
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  Pay
                </Text>
              )}
            </TouchableOpacity>
          </View>) : (
          <>
            <View style={{
              marginTop: 30,
              flex: 1, justifyContent: 'flex-start',
            }}>
              <View style={{
                marginBottom: 15,
                alignSelf: 'center'
              }}>
                <HeadingComp
                  navigation={null}
                  Title={"Make Withdraw Request"}
                  ShowViewAll={false}
                  Navigate_to={''}
                  Query={null}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: SIZES.base,
                    color: COLORS.darkGray,
                    fontSize: SIZES.body4,
                  }}
                >
                  Usually takes 1 business day to complete
                </Text>
              </View>
              <TextInput
                style={{
                  marginTop: 10,
                  height: 55,
                  alignSelf: 'center',
                  width: '90%',
                  paddingLeft: 25,
                  justifyContent: "center",
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.lightGray2
                }}
                placeholder='Enter Amount'
                placeholderTextColor={COLORS.gray}
                keyboardType="numeric"
                autoCapitalize="none"
                onChangeText={(text) => {
                  setWithdrawlsAmount(parseInt(text))
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  if (WithdrawlsAmount < 10) {
                    Alert.alert("Error", 'You Can Withdraw at least 10', [{ text: "OK" }]);
                  } else {
                    if (Amount < WithdrawlsAmount) {
                      Alert.alert("Error", 'Low Wallet Ballance', [{ text: "OK" }]);
                    } else {
                      console.log('in else wallet');
                      setModalVisible(false)
                      Create_withdrawls_request_Func(WithdrawlsAmount)
                    }
                  }
                }}
                disabled={Disable}
                style={{
                  alignSelf: 'center',
                  height: 55,
                  width: '35%',
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: SIZES.padding,
                  marginBottom: 30,
                  borderRadius: SIZES.radius,
                  backgroundColor: Disable
                    ? COLORS.transparentPrimray
                    : COLORS.primary,
                  marginHorizontal: SIZES.padding,
                }}
              >
                {loading ? (
                  <ActivityIndicator size="large" color={COLORS.primary} />
                ) : (
                  <Text
                    style={{
                      color: COLORS.white,
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  >
                    Withdraw
                  </Text>
                )}
              </TouchableOpacity>
              {PWloading ? (
                <View
                  style={{
                    // flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
              ) : Pending_Withdrawls && Pending_Withdrawls.length === 0 ? (
                <View
                  style={{
                    // flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.h4,
                      fontWeight: "700",
                    }}
                  >
                    No Pending Request
                  </Text>
                </View>
              ) : (
                <>
                  <HeadingComp
                    navigation={null}
                    Title={"Pending Requests"}
                    ShowViewAll={false}
                    Navigate_to={''}
                    Query={null}
                  />
                  <FlatList
                    data={Pending_Withdrawls}
                    keyExtractor={(Item) => `${Item._id}`}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <View style={style.Elevation}>
                        <TouchableOpacity>
                          <View style={style.NotificationWrapper}>
                            <View
                              style={{
                                height: 40,
                                width: 30,
                                marginLeft: 4,
                                justifyContent: "center",
                                borderRadius: SIZES.radius,
                              }}
                            >
                              <Icon name="arrow-down-right" size={20} color="#000" />
                            </View>
                            <View>
                              <Text
                                style={{
                                  ...style.NotificationText,
                                  color: COLORS.black,
                                }}
                              >
                                {item.Message}
                              </Text>
                              <View style={{ flexDirection: 'row' }}>
                                <Text style={{ ...style.NotificationText2, marginRight: '5%' }}>{item.Status}</Text>
                              </View>
                            </View>
                            <View style={style.Value}>
                              <Text
                                style={{ ...style.ValueText, color: COLORS.black }}
                              >
                                &#x20B9;{item.Amount}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                </>
              )}
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

export default BottomPopup;

const style = StyleSheet.create({
  Elevation: {
    elevation: 1,
    marginVertical: 10,
    margin: 10,
    //For Ios Only -- SHOWdow code
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  NotificationWrapper: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightGray2,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.base,
  },
  NotificationText: {
    // lineHeight: 30,
    fontSize: 16,
    fontWeight: "bold",
  },
  NotificationText2: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.gray,
  },
  Value: {
    position: "absolute",
    top: 17,
    right: 15,
  },
  ValueText: {
    fontSize: 13,
    fontWeight: "bold",
    color: COLORS.black,
  },
});
