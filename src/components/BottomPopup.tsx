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
import { SIZES, COLORS, FONTS, Dpheight } from "../constants/Theame";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Update_Match_Room_Details, Clear_Match_Reducer_Sucess, Clear_Match_Reducer_Error } from "../store/Match/Matchaction";
import HeadingComp from "./HeadingComp";
import { Create_withdrawls_request, GetPendingWithdrawls, Clear_Payment_Reducer_Error, Clear_Payment_Reducer_Sucess } from "../store/Payment/PaymentAction";
import Textinput from "../screens/Menu/YourGuild/Textinput";
import Icon from "react-native-vector-icons/Feather";

const BottomPopup = ({
  ModalContainerStyle,
  modalVisible,
  setModalVisible,
  MatchId,
  Amount,
  Match_Status,
  Disable,
  setDisable,
  navigation
}: {
  ModalContainerStyle: any;
  modalVisible: any;
  setModalVisible: any;
  MatchId: any;
  Amount: any;
  Match_Status: any;
  Disable: boolean;
  setDisable: Function;
  navigation: any;
}) => {
  const { loading } = useSelector((state: any) => state.Create_withdrawls_Reducer);

  const [UPI_Id, setUPI_Id] = useState('')
  const [WithdrawlsAmount, setWithdrawlsAmount] = useState(0)

  const [Custom_Room_Name, setCustom_Room_Name] = useState('')
  const [Custom_Room_Password, setCustom_Room_Password] = useState('')

  const Create_withdrawls_Reducer = useSelector(
    (state: any) => state.Create_withdrawls_Reducer
  );

  const Room_Details_Reducer = useSelector(
    (state: any) => state.Update_Room_Details_Reducer
  );

  const dispatch = useDispatch();

  const Update_Match_Room_Details_Func = bindActionCreators(
    Update_Match_Room_Details,
    dispatch
  );

  const Clear_Match_Reducer_Sucess_Func = bindActionCreators(
    Clear_Match_Reducer_Sucess,
    dispatch
  );

  const Clear_Match_Reducer_Error_Func = bindActionCreators(
    Clear_Match_Reducer_Error,
    dispatch
  );

  const Create_withdrawls_request_Func = bindActionCreators(
    Create_withdrawls_request,
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
    if (Room_Details_Reducer.Sucess) {
      setCustom_Room_Name('')
      setCustom_Room_Password('')
      Alert.alert("Message", Room_Details_Reducer.Sucess_Responce, [{
        text: "OK",
        onPress: () => {
          setDisable(false);
          setModalVisible(!modalVisible);
          Clear_Match_Reducer_Sucess_Func()
          navigation.navigate("YourGuild");
        },
      }]);
    }
  }, [Room_Details_Reducer.Sucess])

  useEffect(() => {
    if (Room_Details_Reducer.Error) {
      setDisable(false);
      setCustom_Room_Name('')
      setCustom_Room_Password('')
      setModalVisible(!modalVisible);
      Clear_Match_Reducer_Error_Func();
      Alert.alert("Error", Room_Details_Reducer.Error, [{
        text: "OK",
      }]);
    }
  }, [Room_Details_Reducer.Error])

  useEffect(() => {
    if (Create_withdrawls_Reducer.sucess) {
      setModalVisible(!modalVisible);
      setWithdrawlsAmount(0)
      setUPI_Id('')
      Clear_Payment_Reducer_Sucess_Func()
      Alert.alert("Sucess", Create_withdrawls_Reducer.Sucess_Responce, [{ text: "OK" }]);
    }
  }, [Create_withdrawls_Reducer.sucess])

  useEffect(() => {
    if (Create_withdrawls_Reducer.Error) {
      setModalVisible(!modalVisible);
      setWithdrawlsAmount(0)
      setUPI_Id('')
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
        setWithdrawlsAmount(0)
        setUPI_Id('')
        setCustom_Room_Name('')
        setCustom_Room_Password('')
        setModalVisible(!modalVisible);
      }}
    >
      <View style={{ ...ModalContainerStyle }}>
        {MatchId ? (
          <View
            style={{
              margin: 16,
              justifyContent: "center",
            }}
          >
            <View>
              <Text
                style={{
                  marginTop: 2,
                  textAlign: 'center',
                  fontSize: SIZES.body2,
                  fontWeight: "bold",
                  color: COLORS.black,
                }}
              >
                Enter Room Details
              </Text>
            </View>
            <Textinput
              containerStyle={{ marginTop: 10 }}
              label="Custom Room Name"
              Placeholder={"Enter Custom Room Name"}
              KeyboardType="default"
              autoCapatilize={"none"}
              maxLength={30}
              onchange={(Value: any) => {
                const text = Value.replace(/\s{2,}/g, ' ').trim()
                setCustom_Room_Name(text);
              }}
              Msg={null}
            />
            <Textinput
              containerStyle={{ marginTop: 10 }}
              label="Custom Room Password"
              Placeholder={"Enter Custom Room Password"}
              KeyboardType="default"
              autoCapatilize={"none"}
              maxLength={15}
              onchange={(Value: any) => {
                const text = Value.replace(/\s{2,}/g, ' ').trim()
                setCustom_Room_Password(text);
              }}
              Msg={null}
            />
            <TouchableOpacity
              onPress={() => {
                if (Custom_Room_Name === '' || Custom_Room_Password === '') {
                  Alert.alert("Message", 'Fill All Details Please', [{
                    text: "OK",
                  }]);
                  return
                }
                Alert.alert(
                  "Alert",
                  "This Process is irreversible, Make Sure You're Entering correct Room Details",
                  [
                    {
                      text: "Proceed",
                      onPress: () => {
                        const RoomData = {
                          Name: Custom_Room_Name,
                          Password: Custom_Room_Password
                        }
                        Update_Match_Room_Details_Func(RoomData, MatchId)
                        setDisable(true);
                      }
                    },
                    {
                      text: "Cancel",
                    },
                  ]
                );
              }}
              disabled={Disable}
              style={{
                height: 48,
                alignItems: "center",
                justifyContent: "center",
                marginTop: SIZES.padding,
                borderRadius: SIZES.radius,
                backgroundColor: Disable
                  ? COLORS.transparentPrimray
                  : COLORS.primary,
                marginHorizontal: SIZES.base,
              }}
            >
              {Room_Details_Reducer.loading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                <Text
                  style={{
                    color: COLORS.white,
                    fontWeight: "bold",
                    fontSize: SIZES.h2,
                  }}
                >
                  Submit
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
                alignItems: "center",
                marginBottom: 15,
                alignSelf: 'center'
              }}>
                <HeadingComp
                  navigation={null}
                  Title={"UPI Withdrawal"}
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
                  Usually takes 24 Hr to complete
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
                  backgroundColor: COLORS.lightGray2,
                  color: COLORS.black
                }}
                placeholder='Enter Upi Id'
                placeholderTextColor={COLORS.gray}
                keyboardType="default"
                autoCapitalize="none"
                maxLength={40}
                onChangeText={(Value) => {
                  const text = Value.replace(/\s{2,}/g, ' ').trim()
                  setUPI_Id(text)
                }}
              />
              <TextInput
                style={{
                  marginTop: 10,
                  height: 55,
                  alignSelf: 'center',
                  width: '90%',
                  paddingLeft: 25,
                  justifyContent: "center",
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.lightGray2,
                  color: COLORS.black
                }}
                placeholder='Enter Amount'
                placeholderTextColor={COLORS.gray}
                keyboardType="numeric"
                autoCapitalize="none"
                maxLength={3}
                onChangeText={(text) => {
                  if (parseInt(text)) {
                    setWithdrawlsAmount(parseInt(text))
                  } else {
                    setWithdrawlsAmount(0)
                  }
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
                      Alert.alert(
                        "Alert",
                        `You are Withrawing ${WithdrawlsAmount} in UPI Id ${UPI_Id}, This Process is Irreversible`,
                        [
                          {
                            text: "Proceed",
                            onPress: () => {
                              setWithdrawlsAmount(0)
                              setUPI_Id('')
                              Create_withdrawls_request_Func(WithdrawlsAmount, UPI_Id)
                            }
                          },
                          {
                            text: "Cancel",
                          },
                        ]
                      );
                    }
                  }
                }}
                disabled={Disable}
                style={{
                  alignSelf: 'center',
                  height: 53,
                  width: '35%',
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 35,
                  marginBottom: 30,
                  borderRadius: SIZES.radius,
                  backgroundColor: Disable
                    ? COLORS.transparentPrimray
                    : COLORS.primary,
                  marginHorizontal: SIZES.padding,
                }}
              >
                {loading ? (
                  <ActivityIndicator size="large" color={COLORS.white} />
                ) : (
                  <Text
                    style={{
                      color: COLORS.white,
                      fontWeight: "bold",
                      fontSize: SIZES.h2,
                    }}
                  >
                    Withdraw
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

export default BottomPopup;

