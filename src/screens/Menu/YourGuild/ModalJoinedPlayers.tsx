import { StyleSheet, Text, View, Modal, FlatList, TextInput, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect } from "react";
import { COLORS, SIZES, FONTS } from "../../../constants/Theame";
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
                console.log(Duplicate_Match);
            } else {
                console.log('User Not Found');
            }
        } else {
            console.log('Match Not Found');
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
                Alert.alert("Alert", 'This Process is Ireversible , Check All Player Kills before Publish', [
                    {
                        text: "Cancel",
                    },
                    {
                        text: "Publish",
                        onPress: () => {
                            Update_Match_Function(Match_in_Function, Match_in_Function._id)
                        },
                    },
                ]);
            }
        } else {
            console.log('Match is Not Available');
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
                        {Match.Is_Finished ? ("Match Result") : ("Enter Player Kills")}
                    </Text>
                </View>
            </View>
            <View style={styles.Container}>
                {Joined_User != 0 ? (<>
                    <View style={{ backgroundColor: COLORS.primary, marginTop: 10, paddingVertical: 10, borderTopRightRadius: SIZES.radius, borderTopLeftRadius: SIZES.radius, }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: SIZES.padding }}>
                            <View style={{
                                alignItems: 'flex-start',
                                width: 150
                            }}>
                                <Text style={{
                                    color: COLORS.white,
                                    ...FONTS.h2,
                                    fontWeight: "900",
                                }}>Name</Text>
                            </View>
                            <View style={{
                                alignItems: 'center',

                                width: 57
                            }}>
                                <Text style={{
                                    color: COLORS.white,
                                    ...FONTS.h2,
                                    fontWeight: "900",
                                }}>Kills</Text>
                            </View>
                            {Match.Is_Finished && <View style={{
                                alignItems: 'center',
                                width: 70
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

                                            width: 150
                                        }}>
                                            <Text style={{
                                                color: COLORS.black,
                                                ...FONTS.body3,
                                                // fontWeight: "700",
                                            }}>{item.UserName}</Text>
                                        </View>

                                        {Match.Is_Finished ? (<View style={{
                                            marginTop: 6,
                                            alignItems: 'center',

                                            width: 58
                                        }}><Text style={{
                                            color: COLORS.black,
                                            ...FONTS.body3,
                                        }}>{item.Kills}</Text></View>) : (<View style={{
                                            height: 40,
                                        }}>
                                            <TextInput
                                                style={{ borderColor: COLORS.black }}
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
                                        {Match.Is_Finished && <View style={{
                                            marginTop: 6,
                                            alignItems: 'center',
                                            width: 70
                                        }}>
                                            <Text style={{
                                                color: COLORS.black,
                                                ...FONTS.body3,
                                                // fontWeight: "700",
                                            }}>{Match.Prize_Pool * item.Kills}</Text>
                                        </View>}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                    {!Match.Is_Finished ? (
                        <TouchableOpacity
                            onPress={() => {
                                Publish_Result(Duplicate_Match)
                            }}
                            style={{
                                height: 50,
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: SIZES.padding,
                                marginBottom: SIZES.padding,
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.primary,
                                marginHorizontal: 100,
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
                        </TouchableOpacity>) : (
                        ShowReportButton && (<>
                            <TouchableOpacity
                                style={{
                                    height: 30,
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
                            </Text></>))}
                </>) : (<View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "700",
                        }}
                    >
                        No Joined Players
                    </Text>
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