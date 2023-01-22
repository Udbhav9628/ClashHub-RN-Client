import { ActivityIndicator, Alert, AppState, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react'
import { SIZES, COLORS } from '../../../constants/Theame';
import Textinput from './Textinput';
import HeadingComp from '../../../components/HeadingComp';
import YoutubePlayer from "react-native-youtube-iframe";
import { Update_Match_Video, Clear_Match_Reducer_Sucess, Clear_Match_Reducer_Error } from "../../../store/Match/Matchaction";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import ModalCross from '../../../components/ModalCross';

const LiveYtModal = ({
    modalVisible,
    setModalVisible,
    navigation,
    Disable,
    setDisable,
    MatchId
}: {
    modalVisible: any;
    setModalVisible: any;
    navigation: any;
    Disable: any;
    setDisable: any;
    MatchId: any;
}) => {

    const [YT_Link, setYT_Link] = useState('');
    const [Validate_YT_Link, setValidate_YT_Link] = useState(false)
    const [PlayVid, setPlayVid] = useState(false);
    const [Player_Loading, setPlayer_Loading] = useState(false)

    const onChangeState = (state: any) => {
        if (state === 'unstarted' && modalVisible) {
            setPlayer_Loading(false)
        }
        if (state === 'playing' && modalVisible) {
            setPlayVid(true)
        }
    }

    function Handle_AppState_Change(nextAppState: any) {
        if (nextAppState === 'background') {
            setPlayVid(false);
        }
    }

    let subscription: any;
    useEffect(() => {
        if (modalVisible) {
            setPlayVid(true)
            subscription = AppState.addEventListener('change', Handle_AppState_Change)
        }
        return () => {
            if (subscription && modalVisible) {
                subscription.remove();
                setPlayVid(false)
            }
        }
    }, [modalVisible])

    const onError = useCallback((Error: any) => {
        setPlayer_Loading(true)
        Alert.alert(
            "Error",
            Error + "Close and Try Again",
            [
                {
                    text: "OK",
                },
            ]
        );
    }, [])

    function youtube_parser(url: string) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : '';
    }

    const dispatch = useDispatch();

    const Update_Match_Video_Func = bindActionCreators(
        Update_Match_Video,
        dispatch
    );

    const Clear_Match_Reducer_Sucess_Func = bindActionCreators(
        Clear_Match_Reducer_Sucess,
        dispatch
    );

    const Clear_Match_Reducer_Error_Func = bindActionCreators(
        Clear_Match_Reducer_Error,
        dispatch
    );

    const { loading, Sucess_Responce, Error, Sucess } = useSelector(
        (state: any) => state.Update_Video_Reducer
    );

    useEffect(() => {
        if (Sucess) {
            setValidate_YT_Link(false)
            Alert.alert("Message", Sucess_Responce, [{
                text: "OK",
                onPress: () => {
                    setDisable(false);
                    setModalVisible(!modalVisible);
                    Clear_Match_Reducer_Sucess_Func()
                    navigation.navigate("YourGuild");
                },
            }]);
        }
    }, [Sucess])

    useEffect(() => {
        if (Error) {
            Clears_and_Close()
            Clear_Match_Reducer_Error_Func();
            Alert.alert("Error", Error, [{
                text: "OK",
            }]);
        }
    }, [Error])

    function Clears_and_Close() {
        setPlayVid(false);
        setModalVisible(!modalVisible);
        setDisable(false)
        setValidate_YT_Link(false)
        setYT_Link('')
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Clears_and_Close();
            }}
        >
            <ModalCross setModalVisible={Clears_and_Close} />
            <View style={styles.Container}>
                <View
                    style={{
                        justifyContent: "center",
                    }}
                >
                    {/* Validateing YT Link */}
                    {Validate_YT_Link ? (
                        <View>
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
                            <View style={{
                                marginBottom: 20,
                                alignItems: 'center'
                            }}>
                                <HeadingComp
                                    navigation={null}
                                    Title={"Check Video"}
                                    ShowViewAll={false}
                                    Navigate_to={''}
                                    Query={null}
                                />
                            </View>
                            <View>
                                <YoutubePlayer
                                    height={300}
                                    play={PlayVid}
                                    videoId={YT_Link}
                                    onChangeState={onChangeState}
                                    onError={onError}
                                />
                            </View>
                            <View>
                                <TouchableOpacity
                                    disabled={Player_Loading}
                                    onPress={() => {
                                        if (YT_Link !== '') {
                                            const RoomData = {
                                                YT_Video_id: YT_Link
                                            }
                                            Update_Match_Video_Func(RoomData, MatchId);
                                            setDisable(true);
                                        } else {
                                            Alert.alert("Message", 'Paste Youtube Video Link', [{
                                                text: "OK",
                                            }]);
                                        }
                                    }}
                                    style={{
                                        height: 48,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: SIZES.radius,
                                        backgroundColor: Player_Loading || loading
                                            ? COLORS.transparentPrimray
                                            : COLORS.primary,
                                        marginHorizontal: SIZES.base,
                                    }}
                                >
                                    {Player_Loading || loading ? (
                                        <ActivityIndicator size="large" color={COLORS.primary} />
                                    ) : (
                                        <Text
                                            style={{
                                                color: COLORS.white,
                                                fontWeight: "bold",
                                                fontSize: SIZES.h2,
                                            }}
                                        >
                                            Broadcast
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) :
                        (
                            <View style={{
                                margin: 16
                            }}>
                                <View>
                                    <Text
                                        style={{
                                            marginTop: 2,
                                            textAlign: 'center',
                                            fontSize: SIZES.body2,
                                            fontWeight: "bold",
                                            color: COLORS.black,
                                        }}
                                    >
                                        Share Your Match Video
                                    </Text>
                                </View>
                                <Textinput
                                    containerStyle={{ marginTop: 20 }}
                                    label="YouTube Video's Link"
                                    Placeholder={"Paste YouTube Video's Link"}
                                    KeyboardType="default"
                                    autoCapatilize={"none"}
                                    maxLength={50}
                                    onchange={(Value: any) => {
                                        const text = Value.replace(/\s{2,}/g, ' ').trim()
                                        setYT_Link(youtube_parser(text));
                                    }}
                                    Msg={null}
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        if (YT_Link === '') {
                                            Alert.alert("Message", 'Enters Youtube Video Link', [{
                                                text: "OK",
                                            }]);
                                            return
                                        }
                                        if (YT_Link !== '') {
                                            setPlayer_Loading(true)
                                            setValidate_YT_Link(true)
                                        }
                                    }}
                                    disabled={Disable}
                                    style={{
                                        height: 48,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginTop: SIZES.padding,
                                        borderRadius: SIZES.radius,
                                        backgroundColor: Disable
                                            ? COLORS.transparentPrimray
                                            : COLORS.primary,
                                        marginHorizontal: SIZES.base,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: COLORS.white,
                                            fontWeight: "bold",
                                            fontSize: SIZES.h2,
                                        }}
                                    >
                                        Submit
                                    </Text>
                                </TouchableOpacity>
                                <View style={{
                                    marginVertical: 10
                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        color: COLORS.black,
                                        fontSize: 14,
                                        fontWeight: "bold",
                                    }}>Recommended Share Video for Better Reach</Text>
                                </View>
                            </View>
                        )}
                </View>
            </View>
        </Modal>
    )
}

export default LiveYtModal

const styles = StyleSheet.create({
    Container: {
        position: "absolute",
        bottom: -8,
        left: 2,
        right: 2,
        margin: 10,
        height: "100%",
        backgroundColor: "white",
        borderRadius: SIZES.radius,
        padding: 5,
        shadowColor: COLORS.black,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    }
})