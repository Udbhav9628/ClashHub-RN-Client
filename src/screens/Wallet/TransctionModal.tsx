import { StyleSheet, Text, View, Modal, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import HeadingComp from '../../components/HeadingComp';
import Icon from "react-native-vector-icons/Feather";
import { SIZES, COLORS } from '../../constants/Theame';
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { GetUserTransaction } from "../../store/Payment/PaymentAction";

const TransctionModal = ({
    modalVisible,
    setModalVisible,
    navigation,
}: {
    modalVisible: any;
    setModalVisible: any;
    navigation: any;
}) => {

    const dispatch = useDispatch();
    const GetUserTransaction_Func = bindActionCreators(
        GetUserTransaction,
        dispatch
    );

    const { loading, sucess, Error, Transactions } = useSelector(
        (state: any) => state.Transaction_Reducer
    );

    useEffect(() => {
        if (modalVisible) {
            GetUserTransaction_Func();
        }
    }, [modalVisible])

    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={style.Container}>
                {loading ? (<View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>) : (<>
                    <View style={{ marginTop: 12 }}>
                        <HeadingComp
                            navigation={null}
                            Title={"All Transctions"}
                            ShowViewAll={false}
                            Navigate_to={''}
                            Query={null}
                        />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <FlatList
                            data={Transactions}
                            keyExtractor={(Item) => `${Item._id}`}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }: { item: any }) => (
                                <View style={style.Elevation}>
                                    <TouchableOpacity>
                                        <View style={style.NotificationWrapper}>
                                            <View
                                                style={{
                                                    height: 40,
                                                    width: 40,
                                                    marginLeft: 4,
                                                    justifyContent: "center",
                                                    borderRadius: SIZES.radius,
                                                }}
                                            >
                                                <Icon name={item.Type ? "arrow-down-right" : "arrow-down-left"} size={20} color="#000" />
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
                                                    <Text style={{ ...style.NotificationText2, marginRight: '5%' }}>{new Date(item.Date).toDateString()}</Text>
                                                    <Text style={style.NotificationText2}>{new Date(item.Date).toLocaleTimeString().slice(0, 5)}</Text>
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

export default TransctionModal

const style = StyleSheet.create({
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