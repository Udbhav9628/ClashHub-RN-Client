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
                    <Heading navigation={navigation} Title={"Profile"} />
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
                            <Text style={styles.Caption}>{Specific_User?.UserName}</Text>
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
    Caption: {
        textAlign: "center",
        lineHeight: SIZES.h1,
        fontSize: SIZES.h3,
        fontWeight: "600",
        color: COLORS.gray,
    },
});