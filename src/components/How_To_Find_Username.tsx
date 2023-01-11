import { Image, Modal, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constants/Theame';
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
    function Return_UserName_Img(Typeof_Match: string) {
        switch (Typeof_Match) {
            case "FreeFire Max":
                return Icons.Max_UserName
            case "BGMI":
                return Icons.BGMI_UserName
            case "CODM":
                return Icons.CODM_UserName
        }
    }
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
                            }}>STEP 1  After Opening The {MatchType} App, Go To Upper Left Corner (Profile Section) and Copy the In-Game Name</Text>
                            <Image source={Return_UserName_Img(MatchType)} style={styles.Image} />
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