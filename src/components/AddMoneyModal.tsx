import React, { useState } from "react";
import {
    Modal,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    Alert,
    FlatList,
    StyleSheet
} from "react-native";
import { SIZES, COLORS, FONTS, Dpheight } from "../constants/Theame";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Update_Match_Room_Details, Clear_Match_Reducer_Sucess, Clear_Match_Reducer_Error } from "../store/Match/Matchaction";
import HeadingComp from "./HeadingComp";
import { Create_withdrawls_request, GetPendingWithdrawls, Clear_Payment_Reducer_Error, Clear_Payment_Reducer_Sucess } from "../store/Payment/PaymentAction";
import Textinput from "../screens/Menu/YourGuild/Textinput";
import Icon from "react-native-vector-icons/Feather";


const AddMoneyModal = ({
    ModalContainerStyle,
    modalVisible,
    setModalVisible,
    AddMoneyFunction,
    setTempLoading,
    TempLoading
}: {
    ModalContainerStyle: any;
    modalVisible: any;
    setModalVisible: any;
    AddMoneyFunction: Function;
    setTempLoading: Function;
    TempLoading: Boolean;
}) => {
    const [Ammount_To_Add, setAmmount_To_Add] = useState(0);
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={{ ...ModalContainerStyle }}>
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
                            Title={"Enter Amount"}
                            ShowViewAll={false}
                            Navigate_to={''}
                            Query={null}
                        />
                    </View>
                    <TextInput
                        style={{
                            marginTop: 4,
                            height: Dpheight(6.8),
                            alignSelf: 'center',
                            width: '90%',
                            paddingLeft: 25,
                            justifyContent: "center",
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.lightGray2
                        }}
                        placeholder='Enter Amount'
                        placeholderTextColor={COLORS.gray}
                        keyboardType="numeric"
                        autoCapitalize="none"
                        maxLength={3}
                        onChangeText={(text) => {
                            setAmmount_To_Add(parseInt(text))
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            if (Ammount_To_Add > 0) {
                                AddMoneyFunction(Ammount_To_Add);
                                setTempLoading(true);
                                setModalVisible(!modalVisible);
                            } else {
                                Alert.alert("Error", 'Enter Amount First', [{ text: "OK" }]);
                            }
                        }}
                        style={{
                            alignSelf: 'center',
                            height: Dpheight(6.8),
                            width: '35%',
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: SIZES.padding,
                            marginBottom: 30,
                            borderRadius: SIZES.radius,
                            backgroundColor
                                : COLORS.primary,
                            marginHorizontal: SIZES.padding,
                        }}
                    >
                        {TempLoading ? (// loading here
                            <ActivityIndicator size="large" color={COLORS.primary} />
                        ) : (
                            <Text
                                style={{
                                    color: COLORS.white,
                                    fontWeight: "bold",
                                    fontSize: SIZES.h2,
                                }}
                            >
                                Deposit
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default AddMoneyModal

const style = StyleSheet.create({
    Elevation: {
        elevation: 1,
        marginVertical: 10,
        margin: 10,
        //For Ios Only -- SHOWdow code
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    NotificationWrapper: {
        height: Dpheight(8.5),
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.lightGray2,
        borderRadius: SIZES.radius,
        paddingHorizontal: SIZES.base,
    },
    NotificationText: {
        fontSize: SIZES.h3,
        fontWeight: "bold",
    },
    NotificationText2: {
        fontSize: SIZES.h5,
        fontWeight: "600",
        color: COLORS.gray,
    },
    Value: {
        position: "absolute",
        top: 17,
        right: 15,
    },
    ValueText: {
        fontSize: SIZES.body4,
        fontWeight: "bold",
        color: COLORS.black,
    },
});