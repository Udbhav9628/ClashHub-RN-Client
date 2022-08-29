import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, DPwidth, FONTS, SIZES } from '../../constants/Theame';
import Icon from "react-native-vector-icons/Ionicons";

const JoinedUserModal = ({
    modalVisible,
    setModalVisible,
    navigation,
    Joined_User,
    Match
}: {
    modalVisible: any;
    setModalVisible: any;
    navigation: any;
    Joined_User: any;
    Match: any;
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
                        Participants
                    </Text>
                </View>
                <View style={styles.Container}>
                    {Joined_User != 0 ? (<>
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
                                {Match && Match.Match_Status === 'Completed' && <View style={{
                                    alignItems: 'center',
                                    width: DPwidth(18)
                                }}>
                                    <Text style={{
                                        color: COLORS.white,
                                        ...FONTS.h2,
                                        fontWeight: "900",
                                    }}>Kills</Text>
                                </View>}
                                {Match && Match.Match_Status === 'Completed' && <View style={{
                                    alignItems: 'center',
                                    width: DPwidth(18)
                                }}>
                                    <Text style={{
                                        color: COLORS.white,
                                        ...FONTS.h2,
                                        fontWeight: "900",
                                    }}>Earning</Text>
                                </View>}
                            </View>
                        </View>
                        <FlatList
                            data={Joined_User}
                            keyExtractor={(Item) => `${Item._id}`}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity onPress={() => {
                                    setModalVisible(!modalVisible);
                                    navigation.navigate("SpecificUserProfile", {
                                        UserId: item.UserId,
                                    })
                                }}>
                                    <View style={{ backgroundColor: index % 2 === 0 ? COLORS.lightGray2 : COLORS.white, paddingVertical: 10, borderBottomRightRadius: index === Joined_User.length - 1 ? SIZES.radius : 0, borderBottomLeftRadius: index === Joined_User.length - 1 ? SIZES.radius : 0, }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: SIZES.padding }}>
                                            <View style={{
                                                marginTop: 6,
                                                alignItems: 'flex-start',

                                                width: DPwidth(38)
                                            }}>
                                                <Text style={{
                                                    color: COLORS.black,
                                                    ...FONTS.body3,
                                                }}>{item.InGameName}</Text>
                                                <Text style={{
                                                    color: COLORS.gray,
                                                    ...FONTS.body4,
                                                }}>{item.UserName}</Text>
                                            </View>

                                            {Match && Match.Match_Status === 'Completed' && (<View style={{
                                                marginTop: 6,
                                                alignItems: 'center',

                                                width: DPwidth(18)
                                            }}><Text style={{
                                                color: COLORS.black,
                                                ...FONTS.body3,
                                            }}>{item.Kills}</Text></View>)}
                                            {Match && Match.Match_Status === 'Completed' && <View style={{
                                                marginTop: 6,
                                                alignItems: 'center',
                                                width: DPwidth(18)
                                            }}>
                                                <Text style={{
                                                    color: COLORS.black,
                                                    ...FONTS.body3,
                                                }}>{Match && Match.Perkill_Prize * item.Kills}</Text>
                                            </View>}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                        {/* Report Button */}
                        {/* <View>
                            <TouchableOpacity
                                style={{
                                    height: Dpheight(5),
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: SIZES.padding,
                                    marginBottom: SIZES.base,
                                    borderRadius: SIZES.radius,
                                    backgroundColor: COLORS.lightGray1,
                                    marginHorizontal: 130,
                                }}
                            >
                                <Text
                                    style={{
                                        color: COLORS.black,
                                        fontWeight: "bold",
                                        fontSize: SIZES.body3,
                                    }}
                                >
                                    Report
                                </Text>
                            </TouchableOpacity>
                            <Text
                                style={{
                                    marginBottom: 5,
                                    color: COLORS.darkGray,
                                    fontSize: SIZES.body5,
                                    textAlign: 'center'
                                }}
                            >
                                You Can Report If have Problem With Your Shown Kills
                            </Text>
                        </View> */}
                    </>) : (<View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: SIZES.h3,
                                fontWeight: "700",
                            }}
                        >
                            No Joined Players
                        </Text>
                    </View>)}
                </View>
            </View>
        </Modal>
    )
}

export default JoinedUserModal

const styles = StyleSheet.create({
    Container: {
        backgroundColor: COLORS.white,
        padding: 15,
    },
    CrossSign: { position: "absolute", top: 15, left: 20, zIndex: 999 },
})