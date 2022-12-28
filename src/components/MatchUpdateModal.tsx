import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../constants/Theame';
import Icon from "react-native-vector-icons/AntDesign";

const MatchUpdateModal = ({
    Days,
    Hours,
    Minutes,
    Match_Status,
    Match_Cancelled,
    IsClub
}: {
    Days: any;
    Hours: any;
    Minutes: any;
    Match_Status: any;
    Match_Cancelled: any;
    IsClub: any;

}) => {
    return (
        <View>
            <View
                style={{
                    marginTop: 13,
                }}
            >
                <View style={{ marginHorizontal: SIZES.padding }}>
                    <Text
                        style={{
                            fontSize: SIZES.h2,
                            fontWeight: "bold",
                            color: COLORS.black
                        }}
                    >
                        Instructions :)
                    </Text>
                </View>
            </View>
            <View style={styles.Container}>
                {/* Rules */}
                {/* Sechduled */}
                {(Minutes !== 0) && (Match_Status === 'Scheduled') && (
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
                            <Icon name="star" size={18} color="black" />
                            {IsClub ? (" Hey Warrior! You can Enters Room Details till 10 min before Match Start Time") : (" Do not use any type of Hack, Malpractice. If you found doing so, you would be Banned instantly and all your Winning would be lost.")}
                        </Text>
                        <Text
                            style={{
                                color: COLORS.darkGray2, ...FONTS.h3,
                                textAlign: 'justify',
                                marginBottom: 15,
                            }}
                        >
                            <Icon name="star" size={18} color="black" />
                            {IsClub ? (" After Publishing Custom Room Details Do not Start Match Before the Match Start Time") : (" Room ID and Password will be shared, 10 minutes Brfore match Start time.")}
                        </Text>
                        {!IsClub && <Text
                            style={{
                                color: COLORS.darkGray2, ...FONTS.h3,
                                textAlign: 'justify',
                                marginBottom: 15,
                            }}
                        >
                            <Icon name="star" size={18} color="black" /> Make sure you join the Match's Custom Room ASAP before the match start time
                        </Text>}
                        {!IsClub && <Text
                            style={{
                                color: COLORS.darkGray2, ...FONTS.h3,
                                textAlign: 'justify',
                                marginBottom: 15,
                            }}
                        >
                            <Icon name="star" size={18} color="black" /> Do Not Disclose Room Details to Others
                        </Text>}
                    </View>)}
                {/*Room Available*/}
                {Minutes !== 0 && Match_Status === 'Started' && (
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
                            <Icon name="star" size={18} color="black" />
                            {IsClub ? (" Do not Start Match Before the Match Start Time") : (" Custom Room Details is available, Make sure you join Room before Match Start Time")}
                        </Text>
                        <Text
                            style={{
                                color: COLORS.darkGray2, ...FONTS.h3,
                                textAlign: 'justify',
                                marginBottom: 15,
                            }}
                        >
                            <Icon name="star" size={18} color="black" />
                            {IsClub ? (" Broadcast Live Youtube Match Video  Here also To Increase Reach") : (" Do not use any type of Hack, Malpractice. If you found doing so, you would be Banned from Platform instantly and all your Winning would be lost.")}
                        </Text>
                        {!IsClub && <Text
                            style={{
                                color: COLORS.darkGray2, ...FONTS.h3,
                                textAlign: 'justify',
                                marginBottom: 15,
                            }}
                        >
                            <Icon name="star" size={18} color="black" /> If Match Organiser fails to Provide Match's Result Within 4 Hours of Match Start Time then match would be cancelled and you will be able to take Entry Fees back.
                        </Text>}
                        {!IsClub && <Text
                            style={{
                                color: COLORS.darkGray2, ...FONTS.h3,
                                textAlign: 'justify',
                                marginBottom: 15,
                            }}
                        >
                            <Icon name="star" size={18} color="black" /> Winning Amount would be added to wallet instantly after Match Organiser Enters Results.
                        </Text>}
                    </View>
                )}
                {/* Ongoing */}
                {Days === 0 && Hours === 0 && Minutes === 0 && Match_Status === 'Started' && !Match_Cancelled && (
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
                            <Icon name="star" size={18} color="black" />
                            {IsClub ? (" Hey Warrior! Publish Match's Result within 4 Hours of Match Start Time Else Match Would Cancel") : (" Do not use any type of Hack, Malpractice. If you found doing so, you would be Banned from Platform instantly and all your Winning would be lost.")}
                        </Text>
                        <Text
                            style={{
                                color: COLORS.darkGray2, ...FONTS.h3,
                                textAlign: 'justify',
                                marginBottom: 15,
                            }}
                        >
                            <Icon name="star" size={18} color="black" />
                            {IsClub ? (' Broadcast Live Youtube Match Video  Here also To Increase Reach') : (" If Match Organiser fails to Provide Match's Result Within 4 Hours of Match Start Time then match would be cancelled and you will be able to take Entry Fees back.")}
                        </Text>
                        {!IsClub && <Text
                            style={{
                                color: COLORS.darkGray2, ...FONTS.h3,
                                textAlign: 'justify',
                                marginBottom: 15,
                            }}
                        >
                            <Icon name="star" size={18} color="black" /> Winning Amount would be added to wallet instantly after Match Organiser Enters Results.
                        </Text>}
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
                            <Icon name="star" size={18} color="black" />
                            {IsClub ? (" Match Is Sucessfully Completed.") : (" Match Is Sucessfully Completed You Can Check Out Your Result.")}
                        </Text>
                        <Text
                            style={{
                                color: COLORS.darkGray2, ...FONTS.h3,
                                textAlign: 'justify',
                                marginBottom: 15,
                            }}
                        >
                            <Icon name="star" size={18} color="black" />
                            {IsClub ? (" Commission Amount addrd to Club Wallet") : (" Winning amount added to Your Gamer Wallet.")}
                        </Text>
                        <Text
                            style={{
                                color: COLORS.darkGray2, ...FONTS.h3,
                                textAlign: 'justify',
                                marginBottom: 15,
                            }}
                        >
                            <Icon name="star" size={18} color="black" />
                            {IsClub ? (" You Can Always Report to Us, If Have Any Problem.") : (" You Can Always Report to Us, If You Have Any Problem with Result.")}
                        </Text>
                    </View>
                )}
                {/* Cancelled */}
                {Match_Cancelled && (
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
                            <Icon name="star" size={18} color="black" />
                            {IsClub ? (" Match Is Unfortunately Cancelled, Either Because You Failed To Provide Room Details 10 min prior Match Start Time Or You Failed to Provide Match's Result Within Time Limit.") : (" Match Is Unfortunately Cancelled, Either Because Organiser Failed To Provide Room Details 10 min prior Match Start Time Or Organiser Failed to Provide Match's Result Within 4 Hours of Match Start Time.")}
                        </Text>
                        {!IsClub && <Text
                            style={{
                                color: COLORS.darkGray2, ...FONTS.h3,
                                textAlign: 'justify',
                                marginBottom: 15,
                            }}
                        >
                            <Icon name="star" size={18} color="black" />
                            You Can Take Entry Fee Back, It will Be added to Wallet Instantly.
                        </Text>}
                        {!IsClub && <Text
                            style={{
                                color: COLORS.darkGray2, ...FONTS.h3,
                                textAlign: 'justify',
                                marginBottom: 15,
                            }}
                        >
                            <Icon name="star" size={18} color="black" /> You Can Always Contect Us If Have any Problem
                        </Text>}
                    </View>
                )}
            </View>
        </View>

    )
}

export default MatchUpdateModal

const styles = StyleSheet.create({
    Container: {
        backgroundColor: COLORS.white,
        padding: 15,
    }
})