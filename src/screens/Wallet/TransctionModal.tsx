import { StyleSheet, Text, View, Modal, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import HeadingComp from '../../components/HeadingComp';
import Icon from "react-native-vector-icons/Ionicons";
import { PaymentData } from '../../constants/Data';
import { SIZES, COLORS } from '../../constants/Theame';

const TransctionModal = ({
    modalVisible,
    setModalVisible,
    navigation,
}: {
    modalVisible: any;
    setModalVisible: any;
    navigation: any;
}) => {
    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={style.Container}>
                <HeadingComp
                    navigation={null}
                    Title={"All Transctions"}
                    ShowViewAll={false}
                    Navigate_to={''}
                    Query={null}
                />
                <View>
                    <FlatList
                        data={PaymentData}
                        keyExtractor={(Item) => `${Item.id}`}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }: { item: any }) => (
                            <View style={style.Elevation}>
                                <TouchableOpacity key={item.key}>
                                    <View style={style.NotificationWrapper}>
                                        <View
                                            style={{
                                                height: 40,
                                                width: 40,
                                                marginRight: 5,
                                                justifyContent: "center",
                                                borderRadius: SIZES.radius,
                                            }}
                                        >
                                            <Icon name="card" size={24} color="#000" />
                                        </View>
                                        <View>
                                            <Text
                                                style={{
                                                    ...style.NotificationText,
                                                    color: COLORS.black,
                                                }}
                                            >
                                                {item.Name}
                                            </Text>
                                            <Text style={style.NotificationText2}>{item.Time}</Text>
                                        </View>
                                        <View style={style.Value}>
                                            <Text
                                                style={{ ...style.ValueText, color: COLORS.black }}
                                            >
                                                &#x20B9;{item.Value}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
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
        lineHeight: 30,
        fontSize: 17,
        fontWeight: "bold",
    },
    NotificationText2: {
        fontSize: 13,
        fontWeight: "600",
        color: COLORS.gray,
    },
    Value: {
        position: "absolute",
        top: 10,
        right: 15,
    },
    ValueText: {
        fontSize: 13,
        fontWeight: "bold",
        color: COLORS.black,
    },
});