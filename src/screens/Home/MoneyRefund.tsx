import { StyleSheet, Text, View, Modal, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import HeadingComp from '../../components/HeadingComp';
import { COLORS, SIZES } from '../../constants/Theame';

const MoneyRefund = ({
    modalVisible,
    setModalVisible,
    Disable,
    setDisable,
    navigation
}: {
    modalVisible: any;
    setModalVisible: any;
    Disable: any;
    setDisable: any;
    navigation: any;
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setDisable(false)
                setModalVisible(!modalVisible);
            }}
        >
            <View style={{
                marginTop: 30,
                flex: 1, justifyContent: 'flex-start',
            }}>
                <View style={{
                    marginBottom: 15,
                    alignSelf: 'center'
                }}>
                    <HeadingComp
                        navigation={null}
                        Title={"Make Withdraw Request"}
                        ShowViewAll={false}
                        Navigate_to={''}
                        Query={null}
                    />
                    <TouchableOpacity

                    >
                        {false ? (
                            <ActivityIndicator size="large" color={COLORS.primary} />
                        ) : (
                            <Text
                                style={{
                                    color: COLORS.white,
                                    fontWeight: "bold",
                                    fontSize: SIZES.h2,
                                }}
                            >
                                Claim Refund
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default MoneyRefund

const styles = StyleSheet.create({})