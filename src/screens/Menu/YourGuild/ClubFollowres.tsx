import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, DPwidth, FONTS, SIZES } from '../../../constants/Theame';
import Icon from "react-native-vector-icons/Ionicons";

const ClubFollowres = ({
    modalVisible,
    setModalVisible,
    navigation,
    Followers,
}: {
    modalVisible: any;
    setModalVisible: any;
    navigation: any;
    Followers: any;
}) => {
    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View>
                <View style={styles.CrossSign}>
                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <Icon name="arrow-back" size={28} color="black" />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        marginTop: 13,
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: SIZES.h2,
                            fontWeight: "bold",
                            color: COLORS.black
                        }}
                    >
                        Followers
                    </Text>
                </View>
                <View style={styles.Container}>
                    {Followers.length != 0 ? (
                        <>
                            <View style={{ backgroundColor: COLORS.primary, marginTop: 10, paddingVertical: 10, borderTopRightRadius: SIZES.radius, borderTopLeftRadius: SIZES.radius, }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: SIZES.padding }}>
                                    <View style={{
                                        alignItems: 'flex-start',
                                        width: DPwidth(38)
                                    }}>
                                        <Text style={{
                                            color: COLORS.white,
                                            ...FONTS.h2,
                                            fontWeight: "900",
                                        }}>Name</Text>
                                    </View>
                                </View>
                            </View>
                            <FlatList
                                data={Followers}
                                keyExtractor={(Item) => `${Item._id}`}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity onPress={() => {
                                        setModalVisible(!modalVisible);
                                        navigation.navigate("SpecificUserProfile", {
                                            UserId: item.FollowersId,
                                        })
                                    }}>
                                        <View style={{ backgroundColor: index % 2 === 0 ? COLORS.lightGray2 : COLORS.lightGray1, paddingVertical: 10, borderBottomRightRadius: index === Followers.length - 1 ? SIZES.radius : 0, borderBottomLeftRadius: index === Followers.length - 1 ? SIZES.radius : 0, }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: SIZES.padding }}>
                                                <View style={{
                                                    alignItems: 'flex-start',
                                                }}>
                                                    <Text style={{
                                                        color: COLORS.black,
                                                        ...FONTS.body3,
                                                    }}>{item.FollowersName || item.UserName}</Text>
                                                    {item.InGameName && <Text style={{
                                                        color: COLORS.gray,
                                                        ...FONTS.body4,
                                                    }}>{item.InGameName}</Text>}
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </>) : (<View
                            style={{
                                height: '92%',
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
                                No Followers
                            </Text>
                        </View>)}
                </View>
            </View>
        </Modal>
    )
}

export default ClubFollowres

const styles = StyleSheet.create({
    Container: {
        backgroundColor: COLORS.white,
        padding: 15,
    },
    CrossSign: { position: "absolute", top: 15, left: 20, zIndex: 999 },
})