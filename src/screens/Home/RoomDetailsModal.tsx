import { ActivityIndicator, Alert, Modal, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS, FONTS, SIZES } from '../../constants/Theame';
import { Fetch_Match_Room_Details, Clear_Match_Reducer_Error } from "../../store/Match/Matchaction";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import ModalCross from '../../components/ModalCross';

const RoomDetailsModal = ({
    modalVisible,
    setModalVisible,
    MatchId,
    RoomDetails,
}: {
    modalVisible: any;
    setModalVisible: any;
    MatchId: any;
    RoomDetails: any;
}) => {
    const dispatch = useDispatch();
    const Fetch_Match_Room_Details_Func = bindActionCreators(
        Fetch_Match_Room_Details,
        dispatch
    );
    const Clear_Match_Reducer_Error_Func = bindActionCreators(
        Clear_Match_Reducer_Error,
        dispatch
    );

    const { loading, Responce, Error } = useSelector(
        (state: any) => state.Fetch_Match_Room_Details
    );

    useEffect(() => {
        if (!RoomDetails && modalVisible) {
            Fetch_Match_Room_Details_Func(MatchId);
        }
    }, [modalVisible])

    useEffect(() => {
        if (Error) {
            Clear_Match_Reducer_Error_Func();
            Alert.alert("Error", Error, [{ text: "OK" }]);
        }
    }, [Error])

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
                margin: 20,
                height: 220,
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
                <ModalCross setModalVisible={setModalVisible} />
                <View
                    style={{
                        margin: '6%',
                        justifyContent: "center",
                    }}
                >
                    {loading ? (<View
                        style={{
                            height: '100%',
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    </View>) : (Responce?.Sucess || RoomDetails ? (
                        <>
                            <View>
                                <Text
                                    style={{
                                        marginTop: '4%',
                                        textAlign: 'center',
                                        fontSize: SIZES.body2,
                                        fontWeight: "bold",
                                        color: COLORS.black,
                                    }}
                                >
                                    Room Details
                                </Text>
                                <Text style={{ color: COLORS.darkGray2, ...FONTS.h3 }}>
                                    RoomId
                                </Text>
                                <Text
                                    style={{
                                        color: COLORS.black,
                                        ...FONTS.body3,
                                        fontWeight: "700",
                                    }}
                                >
                                    {RoomDetails ? RoomDetails.Name : Responce?.RoomId}
                                </Text>
                                <Text style={{ color: COLORS.darkGray2, ...FONTS.h3 }}>
                                    Room PassWord
                                </Text>
                                <Text
                                    style={{
                                        color: COLORS.black,
                                        ...FONTS.body3,
                                        fontWeight: "700",
                                    }}
                                >
                                    {RoomDetails ? RoomDetails.Password : Responce?.RoomPass}
                                </Text>
                            </View></>
                    ) : (
                        <View
                            style={{
                                height: '100%',
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: SIZES.h2,
                                    fontWeight: "700",
                                    color: COLORS.black,
                                    textAlign: "center"
                                }}
                            >
                                Room Details Not Available
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        </Modal>
    )
}

export default RoomDetailsModal