import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { SIZES, COLORS } from "../../../constants/Theame";
import Heading from "../../../components/Heading";
import Icon from "react-native-vector-icons/Ionicons";
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
            console.log('in profile focus');
            console.log(UserId);
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
                        <Image source={{ uri: `https://api.multiavatar.com/${Specific_User.Name}.png` }}
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                            }} />
                        <View style={styles.Textwrapper}>
                            <Text style={styles.Name}>{Specific_User.Name}</Text>
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
        fontSize: 24,
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
        fontSize: 15,
        fontWeight: "bold",
    },
    statsCaption: {
        lineHeight: 25,
        fontSize: 15,
        fontWeight: "bold",
        color: COLORS.gray,
    },
    Caption: {
        textAlign: "center",
        lineHeight: 30,
        fontSize: 17,
        fontWeight: "600",
        color: COLORS.gray,
    },
});