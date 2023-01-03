import { Modal, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React from 'react';
import { COLORS, Dpheight, SIZES } from '../../constants/Theame';
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/Entypo";
import Iconss from "react-native-vector-icons/FontAwesome";
import ModalCross from '../../components/ModalCross';

const ModalClub_Menu = ({
    modalVisible,
    setModalVisible,
    navigation,
    Club_Details,
    Admin_Id
}: {
    modalVisible: any;
    setModalVisible: any;
    navigation: any;
    Club_Details: any;
    Admin_Id: any;
}) => {


    function Clears_and_Close() {
        setModalVisible(false);
    }

    if (Club_Details) {
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
                    height: 250,
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
                    <View style={styles.container}>
                        <ModalCross setModalVisible={Clears_and_Close} />
                        <View style={styles.menuWrapper}>
                            <TouchableOpacity
                                style={styles.menuTouchableOpacity}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                    navigation.navigate("GuildDetail", {
                                        Item: Club_Details,
                                    });
                                }}
                            >
                                <View style={styles.menuItem}>
                                    <Icon name="people" size={Dpheight(3.2)} color="black" />
                                    <Text style={styles.Menutitle}>Go To Club</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.menuTouchableOpacity}
                                onPress={() => {
                                    Alert.alert(
                                        "Message",
                                        "Feature Comming Soon",
                                        [
                                            {
                                                text: "ok",
                                            },
                                        ]
                                    );
                                }}
                            >
                                <View style={styles.menuItem}>
                                    <Icons name="share" size={Dpheight(3.2)} color="black" />
                                    <Text style={styles.Menutitle}>Share</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.menuTouchableOpacity}
                                onPress={() => {
                                    Alert.alert(
                                        "Message",
                                        "Feature Comming Soon",
                                        [
                                            {
                                                text: "ok",
                                            },
                                        ]
                                    );
                                }}
                            >
                                <View style={styles.menuItem}>
                                    <Iconss name="exclamation-triangle" size={Dpheight(3.2)} color="black" />
                                    <Text style={styles.Menutitle}>Report</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    } else {
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
                    height: Dpheight(11),
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
                    <View style={styles.container}>
                        <View style={styles.menuWrapper}>
                            <TouchableOpacity
                                style={styles.menuTouchableOpacity}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                    navigation.navigate("SpecificUserProfile", {
                                        UserId: Admin_Id,
                                    })
                                }}
                            >
                                <View style={styles.menuItem}>
                                    <Icons name="user" size={Dpheight(3)} color="black" />
                                    <Text style={styles.Menutitle}>Admin Profile</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

export default ModalClub_Menu

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flex: 1,
    },
    Menutitle: {
        fontSize: SIZES.body3,
        color: "#000",
        fontWeight: "bold",
        marginHorizontal: 15,
    },
    menuWrapper: {
        marginTop: 50,
    },
    menuItem: {
        flexDirection: "row",
        paddingVertical: 15,
        paddingHorizontal: 8,
    },
    menuTouchableOpacity: {
        borderRadius: SIZES.radius,
        marginHorizontal: SIZES.padding,
    },
});