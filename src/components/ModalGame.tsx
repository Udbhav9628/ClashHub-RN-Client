import { StyleSheet, View, Modal, FlatList, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SIZES, COLORS, Dpheight, DPwidth } from "../constants/Theame";
import HeadingComp from './HeadingComp';
import { GamesTypesData } from "../constants/Data";

const ModalGame = ({
    modalVisible,
    setModalVisible,
    Selectected_Game
}: {
    modalVisible: any;
    setModalVisible: any;
    Selectected_Game: any;
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.modalView}>
                <HeadingComp
                    navigation={null}
                    Title={"Select Game"}
                    ShowViewAll={false}
                    Navigate_to={""}
                    Query={null}
                />
                <View style={styles.Container}>
                    <FlatList
                        horizontal
                        data={GamesTypesData}
                        keyExtractor={(Item) => `${Item.id}`}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <View
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginRight:
                                        index === GamesTypesData.length - 1 ? SIZES.padding : 0,
                                }}
                            >
                                <TouchableOpacity
                                    style={styles.Elevation}
                                    onPress={() => {
                                        if ((item.id !== 6)) {
                                            Selectected_Game(item.Query)
                                            setModalVisible(false)
                                        } else {
                                            Alert.alert("Message", "More Exciting Games Coming soon", [
                                                {
                                                    text: "OK",
                                                },
                                            ]);
                                        }
                                    }}
                                >
                                    <View style={styles.NotificationWrapper}>
                                        <Image source={item.image} style={styles.Image} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            </View>
        </Modal>
    )
}

export default ModalGame

const styles = StyleSheet.create({
    Container: {
        backgroundColor: COLORS.white,
        marginTop: 2,
    },
    modalView: {
        position: "absolute",
        bottom: 2,
        left: 2,
        right: 2,
        height: Dpheight(27),
        backgroundColor: "white",
        borderRadius: SIZES.radius,
        padding: 1,
        shadowColor: COLORS.black,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    Elevation: {
        backgroundColor: "white",
        borderRadius: SIZES.radius,
        elevation: 1,
        marginVertical: 8,
        marginLeft: SIZES.padding,
        //For Ios Only -- SHOWdow code
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    NotificationWrapper: {
        height: Dpheight(17.3),
        width: DPwidth(38.2),
    },
    Image: {
        height: Dpheight(17.3),
        width: DPwidth(38.2),
        borderRadius: SIZES.radius,
    },
})