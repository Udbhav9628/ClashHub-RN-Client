import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constants/Theame';
import Icon from "react-native-vector-icons/Ionicons";
import ModalCross from './ModalCross';
import Icons from '../constants/Icons';

const How_To_Find_Username = ({
    modalVisible,
    setModalVisible,
    MatchType
}: {
    modalVisible: boolean;
    setModalVisible: Function;
    MatchType: string;
}) => {
    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={styles.Container}
            >
                <ModalCross setModalVisible={setModalVisible} />
                <View
                    style={{
                        paddingTop: SIZES.base,
                        paddingBottom: 50,
                    }}
                >
                    <View
                        style={{
                            marginHorizontal: 15,
                        }}
                    >
                        {/* Title*/}
                        <View
                            style={{
                                marginTop: SIZES.base,
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: SIZES.h2,
                                    fontWeight: "bold",
                                    fontFamily: 'Poppins-SemiBold',
                                    color: COLORS.black,
                                }}
                            >
                                How To Find Username
                            </Text>
                        </View>
                        <View style={{
                            marginTop: 20,
                        }}>
                            <Text style={{
                                fontFamily: 'Poppins-SemiBold',
                                fontSize: 17,
                                fontWeight: "700",
                                color: COLORS.black,
                                marginBottom: 10
                            }}>STEP 1  After Opening The {MatchType} App, Go To Upper Left Corner (Profile Section)</Text>
                            <Image source={Icons.Crousal} style={styles.Image} />
                        </View>
                        <View style={{
                            marginTop: 30,
                        }}>
                            <Text style={{
                                fontFamily: 'Poppins-SemiBold',
                                fontSize: 17,
                                fontWeight: "700",
                                color: COLORS.black,
                                marginBottom: 10
                            }}>STEP 2  Find and Copy In Game Username</Text>
                            <Image source={Icons.Crousal} style={styles.Image} />
                        </View>
                        <View style={{
                            marginTop: 30,
                        }}>
                            <Text style={{
                                fontFamily: 'Poppins-SemiBold',
                                fontSize: 17,
                                fontWeight: "700",
                                color: COLORS.black,
                                marginBottom: 10
                            }}>STEP 3 Comeback to ClashHub app and Paste Username</Text>
                            <Image source={Icons.Crousal} style={styles.Image} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Modal>
    )
}

export default How_To_Find_Username

const styles = StyleSheet.create({
    Container: { backgroundColor: COLORS.white, flex: 1 },
    Image: {
        width: "100%",
        height: 200,
        resizeMode: "cover",
        borderRadius: 5
    },
});