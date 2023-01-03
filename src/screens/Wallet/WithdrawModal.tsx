import { StyleSheet as RN_Styles, Text, View, Modal, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import HeadingComp from '../../components/HeadingComp';
import Icon from "react-native-vector-icons/Feather";
import { SIZES, COLORS, Dpheight } from '../../constants/Theame';
import StyleSheet from 'react-native-media-query';
import Icons from "react-native-vector-icons/Ionicons";
import { Return_Token } from '../../utils/Utils';
import { Ip_Address } from '../../constants/Data';
import axios from 'axios';

const WithdrawModal = ({
    modalVisible,
    setModalVisible,
    setCreate_withdrawl,
    Is_Club_Withdrawal
}: {
    modalVisible: any;
    setModalVisible: any;
    setCreate_withdrawl: any;
    Is_Club_Withdrawal: Boolean;
}) => {
    const [Data, setData] = useState([] as Array<any>);
    const [Loading, setLoading] = useState(true);
    const [Page, setPage] = useState(1);
    const [Data_Length, setData_Length] = useState(0);

    async function Fetch_Data(Page: Number, Is_Club: Boolean) {
        try {
            const Token: string = (await Return_Token(
                null,
                null,
            )) as string;
            const Address = Is_Club
                ? 'getAll_Club_Wallet_Withdrawrequest'
                : 'getAll_Gamer_Wallet_Withdrawrequest';
            const response = await axios.get(`${Ip_Address}/${Address}?Page=${Page}`,
                {
                    headers: {
                        'content-type': 'application/json',
                        Accept: 'application/json',
                        authToken: Token,
                    },
                },
            );
            if (Data.length > 0) {
                setData([...Data, ...response.data])
            } else {
                setData(response.data)
            }
            setLoading(false)
            setData_Length(response.data.length);
        } catch (error: any) {
            Alert.alert("Error", error.message, [
                {
                    text: "OK",
                },
            ]);
        }
    }

    function WhenEndReached() {
        if (Data_Length === 10) {
            Fetch_Data(Page + 1, Is_Club_Withdrawal);
            setPage((Previous) => Previous + 1);
        }
    }

    useEffect(() => {
        if (modalVisible) {
            Fetch_Data(1, Is_Club_Withdrawal);
        }
        return () => {
            if (modalVisible) {
                setPage(1)
                setLoading(true)
                setData([] as Array<any>)
                setData_Length(0)
            }
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
                {Loading ? (<View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>) : Data && Data.length === 0 ? (
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
                                data={Data}
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
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 }}>
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
                                onEndReached={() => {
                                    WhenEndReached();
                                }}
                                onEndReachedThreshold={0.1}
                                ListFooterComponent={(<View>
                                    {Data_Length === 10 && <View
                                        style={{
                                            marginVertical: 16,
                                            alignItems: "center",
                                        }}
                                    >
                                        <ActivityIndicator size="large" color={COLORS.primary} />
                                    </View>}
                                </View>)}
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