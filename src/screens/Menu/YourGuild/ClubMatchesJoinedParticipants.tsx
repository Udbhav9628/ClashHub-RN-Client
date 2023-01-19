import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, DPwidth, FONTS, SIZES } from '../../../constants/Theame';
import Icon from "react-native-vector-icons/Ionicons";
import ModalCross from '../../../components/ModalCross';
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserGuild_FollW_Details, Clear_Guild_Reducer_Error } from '../../../store/Guild/GuildAction';

const ClubMatchesJoinedParticipants = ({
    modalVisible,
    setModalVisible,
    navigation,
    Participants
}: {
    modalVisible: any;
    setModalVisible: any;
    navigation: any;
    Participants: any;
}) => {
    const [Data, setData] = useState(Participants);
    const { User } = useSelector((state: any) => state.FetchUser_reducer);
    function OnSearch_Text_Change(text: string) {
        var query = text;
        let expr = new RegExp(query, "i");
        const SearchedPlayers = Participants.filter((elem: any) => expr.test(elem.InGameName));
        setData(SearchedPlayers)
    }

    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View>
                <ModalCross setModalVisible={setModalVisible} />
                <View>
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
                            All Warriors
                        </Text>
                    </View>
                    {/* Search Component */}
                    <View>
                        <View
                            style={{
                                marginTop: SIZES.padding,
                                height: 50,
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginHorizontal: SIZES.padding,
                                marginVertical: SIZES.base,
                                paddingHorizontal: SIZES.radius,
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.lightGray2,
                            }}>
                            <Icon name="search" size={26} color="black" />
                            <TextInput
                                style={{
                                    flex: 1,
                                    marginLeft: SIZES.radius,
                                    fontSize: 16,
                                    lineHeight: 22,
                                }}
                                placeholder={"Search by IGN..."}
                                onChangeText={(Value) => {
                                    OnSearch_Text_Change(Value);
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.Container}>
                        {Data?.length != 0 ? (
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
                                    data={Data}
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
                                            <View style={{ backgroundColor: index % 2 === 0 ? item.UserId === User?.id ? COLORS.transparentPrimray : COLORS.lightGray1 : item.UserId === User?.id ? COLORS.transparentPrimray : COLORS.lightGray2, paddingVertical: 10, borderBottomRightRadius: index === Data.length - 1 ? SIZES.radius : 0, borderBottomLeftRadius: index === Data.length - 1 ? SIZES.radius : 0, }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: SIZES.padding }}>
                                                    <View style={{
                                                        alignItems: 'flex-start',
                                                    }}>
                                                        <Text style={{
                                                            color: COLORS.black,
                                                            ...FONTS.body3,
                                                        }}>{item.FollowersName || `IGN- ${item.InGameName}`}</Text>
                                                        {item.InGameName && <Text style={{
                                                            color: COLORS.gray,
                                                            ...FONTS.body5,
                                                        }}>{item.UserName}</Text>}
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
                                    No Warriors
                                </Text>
                            </View>)}
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ClubMatchesJoinedParticipants

const styles = StyleSheet.create({
    Container: {
        backgroundColor: COLORS.white,
        padding: 15,
    }
})