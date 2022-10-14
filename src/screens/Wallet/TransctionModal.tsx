import { StyleSheet as RN_Styles, Text, View, Modal, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import HeadingComp from '../../components/HeadingComp';
import Icon from "react-native-vector-icons/Feather";
import { SIZES, COLORS, Dpheight, DPwidth } from '../../constants/Theame';
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { GetUserTransaction, GetClubTransaction } from "../../store/Payment/PaymentAction";
import StyleSheet from 'react-native-media-query';

const TransctionModal = ({
    modalVisible,
    setModalVisible,
    navigation,
    Which_Wallet
}: {
    modalVisible: any;
    setModalVisible: any;
    navigation: any;
    Which_Wallet: String;
}) => {

    const dispatch = useDispatch();
    const GetUserTransaction_Func = bindActionCreators(
        GetUserTransaction,
        dispatch
    );
    const GetClubTransaction_Func = bindActionCreators(
        GetClubTransaction,
        dispatch
    );

    const { loading, sucess, Error, Transactions } = useSelector(
        (state: any) => state.Transaction_Reducer
    );

    const { Guild_Details } = useSelector(
        (state: any) => state.Get_user_Guild_details_reducer
    );

    useEffect(() => {
        if (modalVisible && Which_Wallet === "Gamer") {
            GetUserTransaction_Func();
        } else if (modalVisible && Which_Wallet === "Club") {
            GetClubTransaction_Func(Guild_Details._id)
        }
    }, [modalVisible, Which_Wallet])

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
                    <View style={{
                        marginTop: 10,
                        marginBottom: 50
                    }}>
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
                                                    height: Dpheight(8.7),
                                                    width: DPwidth(8),
                                                    marginLeft: 4,
                                                    justifyContent: "center",
                                                    borderRadius: SIZES.radius,
                                                }}
                                            >
                                                <Icon name={item.Type ? "arrow-down-right" : "arrow-up-left"} size={Dpheight(2.5)} color="#000" />
                                            </View>
                                            <View>
                                                <Text
                                                    style={styles.Title}
                                                >
                                                    {item.Message}
                                                </Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ ...styles.NotificationText2, marginRight: '5%' }}>{new Date(item.Date).toDateString()}</Text>
                                                    <Text style={styles.NotificationText2}>{new Date(item.Date).toLocaleTimeString().slice(0, 5)}</Text>
                                                </View>
                                            </View>
                                            <View style={style.Value}>
                                                <Text
                                                    style={styles.Amount}
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
    Value: {
        position: "absolute",
        top: 17,
        right: 15,
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