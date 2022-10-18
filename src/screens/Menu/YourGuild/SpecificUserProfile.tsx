import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import React from "react";
import { SIZES, COLORS, DPwidth, Dpheight } from "../../../constants/Theame";
import Heading from "../../../components/Heading";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Get_Specific_User_Details } from "../../../store/Authentication/Authaction";
import { useFocusEffect } from '@react-navigation/native';

const SpecificUserProfile = ({
    route,
    navigation,
}: {
    route: any;
    navigation: any;
}) => {
    const { UserId } = route.params;
    const { Specific_User, loading } = useSelector((state: any) => state.Get_Specific_User_Details_reducer);

    const dispatch = useDispatch();
    const Get_Specific_User_Details_Function = bindActionCreators(Get_Specific_User_Details, dispatch);

    useFocusEffect(
        React.useCallback(() => {
            Get_Specific_User_Details_Function(UserId)
        }, [])
    );

    return (
        <View style={styles.Container}>
            {loading ? (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>) : (<>
                    <Heading navigation={navigation} Title={" Your Profile"} />
                    {/* Profile */}
                    <View style={styles.Profile}>
                        <Image source={{ uri: `${Specific_User?.PhotoUrl}` }}
                            style={{
                                width: DPwidth(31),
                                height: Dpheight(15),
                                borderRadius: Dpheight(455),
                                resizeMode: "contain",
                            }} />
                        <View style={styles.Textwrapper}>
                            <Text style={styles.Name}>{Specific_User?.Name}</Text>
                            <Text style={styles.Caption}>Play, Win and Earn</Text>
                        </View>
                    </View>
                    {/* Stats */}
                    <View style={styles.statswrapper}>
                        <View>
                            <Text style={styles.statsTitle}>5</Text>
                            <Text style={styles.statsCaption}>Played</Text>
                        </View>
                        <View>
                            <Text style={styles.statsTitle}>12%</Text>
                            <Text style={styles.statsCaption}>Winrate</Text>
                        </View>
                        <View>
                            <Text style={styles.statsTitle}>&#x20B9;5454</Text>
                            <Text style={styles.statsCaption}>Income</Text>
                        </View>
                    </View>
                </>)}
        </View>
    )
}

export default SpecificUserProfile

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    Profile: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginHorizontal: SIZES.padding,
    },
    Textwrapper: {
        marginTop: 10,
        justifyContent: "center",
        marginHorizontal: SIZES.padding,
    },
    Name: {
        textAlign: 'center',
        fontSize: SIZES.Size24,
        color: "#000",
        fontWeight: "bold",
    },
    statswrapper: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 15,
        marginBottom: 15,
        marginHorizontal: SIZES.padding,
    },
    statsTitle: {
        textAlign: "center",
        fontSize: SIZES.h3,
        fontWeight: "bold",
    },
    statsCaption: {
        lineHeight: SIZES.h1,
        fontSize: SIZES.h3,
        fontWeight: "bold",
        color: COLORS.gray,
    },
    Caption: {
        textAlign: "center",
        lineHeight: SIZES.h1,
        fontSize: SIZES.h3,
        fontWeight: "600",
        color: COLORS.gray,
    },
});