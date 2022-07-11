import { StyleSheet, View, FlatList, Modal, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { COLORS, Dpheight, DPwidth, SIZES } from '../constants/Theame'

const ModalGameType = (
    {
        modalVisible,
        setModalVisible,
        Selectected_GameType,
        height,
        Data,
    }: {
        modalVisible: any;
        setModalVisible: any;
        Selectected_GameType: any;
        height: any;
        Data: any;
    }
) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.Container}>
                <View style={{
                    height: height,
                    width: DPwidth(90),
                    backgroundColor: "white",
                    borderRadius: SIZES.radius,
                    padding: 1,
                    shadowColor: COLORS.black,
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                }}>
                    <FlatList
                        data={Data}
                        keyExtractor={(Item) => `${Item.id}`}
                        showsVerticalScrollIndicator={true}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.Content}
                                onPress={() => {
                                    Selectected_GameType(item.Item)
                                    setModalVisible(false)
                                }}
                            >
                                <Text style={styles.Text}>{item.Item}</Text>

                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </Modal>
    )
}

export default ModalGameType

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Content: {
        justifyContent: 'center',
        margin: 18,
        height: Dpheight(4.0),
        width: '100%',
    },
    Text: {
        color: COLORS.white,
        fontSize: SIZES.body3,
        fontWeight: 'bold'
    }
})