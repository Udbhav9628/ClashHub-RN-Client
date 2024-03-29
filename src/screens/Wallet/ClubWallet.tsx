import { ActivityIndicator, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useEffect } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from "react-native-vector-icons/Ionicons";
import Heading from '../../components/Heading';
import Icons from '../../constants/Icons';
import { COLORS, Dpheight, SIZES } from '../../constants/Theame';
import TransctionModal from './TransctionModal';
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Get_ClubWallet_Ballance, Clear_Payment_Reducer_Error } from "../../store/Payment/PaymentAction";
import BottomPopup from '../../components/BottomPopup';
import WithdrawModal from './WithdrawModal';

const ClubWallet = ({ navigation }: { navigation: any }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [TempLoading, setTempLoading] = useState(true);
    const [Create_withdrawl, setCreate_withdrawl] = useState(false);
    const [Disable, setDisable] = useState(false);
    const [withdrawlsmodalVisible, setwithdrawlsModalVisible] = useState(false);

    const { loading, sucess, Error, Amount } = useSelector(
        (state: any) => state.ClubWallet_Ballance_reducer
    );

    const dispatch = useDispatch();
    const Get_ClubWallet_Ballance_Func = bindActionCreators(
        Get_ClubWallet_Ballance,
        dispatch
    );
    const Clear_Payment_Reducer_Error_Func = bindActionCreators(
        Clear_Payment_Reducer_Error,
        dispatch
    );

    useFocusEffect(
        React.useCallback(() => {
            Get_ClubWallet_Ballance_Func();
            setTempLoading(false);
        }, [])
    );

    useEffect(() => {
        Clear_Payment_Reducer_Error_Func()
        if (Error) {
            Alert.alert("Error", Error, [{ text: "OK" }]);
        }
    }, [Error])

    return (
        <View style={style.Container}>
            <Heading navigation={navigation} Title={"Club Wallet"} />
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
                            {/* Card hai jhtggg */}
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
                                        Organiser
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
                                            {/* Temporaly Solution */}
                                            {/* &#x20B9; {parseFloat(Amount.Ballance).toFixed(2)} */}
                                            &#x20B9; {(Amount.Ballance)}
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
                                            #Organise&Earn
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
                                            navigation={navigation}
                                            Which_Wallet={"Club"}
                                        />
                                    </View>
                                    <TouchableOpacity onPress={() => {
                                        setModalVisible(true);
                                    }}>
                                        <View style={style.NotificationWrapper}>
                                            <MaterialCommunityIcons
                                                name="bank-transfer"
                                                size={Dpheight(4)}
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
                                {/* WithDraw */}
                                <View style={style.Elevation}>
                                    <BottomPopup
                                        modalVisible={Create_withdrawl}
                                        setModalVisible={setCreate_withdrawl}
                                        MatchId={null}
                                        Amount={Amount.Ballance}
                                        Match_Name={null}
                                        Is_Club_Withdrawal={true}
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
                                        setCreate_withdrawl={setCreate_withdrawl} Is_Club_Withdrawal={true} />
                                    <TouchableOpacity onPress={() => {
                                        setwithdrawlsModalVisible(true)
                                    }}>
                                        <View style={style.NotificationWrapper}>
                                            <MaterialCommunityIcons
                                                name="credit-card-minus"
                                                size={Dpheight(3)}
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
                            </View>
                        </>
                    </>
                )
            )}
        </View>
    )
}

export default ClubWallet

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

