import { StyleSheet, Text, View, Modal, FlatList, TextInput, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect } from "react";
import { COLORS, SIZES, FONTS, Dpheight, DPwidth } from "../../../constants/Theame";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Update_Match, Clear_Match_Reducer_Error, Clear_Match_Reducer_Sucess } from "../../../store/Match/Matchaction";
import Icon from "react-native-vector-icons/Ionicons";

const ModalJoinedPlayers = ({
    modalVisible,
    setModalVisible,
    navigation,
    Joined_User,
    Match,
    ShowReportButton
}: {
    modalVisible: any;
    setModalVisible: any;
    navigation: any;
    Joined_User: any;
    Match: any
    ShowReportButton: Boolean
}) => {

    let Duplicate_Match = JSON.parse(JSON.stringify(Match));

    const dispatch = useDispatch();
    const Update_Match_Function = bindActionCreators(Update_Match, dispatch);

    const Clear_Match_Error = bindActionCreators(
        Clear_Match_Reducer_Error,
        dispatch
    );

    const Clear_Match_Sucess = bindActionCreators(
        Clear_Match_Reducer_Sucess,
        dispatch
    );

    function Push_In_Array(Duplicate_Match: any, Data: any) {
        if (Duplicate_Match) {
            let User = Duplicate_Match.Joined_User.find(
                (Element: any) => Element._id === Data.Id,
            );
            if (User) {
                User.Kills = Data.Kills;
            }
        }
    }

    function Publish_Result(Match_in_Function: any) {
        if (Match_in_Function) {
            const User = Match_in_Function.Joined_User.find(
                (Element: any) => Element.Kills === null
            );
            if (User) {
                Alert.alert("Message", `Update ${User.UserName}'s Kills First`, [
                    {
                        text: "OK",
                    },
                ]);
            } else {
                let Total_Kills = 0;
                Match_in_Function.Joined_User.forEach((data: any) => {
                    Total_Kills = Total_Kills + Number(data.Kills)
                });

                if ((Match.Joined_User.length > 0) && (Total_Kills > (Match.Joined_User.length - 1))) {
                    Alert.alert("Message", `Total kill of All Players Combined can't be more then ${(Match.Joined_User.length - 1)} , Cross Check All players Entered Kills Once Again`, [
                        {
                            text: "OK",
                        },
                    ]);
                } else {
                    Alert.alert("Alert", 'This Process is Ireversible , Check All Player Kills before Publishing Results', [
                        {
                            text: "Cross Check Again",
                        },
                        {
                            text: "Publish Result",
                            onPress: () => {
                                Update_Match_Function(Match_in_Function, Match_in_Function._id)
                            },
                        },
                    ]);
                }
            }
        }
    }

    const { Error, Sucess, Sucess_Responce } = useSelector(
        (state: any) => state.Update_Match_Result_Reducer
    );

    useEffect(() => {
        if (Sucess) {
            Clear_Match_Sucess();
            Alert.alert("Alert", Sucess_Responce, [
                {
                    text: "OK",
                    onPress: () => {
                        navigation.navigate("YourGuild");
                    },
                },
            ]);
        }
    }, [Sucess]);

    useEffect(() => {
        if (Error) {
            Clear_Match_Error()
            Alert.alert("Error", Error + " , Try Again", [
                {
                    text: "OK",
                },
            ]);
        }
    }, [Error]);

    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            {/* Header */}
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
                        }}
                    >
                        {/* Correct This */}
                        {Match.Match_Status === 'Completed' ? ("Match Result") : ("Enter Player Kills")}
                    </Text>
                </View>
            </View>
            <View style={styles.Container}>
                {Joined_User != 0 ? (
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
                                <View style={{
                                    alignItems: 'center',

                                    width: DPwidth(18)
                                }}>
                                    <Text style={{
                                        color: COLORS.white,
                                        ...FONTS.h2,
                                        fontWeight: "900",
                                    }}>Kills</Text>
                                </View>
                                {Match.Match_Status === 'Completed' && <View style={{
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
                                    <View style={{ backgroundColor: index % 2 === 0 ? COLORS.lightGray2 : COLORS.lightGray1, paddingVertical: 10, borderBottomRightRadius: index === Joined_User.length - 1 ? SIZES.radius : 0, borderBottomLeftRadius: index === Joined_User.length - 1 ? SIZES.radius : 0, }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: SIZES.padding }}>
                                            <View style={{
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

                                            {Match.Match_Status === 'Completed' ? (<View style={{
                                                alignItems: 'center',
                                                width: DPwidth(18)
                                            }}><Text style={{
                                                color: COLORS.black,
                                                ...FONTS.body3,
                                            }}>{item.Kills}</Text></View>) : (<View style={{
                                                height: Dpheight(7),
                                            }}>
                                                <TextInput
                                                    style={{ borderColor: COLORS.black, color: COLORS.black }}
                                                    placeholder='Enter Kill'
                                                    placeholderTextColor={COLORS.gray}
                                                    keyboardType="number-pad"
                                                    maxLength={2}
                                                    textAlign="center"
                                                    onChangeText={(text) => {
                                                        const Kill_to_update = text ? text : null
                                                        const Data = {
                                                            Id: item._id,
                                                            TournamentId: Duplicate_Match._id,
                                                            Kills: Kill_to_update,
                                                        }
                                                        Push_In_Array(Duplicate_Match, Data)
                                                    }}
                                                />
                                            </View>)}
                                            {Match.Match_Status === 'Completed' && <View style={{
                                                alignItems: 'center',
                                                width: DPwidth(18)
                                            }}>
                                                <Text style={{
                                                    color: COLORS.black,
                                                    ...FONTS.body3,
                                                }}>{Match.Perkill_Prize * item.Kills}</Text>
                                            </View>}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                        {Match.Match_Status !== 'Completed' && (
                            <TouchableOpacity
                                onPress={() => {
                                    Publish_Result(Duplicate_Match)
                                }}
                                style={{
                                    position: "absolute",
                                    bottom: 0,
                                    width: '95%',
                                    height: Dpheight(7),
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: SIZES.padding,
                                    marginBottom: SIZES.padding,
                                    borderRadius: SIZES.radius,
                                    backgroundColor: COLORS.primary,
                                    marginHorizontal: SIZES.padding,
                                }}
                            >
                                <Text
                                    style={{
                                        color: COLORS.white,
                                        fontWeight: "bold",
                                        fontSize: SIZES.body3,
                                    }}
                                >
                                    Publish Result
                                </Text>
                            </TouchableOpacity>)}
                    </>) : (
                    <View
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
                        {Match.Match_Status !== 'Completed' && (
                            <TouchableOpacity
                                onPress={() => {
                                    Publish_Result(Duplicate_Match)
                                }}
                                style={{
                                    position: "absolute",
                                    bottom: 0,
                                    width: '100%',
                                    height: Dpheight(7),
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: SIZES.padding,
                                    marginBottom: SIZES.padding,
                                    borderRadius: SIZES.radius,
                                    backgroundColor: COLORS.primary,
                                    marginHorizontal: SIZES.padding,
                                }}
                            >
                                <Text
                                    style={{
                                        color: COLORS.white,
                                        fontWeight: "bold",
                                        fontSize: SIZES.body3,
                                    }}
                                >
                                    End Match
                                </Text>
                            </TouchableOpacity>)}
                    </View>)}
            </View>
        </Modal>
    )
}

export default ModalJoinedPlayers

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 15,
    },
    CrossSign: { position: "absolute", top: 15, left: 20, zIndex: 999 },
})