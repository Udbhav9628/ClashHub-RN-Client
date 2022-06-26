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
import { Get_ClubWallet_Ballance, } from "../../store/Payment/PaymentAction";

const ClubWallet = ({ navigation }: { navigation: any }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [TempLoading, setTempLoading] = useState(true);

    const { loading, sucess, Error, Amount } = useSelector(
        (state: any) => state.ClubWallet_Ballance_reducer
    );

    const dispatch = useDispatch();
    const Get_ClubWallet_Ballance_Func = bindActionCreators(
        Get_ClubWallet_Ballance,
        dispatch
    );

    useFocusEffect(
        React.useCallback(() => {
            Get_ClubWallet_Ballance_Func();
            setTempLoading(false);
        }, [])
    );

    useEffect(() => {
        if (Error) {
            Alert.alert("Error", Error, [{ text: "OK" }]);
        }
    }, [Error])

    return (
        <View style={style.Container}>
            <Heading navigation={navigation} Title={" Club Wallet"} />
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
                                            &#x20B9; {parseFloat(Amount.Ballance).toFixed(2)}
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
                                                size={33}
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
                                                    size={28}
                                                    color="black"
                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {/* Club Wallet */}
                                <View style={style.Elevation}>
                                    <TouchableOpacity onPress={() => navigation.replace('Wallet')}>
                                        <View style={style.NotificationWrapper}>
                                            <MaterialCommunityIcons
                                                name="wallet"
                                                size={26}
                                                color="black"
                                            />
                                            <View style={style.DashboardBox}>
                                                <Text style={style.NotificationText}>Gamer Wallet</Text>
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
                                                    size={28}
                                                    color="black"
                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {/* Withdraw Money */}
                                <View style={style.Elevation}>
                                    <TouchableOpacity>
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
                                                    size={28}
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
        fontSize: SIZES.Size4,
        fontWeight: "bold",
    },
});

