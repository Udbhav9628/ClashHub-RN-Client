import { StyleSheet as RN_Styles, Text, View, Modal, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect } from 'react'
import HeadingComp from '../../components/HeadingComp';
import Icon from "react-native-vector-icons/Feather";
import { SIZES, COLORS, Dpheight, DPwidth } from '../../constants/Theame';
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import StyleSheet from 'react-native-media-query';
import { GetPendingWithdrawls, Clear_Payment_Reducer_Error } from "../../store/Payment/PaymentAction";
import Icons from "react-native-vector-icons/Ionicons";

const WithdrawModal = ({
    modalVisible,
    setModalVisible,
    setCreate_withdrawl,
}: {
    modalVisible: any;
    setModalVisible: any;
    setCreate_withdrawl: any;
}) => {
    const { PWloading, Pending_Withdrawls, Error } = useSelector(
        (state: any) => state.PendingWithdrawls_Reducer
    );

    const dispatch = useDispatch();
    const GetPendingWithdrawls_Func = bindActionCreators(
        GetPendingWithdrawls,
        dispatch
    );
    const Clear_Payment_Reducer_Error_Func = bindActionCreators(
        Clear_Payment_Reducer_Error,
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

    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={style.Container}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 12
                }}>
                    <HeadingComp
                        navigation={null}
                        Title={"All Withdrawals"}
                        ShowViewAll={false}
                        Navigate_to={''}
                        Query={null}
                    />
                    <TouchableOpacity
                        style={{ ...style.HeaderLeft, paddingTop: 4 }}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                            setCreate_withdrawl(true)
                        }}
                    >
                        <Icons name="ios-add-circle-sharp" size={35} color="black" />
                    </TouchableOpacity>
                </View>
                {PWloading ? (<View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>) : Pending_Withdrawls && Pending_Withdrawls.length === 0 ? (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: SIZES.h2,
                                fontWeight: "700",
                            }}
                        >
                            No Data Available
                        </Text>
                    </View>) : (<>
                        <View style={{
                            marginTop: 10,
                            marginBottom: 50
                        }}>
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
                                                        height: Dpheight(4),
                                                        width: 30,
                                                        marginLeft: 4,
                                                        justifyContent: "center",
                                                        borderRadius: SIZES.radius,
                                                    }}
                                                >
                                                    <Icon name="arrow-up-left" size={20} color="#000" />
                                                </View>
                                                <View>
                                                    <Text
                                                        style={{
                                                            ...style.NotificationText,
                                                            color: COLORS.black,
                                                        }}
                                                    >
                                                        {item.Message} {item.Status}
                                                    </Text>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 2 }}>
                                                        <Text style={{ ...styles.NotificationText2, marginRight: '5%' }}>UPI {item.UPI_Id}</Text>
                                                        <Text style={{ ...styles.NotificationText2, marginRight: '5%' }}>{item.Status}</Text>
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
                        </View></>)}
            </View>
        </Modal >
    )
}

export default WithdrawModal

const style = RN_Styles.create({
    Container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    Elevation: {
        // borderRadius: SIZES.radius,
        elevation: 1,
        marginVertical: 10,
        margin: SIZES.padding,
        //For Ios Only -- SHOWdow code
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
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
        fontSize: SIZES.h3,
        fontWeight: "bold",
    },
    Value: {
        position: "absolute",
        top: 17,
        right: 15,
    },
    ValueText: {
        fontSize: SIZES.body4,
        fontWeight: "bold",
        color: COLORS.black,
    },
    HeaderLeft: {
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 80,
        paddingRight: 18,
    },
});

const { styles } = StyleSheet.create({
    Title: {
        fontSize: SIZES.body5,
        fontWeight: "bold",
        color: COLORS.black,
        '@media (min-height:  805.8181818181819)': {
            fontSize: SIZES.body4,
            fontWeight: "bold",
            color: COLORS.black,
        },
    },
    NotificationText2: {
        fontSize: 10,
        fontWeight: "600",
        color: COLORS.gray,
        '@media (min-height:  805.8181818181819)': {
            fontSize: SIZES.h5,
            fontWeight: "600",
            color: COLORS.gray,
        },
    },
    Amount: {
        fontSize: SIZES.body5,
        fontWeight: "bold",
        color: COLORS.black,
        '@media (min-height:  805.8181818181819)': {
            fontSize: SIZES.body4,
            fontWeight: "bold",
            color: COLORS.black
        },
    },
})