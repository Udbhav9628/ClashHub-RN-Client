import { ActivityIndicator, Alert, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, Dpheight, FONTS, SIZES } from '../../../constants/Theame';
import ModalCross from '../../../components/ModalCross';

const PicModal = ({
    modalVisible,
    setModalVisible,
    Club_Id,
    loading,
    ChangePicFunction
}: {
    modalVisible: boolean;
    setModalVisible: Function;
    Club_Id: any,
    loading: boolean;
    ChangePicFunction: Function;
}) => {
    const [PicString, setPicString] = useState('')

    function ReturnImage() {
        return (<Image
            style={{
                width: "100%",
                height: "100%",
            }}
            loadingIndicatorSource={{ uri: `https://cdn.dribbble.com/users/2346349/screenshots/9246147/loading.gif` }}
            source={{ uri: `https://api.multiavatar.com/${PicString || "hu"}.png` }}
        />)
    }
    useEffect(() => {
        ReturnImage()
    }, [PicString])

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
                height: 400,
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
                            marginBottom: 20,
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
                                Change Profile Picture
                            </Text>
                        </View>
                        <View style={{
                            alignSelf: 'center',
                            width: 60,
                            height: 60,
                            borderRadius: 50,
                            marginBottom: 10,
                            backgroundColor: COLORS.black
                        }}>
                            {ReturnImage()}
                        </View>
                        <View style={{
                            paddingHorizontal: 10
                        }}>
                            <View style={{
                                height: 58,
                                flexDirection: "row",
                                paddingHorizontal: SIZES.padding,
                                marginTop: SIZES.base,
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.lightGray2,
                            }}>
                                <TextInput
                                    style={{
                                        width: "100%",
                                        height: 58,
                                        color: COLORS.black
                                    }}
                                    keyboardType="default"
                                    defaultValue={PicString}
                                    placeholder={"Enter Anything and Pic Would Change"}
                                    placeholderTextColor={COLORS.gray}
                                    maxLength={50}
                                    onChangeText={(Value) => {
                                        const text = Value.replace(/\s{2,}/g, ' ').trim()
                                        setPicString(text)
                                    }}
                                />
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                if (PicString === "") {
                                    Alert.alert("Alert", "Enter Anything First", [{ text: "OK" }]);
                                }
                                else {
                                    const Data = {
                                        Club_Id,
                                        PicString
                                    }
                                    ChangePicFunction(Data)
                                }
                            }}
                            disabled={loading}
                            style={{
                                alignSelf: 'center',
                                height: 53,
                                width: '35%',
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: SIZES.padding,
                                marginBottom: 30,
                                borderRadius: SIZES.radius,
                                backgroundColor: loading
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
                                    Set
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default PicModal;