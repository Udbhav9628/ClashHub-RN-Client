import React, { useCallback, useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Modal,
    ActivityIndicator,
    Alert,
    TouchableOpacity,
    Text,
    AppState
} from "react-native";
import { COLORS, SIZES } from "../constants/Theame";
import YoutubePlayer from "react-native-youtube-iframe";
import Iconss from "react-native-vector-icons/Ionicons";

const Player = ({
    Item,
    modalVisible,
    setModalVisible,
}: {
    Item: any;
    modalVisible: any;
    setModalVisible: any;
}) => {

    const [Player_Loading, setPlayer_Loading] = useState(true)
    const [PlayVid, setPlayVid] = useState(false);

    function Handle_AppState_Change(nextAppState: any) {
        if (nextAppState === 'background') {
            setPlayVid(false)
        }
    }

    let subscription: any;
    useEffect(() => {
        if (modalVisible) {
            subscription = AppState.addEventListener('change', Handle_AppState_Change)
        }
        return () => {
            if (subscription && modalVisible) {
                subscription.remove();
                setPlayVid(false)
            }
        }
    }, [modalVisible])

    const onChangeState = (state: any) => {
        if (state === 'buffering' && modalVisible) {
            setPlayer_Loading(false)
        }
        if (state === 'playing' && modalVisible) {
            setPlayVid(true)
        }
    }

    const onError = useCallback((Error: any) => {
        Alert.alert(
            "Error",
            "Close and Try Again",
            [
                {
                    text: "OK",
                },
            ]
        );
    }, [])

    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => {
                setPlayVid(false);
                setModalVisible(false);
                setPlayer_Loading(true)
            }}
        >
            <View style={styles.Container}>
                {/* Back Button */}
                <View style={styles.CrossSign}>
                    <TouchableOpacity
                        onPress={() => {
                            setPlayVid(false);
                            setPlayer_Loading(true)
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <Iconss name="arrow-back" size={28} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.Header}>
                    <View >
                        <Text
                            style={{
                                color: COLORS.black,
                                fontSize: SIZES.body2,
                                fontWeight: "700",
                            }}
                        >
                            Video
                        </Text>
                    </View>
                    <View>
                    </View>
                </View>
                <View style={{ marginTop: 12 }}>
                    {Player_Loading && (<View style={{
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                        backgroundColor: COLORS.white
                    }}>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: 'center'
                            }}
                        >
                            <ActivityIndicator size="large" color={COLORS.primary} />
                        </View>
                    </View>)}
                    <YoutubePlayer
                        height={240}
                        play={PlayVid}
                        videoId={Item.RoomDetails.YT_Video_id}
                        onChangeState={onChangeState}
                        onError={onError}
                    />
                </View>
            </View>
        </Modal>
    )
}

export default Player

const styles = StyleSheet.create({
    Container: { backgroundColor: COLORS.white, flex: 1 },
    CrossSign: { position: "absolute", top: 12, left: 20, zIndex: 999 },
    Header: {
        alignItems: "center",
        flexDirection: "row",
        marginTop: 10,
        marginHorizontal: SIZES.h3,
        justifyContent: 'center',
    },
})