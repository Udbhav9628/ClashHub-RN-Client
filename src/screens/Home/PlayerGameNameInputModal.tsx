import { ActivityIndicator, Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { COLORS, Dpheight, FONTS, SIZES } from '../../constants/Theame';
import FormInput from '../Auth/FormInput';
import ModalCross from '../../components/ModalCross';
import How_To_Find_Username from '../../components/How_To_Find_Username';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PlayerGameNameInputModal = ({
    modalVisible,
    setModalVisible,
    MatchId,
    MatchType,
    Disable,
    setDisable,
    loading,
    JoinMatchFunction,
}: {
    modalVisible: any;
    setModalVisible: any;
    MatchId: any;
    MatchType: string;
    Disable: any;
    setDisable: any;
    loading: any;
    JoinMatchFunction: Function;
}) => {
    const [InGameName, setInGameName] = useState('');
    const [FindUserName_Moadal, setFindUserName_Moadal] = useState(false);

    async function ReturnDefaultUserName() {
        console.log('in username');
        try {
            let UserName = await AsyncStorage.getItem(MatchType);
            setInGameName(UserName || '');
        } catch (error) {
            setInGameName('');
        }
    }

    useEffect(() => {
        ReturnDefaultUserName()
    }, [])

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={{
                position: "absolute",
                bottom: -8,
                left: 2,
                right: 2,
                margin: 20,
                height: 330,
                backgroundColor: "white",
                borderRadius: SIZES.radius,
                shadowColor: COLORS.black,
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
            }}>
                <ModalCross setModalVisible={setModalVisible} />
                <View style={{
                    marginTop: 60,
                }}>
                    <View>
                        <View style={{
                            alignItems: 'center',
                        }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    width: '100%',
                                    ...FONTS.h2,
                                    fontWeight: "700",
                                    color: COLORS.black,
                                }}
                            >
                                Enter {MatchType} UserName
                            </Text>
                        </View>
                        <View>
                            <How_To_Find_Username modalVisible={FindUserName_Moadal} setModalVisible={setFindUserName_Moadal} MatchType={MatchType} />
                            <TouchableOpacity
                                style={{
                                    padding: 10
                                }}
                                onPress={() => {
                                    setFindUserName_Moadal(true)
                                }}>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        width: '100%',
                                        ...FONTS.h3,
                                        fontWeight: "600",
                                        color: COLORS.primary,
                                    }}
                                >
                                    How To Find ?
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            paddingHorizontal: 10
                        }}>
                            <View style={{
                                height: Dpheight(7),
                                flexDirection: "row",
                                paddingHorizontal: SIZES.padding,
                                marginTop: SIZES.base,
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.lightGray2,
                            }}>
                                <TextInput
                                    style={{
                                        width: "100%",
                                        height: Dpheight(7),
                                        color: COLORS.black
                                    }}
                                    keyboardType="default"
                                    defaultValue={InGameName}
                                    placeholder={"Ex -  ༄✿Gᴀᴍᴇʀ࿐"}
                                    placeholderTextColor={COLORS.gray}
                                    maxLength={50}
                                    onChangeText={(Value) => {
                                        const text = Value.replace(/\s{2,}/g, ' ').trim()
                                        setInGameName(text)
                                    }}
                                />
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                if (InGameName === "") {
                                    Alert.alert("Alert", "Enter InGame Name Firsr", [{ text: "OK" }]);
                                }
                                else {
                                    Alert.alert("Are You Sure", "You can't Change after Match Joined", [
                                        {
                                            text: "Yes",
                                            onPress: async () => {
                                                setDisable(true)
                                                JoinMatchFunction(MatchId,
                                                    InGameName, MatchId.slice(-2))
                                                await AsyncStorage.setItem(MatchType, InGameName);
                                            },

                                        },
                                        {
                                            text: "Cancel"
                                        }
                                    ]);
                                }
                            }}
                            disabled={Disable}
                            style={{
                                alignSelf: 'center',
                                height: 53,
                                width: '35%',
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: SIZES.padding,
                                marginBottom: 30,
                                borderRadius: SIZES.radius,
                                backgroundColor: Disable
                                    ? COLORS.transparentPrimray
                                    : COLORS.primary,
                                marginHorizontal: SIZES.padding,
                            }}
                        >
                            {loading ? (
                                <ActivityIndicator size="large" color={COLORS.primary} />
                            ) : (
                                <Text
                                    style={{
                                        color: COLORS.white,
                                        fontWeight: "bold",
                                        fontSize: SIZES.h2,
                                    }}
                                >
                                    Join
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default PlayerGameNameInputModal

const styles = StyleSheet.create({
    Container: { backgroundColor: COLORS.white, flex: 1 },
    CrossSign: { position: "absolute", top: 15, left: 20, zIndex: 999 },
});