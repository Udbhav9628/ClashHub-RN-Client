import { StyleSheet, Alert, Text, View, Modal, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import HeadingComp from '../../components/HeadingComp';
import { COLORS, Dpheight, SIZES } from '../../constants/Theame';
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { GetMoneyRefund, Clear_Payment_Reducer_Error, Clear_Payment_Reducer_Sucess } from "../../store/Payment/PaymentAction";

const MoneyRefund_Comp = ({
    modalVisible,
    setModalVisible,
    Match_Id,
    setDisable,
}: {
    modalVisible: any;
    setModalVisible: any;
    Match_Id: string;
    setDisable: any;
}) => {

    const dispatch = useDispatch();

    const GetMoneyRefund_Func = bindActionCreators(
        GetMoneyRefund,
        dispatch
    );

    const Clear_Payment_Reducer_Sucess_Func = bindActionCreators(
        Clear_Payment_Reducer_Sucess,
        dispatch
    );

    const Clear_Payment_Reducer_Error_Func = bindActionCreators(
        Clear_Payment_Reducer_Error,
        dispatch
    );


    const { loading, Sucess_Message, Error, sucess } = useSelector((state: any) => state.Money_Refund_Reducer);

    useEffect(() => {
        if (sucess) {
            setModalVisible(false);
            Clear_Payment_Reducer_Sucess_Func();
            Alert.alert("Message", Sucess_Message, [
                {
                    text: "OK",
                },
            ]);
        }
    }, [sucess]);

    useEffect(() => {
        if (Error) {
            Clear_Payment_Reducer_Error_Func();
            Alert.alert("Error", Error, [
                {
                    text: "OK",
                },
            ]);
        }
    }, [Error]);


    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => {
                setDisable(false)
                setModalVisible(!modalVisible);
            }}
        >
            <View style={{
                position: "absolute",
                bottom: -8,
                left: 2,
                right: 2,
                margin: 20,
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
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{
                        alignSelf: 'center'
                    }}>
                        <HeadingComp
                            navigation={null}
                            Title={"Claim Refund"}
                            ShowViewAll={false}
                            Navigate_to={''}
                            Query={null}
                        />
                    </View>
                    <View>
                        <Text
                            style={{
                                textAlign: 'center',
                                marginTop: SIZES.base,
                                color: COLORS.darkGray,
                                fontSize: SIZES.body4,
                            }}
                        >
                            Money will be added instantly to your wallet
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                GetMoneyRefund_Func(Match_Id)
                            }}
                            disabled={loading}
                            style={{
                                alignSelf: 'center',
                                height: Dpheight(6.8),
                                width: '35%',
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: 30,
                                marginBottom: 30,
                                borderRadius: SIZES.radius,
                                backgroundColor: loading
                                    ? COLORS.transparentPrimray
                                    : COLORS.primary,
                                marginHorizontal: SIZES.padding,
                            }}
                        >
                            {loading ? (
                                <ActivityIndicator size="large" color={COLORS.white} />
                            ) : (
                                <Text
                                    style={{
                                        color: COLORS.white,
                                        fontWeight: "bold",
                                        fontSize: SIZES.h2,
                                    }}
                                >
                                    Refund
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default MoneyRefund_Comp

const styles = StyleSheet.create({})