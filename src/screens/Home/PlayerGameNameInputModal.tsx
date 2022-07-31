import { ActivityIndicator, Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import { COLORS, Dpheight, SIZES } from '../../constants/Theame';
import HeadingComp from '../../components/HeadingComp';
import FormInput from '../Auth/FormInput';

const PlayerGameNameInputModal = ({
    modalVisible,
    setModalVisible,
    MatchId,
    EntryFee,
    Disable,
    setDisable,
    loading,
    JoinMatchFunction,
}: {
    modalVisible: any;
    setModalVisible: any;
    MatchId: any;
    EntryFee: any;
    Disable: any;
    setDisable: any;
    loading: any;
    JoinMatchFunction: Function;
}) => {
    const [InGameName, setInGameName] = useState('')
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
                height: Dpheight(36),
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
                <View style={{
                    marginTop: 30,
                }}>
                    <View style={{
                        marginBottom: 15,
                    }}>
                        <View style={{
                            alignItems: 'center',
                        }}>
                            <HeadingComp
                                navigation={null}
                                Title={"Enter In Game Name"}
                                ShowViewAll={false}
                                Navigate_to={''}
                                Query={null}
                            />
                        </View>
                        <View style={{
                            paddingHorizontal: 10
                        }}>
                            <FormInput
                                containerStyle={{ marginTop: SIZES.radius }}
                                label="InGame Name"
                                Placeholder={"Enter Here"}
                                KeyboardType="default"
                                autocomplete="off"
                                maxLength={25}
                                autoCapatilize={"none"}
                                secureTextEntry={false}
                                onchange={(Value: any) => {
                                    const text = Value.replace(/\s{2,}/g, ' ').trim()
                                    setInGameName(text)
                                }}
                                errorMsg={""}
                                prepandComponent={null}
                                appendComponent={null
                                }
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                if (InGameName === "") {
                                    Alert.alert("Alert", "Enter InGame Name Firsr", [{ text: "OK" }]);
                                }
                                else {
                                    JoinMatchFunction(MatchId,
                                        EntryFee, InGameName)
                                    setDisable(true)
                                }
                            }}
                            disabled={Disable}
                            style={{
                                alignSelf: 'center',
                                height: Dpheight(6.8),
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