import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/Ionicons";

const ModalCross = ({ setModalVisible }: { setModalVisible: Function }) => {
    return (
        <View style={{ position: "absolute", top: 5, right: 5 }}>
            <TouchableOpacity
                onPress={() => {
                    setModalVisible(false);
                }}
                style={{
                    padding: 10,
                }}
            >
                <Icon name="ios-close" size={28} color="black" />
            </TouchableOpacity>
        </View>
    )
}

export default ModalCross

const styles = StyleSheet.create({})