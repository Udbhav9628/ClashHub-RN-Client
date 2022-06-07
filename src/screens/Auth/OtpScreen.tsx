import React, { useState, useEffect } from "react";
import AuthLayout from "./AuthLayout";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { COLORS, SIZES } from "../../constants/Theame";
import OTPInputView from '@twotalltotems/react-native-otp-input'

const OtpScreen = ({ navigation }: { navigation: any }) => {
    const [Timer, setTimer] = useState(60);
    useEffect(() => {
        let Intervel = setInterval(() => {
            setTimer((prevtimer) => {
                if (prevtimer > 0) {
                    return prevtimer - 1;
                } else {
                    return prevtimer;
                }
            });
        }, 1000);
        return () => {
            clearInterval(Intervel);
        };
    }, []); //Runs only for The First Time

    return (
        <ScrollView showsHorizontalScrollIndicator={false} style={style.Container}>
            <AuthLayout
                Title={"OTP Authentication"}
                SubTitle={`An Authentication code has been send to`}
            />
            {/* Otp Section */}
            <View style={style.OtpContainer}>
                <OTPInputView
                    pinCount={4}
                    style={style.OTPInputView}
                    codeInputFieldStyle={style.codeInputFieldStyle}
                    onCodeFilled={(code) => {
                        console.log(`Code is ${code}, you are good to go!`)
                    }}
                />
            </View>

            {/* CountDown Timer for OTP */}
            <View style={style.TimerContainer}>
                <Text
                    style={{
                        marginRight: SIZES.base,
                        fontSize: SIZES.h3,
                        lineHeight: 22,
                    }}
                >
                    Didn't recieved code?
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        setTimer(60);
                    }}
                    disabled={Timer === 0 ? false : true}
                >
                    <Text
                        style={{
                            color: Timer === 0 ? COLORS.primary : COLORS.gray2,
                            fontWeight: "bold",
                            fontSize: SIZES.h3,
                            lineHeight: 22,
                        }}
                    >
                        {Timer === 0 ? "Resend" : `Resend in ${Timer} s`}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Footer Section */}
            <View>
                <TouchableOpacity
                    style={style.FooterContainer_Touchable}
                    onPress={() => navigation.navigate("homes")}
                >
                    <Text style={style.FooterContainer_Text}>Continue</Text>
                </TouchableOpacity>
            </View>
            {/* Terms And Conditions */}
            <View style={style.TermsandConditions}>
                <Text style={style.TimerContainer_Text}>
                    By singinup you agree to our.
                </Text>
                <TouchableOpacity>
                    <Text style={style.TermsandConditions_Text2}>
                        Terms And Conditions
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const style = StyleSheet.create({
    Container: {
        backgroundColor: COLORS.white,
    },
    OtpContainer: {
        flex: 1,
        marginTop: SIZES.padding,
        alignItems: "center",
    },
    OTPInputView: {
        width: "90%",
        height: "100%",
    },
    codeInputFieldStyle: {
        width: 65,
        height: 65,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.transparentBlack1,
        fontSize: SIZES.h3,
        lineHeight: 22,
    },
    TimerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: SIZES.padding,
    },
    TimerContainer_Text: {
        color: COLORS.darkGray,
        fontSize: SIZES.body3,
        lineHeight: 22,
    },
    FooterContainer_Touchable: {
        height: 55,
        alignItems: "center",
        justifyContent: "center",
        marginTop: SIZES.padding,
        marginHorizontal: SIZES.padding,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.primary,
    },
    FooterContainer_Text: {
        color: COLORS.white,
        fontWeight: "bold",
        fontSize: SIZES.body3,
        lineHeight: 22,
    },
    TermsandConditions: {
        marginTop: SIZES.padding,
        alignItems: "center",
    },
    TermsandConditions_Text: {
        color: COLORS.darkGray,
        fontSize: SIZES.h4,
        lineHeight: 22,
    },
    TermsandConditions_Text2: {
        color: COLORS.primary,
        fontSize: SIZES.h4,
        lineHeight: 22,
    },
});

export default OtpScreen;