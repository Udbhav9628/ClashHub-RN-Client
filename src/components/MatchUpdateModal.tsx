import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { COLORS, Dpheight, DPwidth, FONTS, SIZES } from '../constants/Theame';
import Icon from "react-native-vector-icons/Ionicons";

const MatchUpdateModal = ({ modalVisible,
    setModalVisible,
    Days,
    Hours,
    Minutes,
    Match_Status,
}: {
    modalVisible: any;
    setModalVisible: any;
    Days: any;
    Hours: any;
    Minutes: any;
    Match_Status: any;

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
                        Match Updates
                    </Text>
                </View>
                <View style={styles.Container}>
                    {/* Rules */}
                    {/* Sechduled */}
                    {Minutes !== 0 && (<View style={{
                        marginHorizontal: SIZES.base,
                    }}>
                        <Text
                            style={{
                                color: COLORS.darkGray2, ...FONTS.h3,
                                textAlign: 'justify',
                                marginBottom: 15,
                            }}
                        >
                            &#187; Room ID and Password will be shared Here, 10 minutes Brfore match Start time
                        </Text>
                        <Text
                            style={{
                                color: COLORS.darkGray2, ...FONTS.h3,
                                textAlign: 'justify',
                                marginBottom: 15,
                            }}
                        >
                            &#187; Make sure you join the Match Room ASAP before the match start
                        </Text>
                        <Text
                            style={{
                                color: COLORS.darkGray2, ...FONTS.h3,
                                textAlign: 'justify',
                                marginBottom: 15,
                            }}
                        >
                            &#187; Do Not Disclose Room Details to Others
                        </Text>
                    </View>)}
                    {/* Ongoing */}
                    {Days === 0 && Hours === 0 && Minutes === 0 && Match_Status === 'Started' && (
                        <View style={{
                            marginHorizontal: SIZES.base,
                        }}>
                            <Text
                                style={{
                                    color: COLORS.darkGray2, ...FONTS.h3,
                                    textAlign: 'justify',
                                    marginBottom: 15,
                                }}
                            >
                                &#187; Custom Room ID and Password Is Available, Join The Match ASAP
                            </Text>
                            <Text
                                style={{
                                    color: COLORS.darkGray2, ...FONTS.h3,
                                    textAlign: 'justify',
                                    marginBottom: 15,
                                }}
                            >
                                &#187; Do Not Disclose Room Details to Others
                            </Text>
                            <Text
                                style={{
                                    color: COLORS.darkGray2, ...FONTS.h3,
                                    textAlign: 'justify',
                                    marginBottom: 15,
                                }}
                            >
                                &#187; You Can Always Report to Us , If Organiser Provide The Wrong Room Details
                            </Text>
                        </View>
                    )}
                    {/* Completed */}
                    {Days === 0 && Hours === 0 && Minutes === 0 && Match_Status === 'Completed' && (
                        <View style={{
                            marginHorizontal: SIZES.base,
                        }}>
                            <Text
                                style={{
                                    color: COLORS.darkGray2, ...FONTS.h3,
                                    textAlign: 'justify',
                                    marginBottom: 15,
                                }}
                            >
                                &#187; Match Is Sucessfully Completed You Can Check Out Your Result
                            </Text>
                            <Text
                                style={{
                                    color: COLORS.darkGray2, ...FONTS.h3,
                                    textAlign: 'justify',
                                    marginBottom: 15,
                                }}
                            >
                                &#187; You Can Always Report to Us, If You Have Any Problem with Your Result
                            </Text>
                        </View>
                    )}
                    {/* Cancelled */}
                    {Days === 0 && Hours === 0 && Minutes === 0 && Match_Status !== 'Started' && Match_Status !== 'Completed' && (
                        <View style={{
                            marginHorizontal: SIZES.base,
                        }}>
                            <Text
                                style={{
                                    color: COLORS.darkGray2, ...FONTS.h3,
                                    textAlign: 'justify',
                                    marginBottom: 15,
                                }}
                            >
                                &#187; Match Is Unfortunately Cancelled, Because Organiser Failed To Provide Room Details With in Time Limit
                            </Text>
                            <Text
                                style={{
                                    color: COLORS.darkGray2, ...FONTS.h3,
                                    textAlign: 'justify',
                                    marginBottom: 15,
                                }}
                            >
                                &#187; You Can Claim You Money Back, It will Be added to Wallet ASAP
                            </Text>
                            <Text
                                style={{
                                    color: COLORS.darkGray2, ...FONTS.h3,
                                    textAlign: 'justify',
                                    marginBottom: 15,
                                }}
                            >
                                &#187; You Can Always Contect Us If You Have any Problem
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    )
}

export default MatchUpdateModal

const styles = StyleSheet.create({
    Container: {
        backgroundColor: COLORS.white,
        padding: 15,
    },
    CrossSign: { position: "absolute", top: 15, left: 20, zIndex: 999 },
})