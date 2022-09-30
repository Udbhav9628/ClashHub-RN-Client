import React, { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    BackHandler,
} from "react-native";
import { SIZES, COLORS } from "../../constants/Theame";
const SucessImage = require("../../Assets/Images/success.png");

const PaymentSucess = ({
    route,
    navigation,
}: {
    route: any;
    navigation: any;
}) => {

    const { Matched_Joined } = route.params;

    useEffect(() => {
        //Preventing From Going Back
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                return true;
            }
        );
        return () => {
            backHandler.remove();
        };
    }, []);

    return (
        <View style={style.Container}>
            <View style={style.MainThingWrapper}>
                <Image source={SucessImage} style={style.SucessImage} />
                <Text style={style.Text1}>Congratulations</Text>
                <Text style={style.Text2}>  {Matched_Joined ? "Match Joined Sucessfully!" : "Payment was sucessfull!"}</Text>
            </View>
            <TouchableOpacity
                onPress={() => {
                    if (Matched_Joined) {
                        navigation.navigate("EnterInApp");
                    } else {
                        navigation.navigate("Wallet");
                    }
                }}
                style={{
                    height: 55,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.primary,
                }}
            >
                <Text
                    style={{
                        color: COLORS.white,
                        fontWeight: "bold",
                        fontSize: SIZES.body3,
                    }}
                >
                    Done
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default PaymentSucess;

const style = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.padding,
    },
    MainThingWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    SucessImage: {
        resizeMode: "contain",
        width: 150,
        height: 150,
    },
    Text1: {
        color: COLORS.black,
        marginTop: SIZES.padding,
        fontSize: SIZES.h1,
        lineHeight: 36,
        fontWeight: "bold",
    },
    Text2: {
        marginTop: SIZES.base,
        color: COLORS.darkGray,
        fontSize: SIZES.body3,
        lineHeight: 22,
    },
});