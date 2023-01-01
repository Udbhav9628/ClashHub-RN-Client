import { StyleSheet as RN_Styles, Text, View, Modal, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeadingComp from '../../components/HeadingComp';
import Icon from "react-native-vector-icons/Feather";
import { SIZES, COLORS, Dpheight, DPwidth } from '../../constants/Theame';
import { useSelector } from "react-redux";
import StyleSheet from 'react-native-media-query';
import { Return_Token } from '../../utils/Utils';
import { Ip_Address } from '../../constants/Data';
import axios from 'axios';

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
    const { Guild_Details } = useSelector(
        (state: any) => state.Get_user_Guild_details_reducer
    );

    const [Data, setData] = useState([] as Array<any>);
    const [Loading, setLoading] = useState(true);
    const [Page, setPage] = useState(1);
    const [Data_Length, setData_Length] = useState(0);

    async function Fetch_Data(Page: Number) {
        try {
            const Token: string = (await Return_Token(
                null,
                null,
            )) as string;
            const response = await axios.get(
                `${Ip_Address}/getUserTransactions?Page=${Page}`,
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

    async function Fetch_Club_Data(Page: Number) {
        try {
            const Token: string = (await Return_Token(
                'Get_All_Matches_Fail',
                null,
            )) as string;
            const response = await axios.get(
                `${Ip_Address}/getClubTransactions/${Guild_Details._id}?Page=${Page}`,
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
            if (Which_Wallet === "Gamer") {
                Fetch_Data(Page + 1);
            } else {
                Fetch_Club_Data(Page + 1)
            }
            setPage((Previous) => Previous + 1);
        }
    }

    useEffect(() => {
        if (modalVisible && Which_Wallet === "Gamer") {
            Fetch_Data(1);
        } else if (modalVisible && Which_Wallet === "Club") {
            Fetch_Club_Data(1)
        }
        return () => {
            if (modalVisible) {
                setPage(1)
                setLoading(true)
                setData([] as Array<any>)
                setData_Length(0)
            }
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
                            No Transaction
                        </Text>
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
                            marginBottom: 60
                        }}>
                            <FlatList
                                data={Data}
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