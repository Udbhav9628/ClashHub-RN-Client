import React, { useCallback, useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Modal,
    ActivityIndicator,
    Alert,
    TouchableOpacity,
    Text,
    ScrollView,
    Image,
    AppState
} from "react-native";
import { COLORS, Dpheight, DPwidth, SIZES } from "../../constants/Theame";
import YoutubePlayer from "react-native-youtube-iframe";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { bindActionCreators } from "redux";
import {
    Fetch_Home_Page_Matchs,
    Join_Match_action,
    Clear_Match_Reducer_Error,
    Clear_Match_Reducer_Sucess,
} from "../../store/Match/Matchaction";
import { Get_Specific_Club_Details } from "../../store/Guild/GuildAction";
import PlayerGameNameInputModal from "../Home/PlayerGameNameInputModal";
import ModalClub_Menu from "../Home/ModalClub_Menu";
import { ReturnGameImage } from "../../utils/Utils";
import Iconss from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome5";
import JoinedUserModal from "../Home/JoinedUserModal";

const PlayerModal = ({
    Item,
    modalVisible,
    setModalVisible,
    navigation,
    RefreshMatchVideo
}: {
    Item: any;
    modalVisible: any;
    setModalVisible: any;
    navigation: any;
    RefreshMatchVideo: Function;
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
            Error + "Close and Try Again",
            [
                {
                    text: "OK",
                },
            ]
        );
    }, [])

    const [PlayerInputModal, setPlayerInputModal] = useState(false)

    const [disable_joinmatch_button, setdisable_joinmatch_button] = useState(false);

    const [JoinedPlayermodal, setJoinedPlayermodal] = useState(false);

    const [Disable, setDisable] = useState(false);

    const [Show_Club_Menu_Modal, setShow_Club_Menu_Modal] = useState(false)

    const { Join_Sucess, Error, Responce, loading } = useSelector(
        (state: any) => state.Join_Match_Reducer
    );

    const { User } = useSelector((state: any) => state.FetchUser_reducer);

    const isJoined = Item.Joined_User.find((Item: any) => {
        return Item.UserId === User?.id;
    });

    const dispatch = useDispatch();

    const Join_Match_Action_Func = bindActionCreators(
        Join_Match_action,
        dispatch
    );

    const Clear_Match_Sucess = bindActionCreators(
        Clear_Match_Reducer_Sucess,
        dispatch
    );

    const Clear_Match_ReducerError = bindActionCreators(
        Clear_Match_Reducer_Error,
        dispatch
    );

    const Get_Specific_Club_Details_Func = bindActionCreators(
        Get_Specific_Club_Details,
        dispatch
    );

    const Fetch_Home_Page_Match = bindActionCreators(
        Fetch_Home_Page_Matchs,
        dispatch
    );

    useEffect(() => {
        if (modalVisible) {
            Get_Specific_Club_Details_Func(Item.GuildId);
        }
    }, [modalVisible]);

    const Get_Specific_Club_Reducer = useSelector(
        (state: any) => state.Get_Specific_Club_Reducer
    );

    useEffect(() => {
        if (Join_Sucess) {
            Clear_Match_Sucess();
            if (Responce.Sucess) {
                setPlayVid(false);
                RefreshMatchVideo();
                Fetch_Home_Page_Match();
                navigation.navigate("PaymentSucess", {
                    Matched_Joined: true
                })
            } else {
                Alert.alert("Message", Responce.Msg, [
                    {
                        text: "OK",
                        onPress: () => {
                            setDisable(false);
                        }
                    },
                ]);
            }
        }
    }, [Join_Sucess]);

    useEffect(() => {
        if (Error) {
            setPlayVid(false);
            Clear_Match_ReducerError();
            setDisable(false);
            setPlayer_Loading(true)
            Alert.alert("Error", Error, [
                {
                    text: "OK",
                },
            ]);
        }
    }, [Error]);

    const [Days, setDays] = useState(0);
    const [Hours, setHours] = useState(0);
    const [Minutes, setMinutes] = useState(0);
    const [Match_Cancelled, setMatch_Cancelled] = useState(false)

    const Second = 1000;
    const Minute = Second * 60;
    const Hour = Minute * 60;
    const Day = Hour * 24;

    function formatTime(timeString: any) {
        const [hourString, minute] = timeString.split(":");
        const hour = +hourString % 24;
        return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
    }

    function Timer_Function() {
        const Match_time = new Date(Item.Date_Time).getTime();
        const now = new Date().getTime();
        const Gap = Match_time - now;
        const Gap2 = now - Match_time;

        if ((Gap2 >= 14400000 && Item.Match_Status === 'Started') || (Gap <= 0 && Item.Match_Status === 'Scheduled')) {
            clearInterval(Timer);
            setMatch_Cancelled(true)
        }
        if (Gap <= 0) {
            setMinutes(0);
        }
        else {
            const TextDay = Math.floor(Gap / Day);
            const TextHour = Math.floor((Gap % Day) / Hour);
            const TextMinute = Math.floor((Gap % Hour) / Minute);
            setDays(TextDay);
            setHours(TextHour);
            setMinutes(TextMinute + 1);
        }
    }

    let Timer: any;
    const Start_Timer = () => {
        Timer = setInterval(() => {
            Timer_Function()
        }, 1000);
    };
    useFocusEffect(
        React.useCallback(() => {
            if (modalVisible) {
                setPlayVid(true)
                Start_Timer();
            }
            return () => {
                if (modalVisible) {
                    setPlayVid(false)
                    clearInterval(Timer)
                    setModalVisible(false)
                }
            };
        }, [modalVisible])
    );

    useEffect(() => {
        if (modalVisible) {
            Timer_Function()
        }
    }, [modalVisible]);

    useEffect(() => {
        if (Item.Joined_User.length === Item.Total_Players) {
            setdisable_joinmatch_button(true)
        }
    }, []);

    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => {
                setPlayVid(false)
                setModalVisible(false);
                setPlayer_Loading(true)
            }}
        >
            <View style={styles.Container}>
                {/* Back Button */}
                <View style={styles.CrossSign}>
                    <TouchableOpacity
                        onPress={() => {
                            setPlayVid(false)
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
                            Match Detail
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
                {/* Match Details */}
                {isJoined ? (
                    // Joined
                    <ScrollView>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "row",
                            }}
                        >
                            {/* all Info */}
                            <View
                                style={{
                                    width: "50%",
                                }}
                            >
                                {/* Title */}
                                <View style={styles.TitleWraper}>
                                    <Text
                                        style={{
                                            fontFamily: 'Poppins-SemiBold', fontSize: 22,
                                            fontWeight: "700",
                                            color: COLORS.black,
                                        }}
                                    >
                                        {Item._id.slice(-2)} {Item.Game_Name} {Item.GameType} Match
                                    </Text>
                                </View>
                                {/* Match Status */}
                                <View>
                                    {/* Secheduled */}
                                    {(Minutes !== 0) && (Item.Match_Status === 'Scheduled') && (
                                        <View style={styles.EntryFeeWraper}>
                                            <Text
                                                style={{
                                                    fontFamily: 'Poppins-SemiBold', fontSize: 18,
                                                    color: COLORS.primary,
                                                    fontWeight: "700",
                                                }}
                                            >
                                                Starts In
                                            </Text>
                                            <Text
                                                style={{
                                                    fontFamily: 'Poppins-SemiBold', fontSize: 18,
                                                    color: COLORS.primary,
                                                    fontWeight: "700",
                                                }}
                                            >
                                                {!Days || Days === 0 ? null : `${Days}D `}{!Hours || Hours === 0 ? '' : `${Hours}H `}{`${Minutes}M`}
                                            </Text>
                                        </View>
                                    )}
                                    {/*Join Now */}
                                    {Minutes !== 0 && Item.Match_Status === 'Started' && (
                                        <View style={styles.EntryFeeWraper}>
                                            <Text
                                                style={{
                                                    fontFamily: 'Poppins-SemiBold', fontSize: 18,
                                                    color: COLORS.primary,
                                                    fontWeight: "700",
                                                }}
                                            >
                                                Room Available
                                            </Text>
                                            <Text
                                                style={{
                                                    fontFamily: 'Poppins-SemiBold', fontSize: 18,
                                                    color: COLORS.primary,
                                                    fontWeight: "700",
                                                }}
                                            >
                                                Starts in
                                            </Text>
                                            <Text
                                                style={{
                                                    fontFamily: 'Poppins-SemiBold', fontSize: 18,
                                                    color: COLORS.primary,
                                                    fontWeight: "700",
                                                }}
                                            >
                                                {!Days || Days === 0 ? null : `${Days}D `}{!Hours || Hours === 0 ? '' : `${Hours}H `}{`${Minutes}M`}
                                            </Text>
                                        </View>
                                    )}
                                    {/* Ongoing */}
                                    {Days === 0 && Hours === 0 && Minutes === 0 && Item.Match_Status === 'Started' && !Match_Cancelled && (
                                        <View style={styles.EntryFeeWraper}>
                                            <Text
                                                style={{
                                                    fontFamily: 'Poppins-SemiBold', fontSize: 18,
                                                    color: COLORS.primary,
                                                    fontWeight: "700",
                                                }}
                                            >
                                                Live
                                            </Text>
                                        </View>
                                    )}
                                    {/* Completed */}
                                    {Days === 0 && Hours === 0 && Minutes === 0 && Item.Match_Status === 'Completed' && (
                                        <View style={styles.EntryFeeWraper}>
                                            <Text
                                                style={{
                                                    fontFamily: 'Poppins-SemiBold', fontSize: 18,
                                                    color: COLORS.primary,
                                                    fontWeight: "700",
                                                }}
                                            >
                                                Finished
                                            </Text>
                                        </View>
                                    )}
                                    {/* Cancelled */}
                                    {Match_Cancelled && (
                                        <View style={styles.EntryFeeWraper}>
                                            <Text
                                                style={{
                                                    fontFamily: 'Poppins-SemiBold', fontSize: 18,
                                                    color: COLORS.primary,
                                                    fontWeight: "700",
                                                }}
                                            >
                                                Suspended
                                            </Text>
                                        </View>
                                    )}
                                </View>
                                {/* Match Info */}
                                <View style={styles.InfoWrapper}>
                                    {/* Info Left Details */}
                                    <View>
                                        {/* Joined Players Number */}
                                        <View style={styles.InfoLeftItem}>
                                            <Text style={{
                                                color: COLORS.darkGray2,
                                                fontFamily: 'Poppins-SemiBold', fontSize: 14,
                                            }}>
                                                Slots
                                            </Text>
                                            <Text
                                                style={{
                                                    color: COLORS.black,
                                                    fontFamily: 'Poppins-SemiBold', fontSize: 16,
                                                    fontWeight: "700",
                                                }}
                                            >
                                                {Item.Joined_User.length}/{Item.Total_Players}
                                            </Text>
                                        </View>
                                        <View style={styles.InfoLeftItem}>
                                            <Text style={{
                                                color: COLORS.darkGray2,
                                                fontFamily: 'Poppins-SemiBold', fontSize: 14,
                                            }}>
                                                Prize
                                            </Text>
                                            <Text
                                                style={{
                                                    color: COLORS.primary,
                                                    fontFamily: 'Poppins-SemiBold', fontSize: 17,
                                                    fontWeight: "700",
                                                }}
                                            >
                                                &#x20B9; {Item.Perkill_Prize} Per Kill
                                            </Text>
                                        </View>
                                        <View style={styles.InfoLeftItem}>
                                            <Text style={{
                                                color: COLORS.darkGray2,
                                                fontFamily: 'Poppins-SemiBold', fontSize: 14,
                                            }}>
                                                Entry
                                            </Text>
                                            <Text
                                                style={{
                                                    color: COLORS.black,
                                                    fontFamily: 'Poppins-SemiBold', fontSize: 16,
                                                    fontWeight: "700",
                                                }}
                                            >
                                                &#x20B9; {Item.EntryFee}
                                            </Text>
                                        </View>
                                        {/* Match Map */}
                                        <View style={styles.InfoLeftItem}>
                                            <Text style={{
                                                color: COLORS.darkGray2,
                                                fontFamily: 'Poppins-SemiBold', fontSize: 14,
                                            }}>
                                                Map
                                            </Text>
                                            <Text
                                                style={{
                                                    color: COLORS.black,
                                                    fontFamily: 'Poppins-SemiBold', fontSize: 16,
                                                    fontWeight: "700",
                                                }}
                                            >
                                                {Item.Map}
                                            </Text>
                                        </View>
                                        {/* Match Date */}
                                        <View style={styles.InfoLeftItem}>
                                            <Text style={{
                                                color: COLORS.darkGray2,
                                                fontFamily: 'Poppins-SemiBold', fontSize: 14,
                                            }}>
                                                Match Date
                                            </Text>
                                            <Text
                                                style={{
                                                    color: COLORS.black,
                                                    fontFamily: 'Poppins-SemiBold', fontSize: 16,
                                                    fontWeight: "700",
                                                }}
                                            >
                                                {new Date(Item.Date_Time).toDateString()}
                                            </Text>
                                        </View>
                                        {/* Match Time */}
                                        <View style={styles.InfoLeftItem}>
                                            <Text style={{
                                                color: COLORS.darkGray2,
                                                fontFamily: 'Poppins-SemiBold', fontSize: 14,
                                            }}>
                                                Time
                                            </Text>
                                            <Text
                                                style={{
                                                    color: COLORS.black,
                                                    fontFamily: 'Poppins-SemiBold', fontSize: 16,
                                                    fontWeight: "700",
                                                }}
                                            >{formatTime(new Date(Item.Date_Time).toLocaleTimeString())}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {/* Info Right Image */}
                            <View>
                                <Image source={ReturnGameImage(Item.Game_Name)} style={styles.InfoWrapperImage} />
                            </View>
                        </View>
                        <View>
                            {/* Hosted By */}
                            <View style={{ marginHorizontal: SIZES.padding, marginTop: Dpheight(8) }}>
                                <Text style={{
                                    fontFamily: 'Poppins-SemiBold', fontSize: 19,
                                    fontWeight: "700",
                                    color: COLORS.black,
                                }}>Hosted by</Text>
                                {Get_Specific_Club_Reducer.loading ? (<View
                                    style={{
                                        flex: 1,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <ActivityIndicator size="small" color={COLORS.primary} />
                                </View>) : (Get_Specific_Club_Reducer.Sucess ? (<TouchableOpacity onPress={() => setShow_Club_Menu_Modal(true)} style={{
                                    height: Dpheight(8),
                                    borderRadius: SIZES.radius,
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}>
                                    <Image
                                        style={{
                                            margin: 3,
                                            width: DPwidth(10),
                                            height: Dpheight(4),
                                            resizeMode: "contain",
                                        }}
                                        source={{ uri: `https://api.multiavatar.com/${Get_Specific_Club_Reducer?.Responce?._id}.png` }}
                                    />
                                    <View style={styles.GuildInfo}>
                                        <View>
                                            <Text
                                                style={{
                                                    color: COLORS.black,
                                                    fontSize: 17,
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {Get_Specific_Club_Reducer.Responce.GuildName}
                                            </Text>
                                        </View>
                                        <ModalClub_Menu modalVisible={Show_Club_Menu_Modal}
                                            setModalVisible={setShow_Club_Menu_Modal}
                                            navigation={navigation}
                                            Club_Details={Get_Specific_Club_Reducer.Responce}
                                            Admin_Id={null}
                                        />
                                        <View style={{
                                            position: "absolute",
                                            right: 15
                                        }}>
                                            <Iconss name="ellipsis-horizontal" size={18} color="black" />
                                        </View>
                                    </View>
                                </TouchableOpacity>) : (<View style={{ height: Dpheight(8), justifyContent: "center", alignItems: 'center' }}>
                                    <Text style={{ textAlign: "center", fontSize: SIZES.h3 }}>Error</Text>
                                </View>))}
                            </View>
                            <View style={{
                                marginTop: 20,
                                marginBottom: 60
                            }}>
                                <View style={{
                                    marginVertical: 30
                                }}>
                                    {/* Participants */}
                                    <View style={styles.Elevation}>
                                        <View>
                                            <JoinedUserModal modalVisible={JoinedPlayermodal}
                                                setModalVisible={setJoinedPlayermodal}
                                                navigation={navigation}
                                                Joined_User={Item.Joined_User}
                                                Match={Item} />
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => { setJoinedPlayermodal(true) }}>
                                            <View style={styles.GuildWrapper}>
                                                <View style={{ margin: 10 }}><Icon name="users" size={Dpheight(3)} color="black" /></View>
                                                {/* Info Of Guild */}
                                                <View style={styles.GuildInfo}>
                                                    <View>
                                                        <Text
                                                            style={{
                                                                color: COLORS.black,
                                                                fontSize: 17,
                                                                fontWeight: "bold",
                                                            }}
                                                        >
                                                            {Item.Match_Status === 'Completed' ? "Results" : 'Particpants'}
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={{
                                                            position: "absolute",
                                                            top: -2,
                                                            right: 15,
                                                        }}
                                                    >
                                                        <Icon name="angle-right" size={20} color="black" />
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                ) : (
                    // Not Joined
                    <>
                        <ScrollView>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                }}
                            >
                                {/* all Info */}
                                <View
                                    style={{
                                        width: "50%",
                                    }}
                                >
                                    {/* Title */}
                                    <View style={styles.TitleWraper}>
                                        <Text
                                            style={{
                                                fontFamily: 'Poppins-SemiBold', fontSize: 22,
                                                fontWeight: "700",
                                                color: COLORS.black,
                                            }}
                                        >
                                            {Item._id.slice(-2)} {Item.Game_Name} {Item.GameType} Match
                                        </Text>
                                    </View>
                                    {/* Match Status */}
                                    <View>
                                        {/* Secheduled */}
                                        {(Minutes !== 0) && (Item.Match_Status === 'Scheduled') && (
                                            <View style={styles.EntryFeeWraper}>
                                                <Text
                                                    style={{
                                                        fontFamily: 'Poppins-SemiBold', fontSize: 18,
                                                        color: COLORS.primary,
                                                        fontWeight: "700",
                                                    }}
                                                >
                                                    Starts In
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontFamily: 'Poppins-SemiBold', fontSize: 18,
                                                        color: COLORS.primary,
                                                        fontWeight: "700",
                                                    }}
                                                >
                                                    {!Days || Days === 0 ? null : `${Days}D `}{!Hours || Hours === 0 ? '' : `${Hours}H `}{`${Minutes}M`}
                                                </Text>
                                            </View>
                                        )}
                                        {/*Join Now */}
                                        {Minutes !== 0 && Item.Match_Status === 'Started' && (
                                            <View style={styles.EntryFeeWraper}>
                                                <Text
                                                    style={{
                                                        fontFamily: 'Poppins-SemiBold', fontSize: 18,
                                                        color: COLORS.primary,
                                                        fontWeight: "700",
                                                    }}
                                                >
                                                    Room Available
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontFamily: 'Poppins-SemiBold', fontSize: 18,
                                                        color: COLORS.primary,
                                                        fontWeight: "700",
                                                    }}
                                                >
                                                    Starts in
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontFamily: 'Poppins-SemiBold', fontSize: 18,
                                                        color: COLORS.primary,
                                                        fontWeight: "700",
                                                    }}
                                                >
                                                    {!Days || Days === 0 ? null : `${Days}D `}{!Hours || Hours === 0 ? '' : `${Hours}H `}{`${Minutes}M`}
                                                </Text>
                                            </View>
                                        )}
                                        {/* Ongoing */}
                                        {Days === 0 && Hours === 0 && Minutes === 0 && Item.Match_Status === 'Started' && !Match_Cancelled && (
                                            <View style={styles.EntryFeeWraper}>
                                                <Text
                                                    style={{
                                                        fontFamily: 'Poppins-SemiBold', fontSize: 18,
                                                        color: COLORS.primary,
                                                        fontWeight: "700",
                                                    }}
                                                >
                                                    Live
                                                </Text>
                                            </View>
                                        )}
                                        {/* Completed */}
                                        {Days === 0 && Hours === 0 && Minutes === 0 && Item.Match_Status === 'Completed' && (
                                            <View style={styles.EntryFeeWraper}>
                                                <Text
                                                    style={{
                                                        fontFamily: 'Poppins-SemiBold', fontSize: 18,
                                                        color: COLORS.primary,
                                                        fontWeight: "700",
                                                    }}
                                                >
                                                    Finished
                                                </Text>
                                            </View>
                                        )}
                                        {/* Cancelled */}
                                        {Match_Cancelled && (
                                            <View style={styles.EntryFeeWraper}>
                                                <Text
                                                    style={{
                                                        fontFamily: 'Poppins-SemiBold', fontSize: 18,
                                                        color: COLORS.primary,
                                                        fontWeight: "700",
                                                    }}
                                                >
                                                    Suspended
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                    {/* Match Info */}
                                    <View style={styles.InfoWrapper}>
                                        {/* Info Left Details */}
                                        <View>
                                            {/* Joined Players Number */}
                                            <View style={styles.InfoLeftItem}>
                                                <Text style={{
                                                    color: COLORS.darkGray2,
                                                    fontFamily: 'Poppins-SemiBold', fontSize: 14,
                                                }}>
                                                    Slots
                                                </Text>
                                                <Text
                                                    style={{
                                                        color: COLORS.black,
                                                        fontFamily: 'Poppins-SemiBold', fontSize: 16,
                                                        fontWeight: "700",
                                                    }}
                                                >
                                                    {Item.Joined_User.length}/{Item.Total_Players}
                                                </Text>
                                            </View>
                                            <View style={styles.InfoLeftItem}>
                                                <Text style={{
                                                    color: COLORS.darkGray2,
                                                    fontFamily: 'Poppins-SemiBold', fontSize: 14,
                                                }}>
                                                    Prize
                                                </Text>
                                                <Text
                                                    style={{
                                                        color: COLORS.primary,
                                                        fontFamily: 'Poppins-SemiBold', fontSize: 17,
                                                        fontWeight: "700",
                                                    }}
                                                >
                                                    &#x20B9; {Item.Perkill_Prize} Per Kill
                                                </Text>
                                            </View>
                                            <View style={styles.InfoLeftItem}>
                                                <Text style={{
                                                    color: COLORS.darkGray2,
                                                    fontFamily: 'Poppins-SemiBold', fontSize: 14,
                                                }}>
                                                    Entry
                                                </Text>
                                                <Text
                                                    style={{
                                                        color: COLORS.black,
                                                        fontFamily: 'Poppins-SemiBold', fontSize: 16,
                                                        fontWeight: "700",
                                                    }}
                                                >
                                                    &#x20B9; {Item.EntryFee}
                                                </Text>
                                            </View>
                                            {/* Match Map */}
                                            <View style={styles.InfoLeftItem}>
                                                <Text style={{
                                                    color: COLORS.darkGray2,
                                                    fontFamily: 'Poppins-SemiBold', fontSize: 14,
                                                }}>
                                                    Map
                                                </Text>
                                                <Text
                                                    style={{
                                                        color: COLORS.black,
                                                        fontFamily: 'Poppins-SemiBold', fontSize: 16,
                                                        fontWeight: "700",
                                                    }}
                                                >
                                                    {Item.Map}
                                                </Text>
                                            </View>
                                            {/* Match Date */}
                                            <View style={styles.InfoLeftItem}>
                                                <Text style={{
                                                    color: COLORS.darkGray2,
                                                    fontFamily: 'Poppins-SemiBold', fontSize: 14,
                                                }}>
                                                    Match Date
                                                </Text>
                                                <Text
                                                    style={{
                                                        color: COLORS.black,
                                                        fontFamily: 'Poppins-SemiBold', fontSize: 16,
                                                        fontWeight: "700",
                                                    }}
                                                >
                                                    {new Date(Item.Date_Time).toDateString()}
                                                </Text>
                                            </View>
                                            {/* Match Time */}
                                            <View style={styles.InfoLeftItem}>
                                                <Text style={{
                                                    color: COLORS.darkGray2,
                                                    fontFamily: 'Poppins-SemiBold', fontSize: 14,
                                                }}>
                                                    Time
                                                </Text>
                                                <Text
                                                    style={{
                                                        color: COLORS.black,
                                                        fontFamily: 'Poppins-SemiBold', fontSize: 16,
                                                        fontWeight: "700",
                                                    }}
                                                >{formatTime(new Date(Item.Date_Time).toLocaleTimeString())}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                {/* Info Right Image */}
                                <View>
                                    <Image source={ReturnGameImage(Item.Game_Name)} style={styles.InfoWrapperImage} />
                                </View>
                            </View>
                            <View>
                                {/* Hosted By */}
                                <View style={{ marginHorizontal: SIZES.padding, marginTop: Dpheight(8) }}>
                                    <Text style={{
                                        fontFamily: 'Poppins-SemiBold', fontSize: 19,
                                        fontWeight: "700",
                                        color: COLORS.black,
                                    }}>Hosted by</Text>
                                    {Get_Specific_Club_Reducer.loading ? (<View
                                        style={{
                                            flex: 1,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <ActivityIndicator size="small" color={COLORS.primary} />
                                    </View>) : (Get_Specific_Club_Reducer.Sucess ? (<TouchableOpacity onPress={() => setShow_Club_Menu_Modal(true)} style={{
                                        height: Dpheight(8),
                                        borderRadius: SIZES.radius,
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}>
                                        <Image
                                            style={{
                                                margin: 3,
                                                width: DPwidth(10),
                                                height: Dpheight(4),
                                                resizeMode: "contain",
                                            }}
                                            source={{ uri: `https://api.multiavatar.com/${Get_Specific_Club_Reducer?.Responce?.Profile_Pic}.png` }}
                                        />
                                        <View style={styles.GuildInfo}>
                                            <View>
                                                <Text
                                                    style={{
                                                        color: COLORS.black,
                                                        fontSize: 17,
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {Get_Specific_Club_Reducer.Responce.GuildName}
                                                </Text>
                                            </View>
                                            <ModalClub_Menu modalVisible={Show_Club_Menu_Modal}
                                                setModalVisible={setShow_Club_Menu_Modal}
                                                navigation={navigation}
                                                Club_Details={Get_Specific_Club_Reducer.Responce}
                                                Admin_Id={null}
                                            />
                                            <View style={{
                                                position: "absolute",
                                                right: 15
                                            }}>
                                                <Iconss name="ellipsis-horizontal" size={18} color="black" />
                                            </View>
                                        </View>
                                    </TouchableOpacity>) : (<View style={{ height: Dpheight(8), justifyContent: "center", alignItems: 'center' }}>
                                        <Text style={{ textAlign: "center", fontSize: SIZES.h3 }}>Error</Text>
                                    </View>))}
                                </View>
                                <View style={{
                                    marginTop: 20,
                                    marginBottom: 60
                                }}>
                                    <View style={{
                                        marginVertical: 30
                                    }}>
                                        {/* Participants */}
                                        <View style={styles.Elevation}>
                                            <View>
                                                <JoinedUserModal modalVisible={JoinedPlayermodal}
                                                    setModalVisible={setJoinedPlayermodal}
                                                    navigation={navigation}
                                                    Joined_User={Item.Joined_User}
                                                    Match={Item} />
                                            </View>
                                            <TouchableOpacity
                                                onPress={() => { setJoinedPlayermodal(true) }}>
                                                <View style={styles.GuildWrapper}>
                                                    <View style={{ margin: 10 }}><Icon name="users" size={Dpheight(3)} color="black" /></View>
                                                    {/* Info Of Guild */}
                                                    <View style={styles.GuildInfo}>
                                                        <View>
                                                            <Text
                                                                style={{
                                                                    color: COLORS.black,
                                                                    fontSize: 17,
                                                                    fontWeight: "bold",
                                                                }}
                                                            >
                                                                {Item.Match_Status === 'Completed' ? "Results" : 'Particpants'}
                                                            </Text>
                                                        </View>
                                                        <View
                                                            style={{
                                                                position: "absolute",
                                                                top: -2,
                                                                right: 15,
                                                            }}
                                                        >
                                                            <Icon name="angle-right" size={20} color="black" />
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                        {/* Join Button*/}
                        <View>
                            <PlayerGameNameInputModal modalVisible={PlayerInputModal}
                                setModalVisible={setPlayerInputModal}
                                Disable={Disable}
                                MatchId={Item._id}
                                MatchType={Item.Game_Name}
                                setDisable={setDisable}
                                loading={loading}
                                JoinMatchFunction={Join_Match_Action_Func} />
                            {(Minutes !== 0 || Days !== 0 || Hours !== 0) && (
                                <TouchableOpacity
                                    onPress={() => {
                                        setPlayVid(false)
                                        if (Item.Joined_User.length === Item.Total_Players) {
                                            Alert.alert("Message", "Oh Ho! Slots Full", [
                                                {
                                                    text: "OK",
                                                },
                                            ]);
                                            return;
                                        }
                                        const date = new Date(Item.Date_Time);
                                        const milliseconds = date.getTime();
                                        if (Date.now() >= milliseconds) {
                                            Alert.alert("Message", "Oh Ho! You Are Late , Match Allready Started", [
                                                {
                                                    text: "OK",
                                                },
                                            ]);
                                            return;
                                        }
                                        setPlayerInputModal(true)
                                    }}
                                    disabled={disable_joinmatch_button}
                                    style={styles.Floating_Button_Style}
                                >
                                    {Item.Joined_User.length === Item.Total_Players ? (<Text
                                        style={{
                                            color: COLORS.white,
                                            fontWeight: "bold",
                                            fontSize: 20,
                                        }}
                                    >
                                        Slots Full
                                    </Text>) : (<Text
                                        style={{
                                            color: COLORS.white,
                                            fontWeight: "bold",
                                            fontSize: 20,
                                        }}
                                    >
                                        Entry &#x20B9;{Item.EntryFee}
                                    </Text>)}
                                </TouchableOpacity>
                            )}
                        </View>
                    </>
                )}
            </View>
        </Modal>
    );
};

export default PlayerModal;

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
    HeaderLeft: {
        alignItems: "center",
        justifyContent: "center",
        width: DPwidth(10),
        height: Dpheight(5),
        borderWidth: 2,
        borderColor: "#CDCDCD",
        borderRadius: SIZES.radius,
    },
    TitleWraper: {
        marginHorizontal: SIZES.padding,
    },
    EntryFeeWraper: {
        marginTop: SIZES.padding,
        paddingHorizontal: SIZES.padding,
    },
    InfoWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: SIZES.padding,
        marginLeft: SIZES.padding,
    },
    InfoLeftItem: {
        marginBottom: SIZES.base,
    },
    InfoWrapperImage: {
        width: DPwidth(52),
        height: Dpheight(50),
        resizeMode: "stretch",
    },
    Elevation: {
        backgroundColor: "white",
        borderRadius: SIZES.radius,
        elevation: 3,
        marginVertical: 8,
        marginHorizontal: SIZES.padding,
        //For Ios Only -- SHOWdow code
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    GuildWrapper: {
        height: 60,
        borderRadius: SIZES.radius,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    GuildInfo: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    Floating_Button_Style: {
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 30,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        marginTop: SIZES.padding,
        borderRadius: 8,
        backgroundColor: COLORS.primary,
        marginHorizontal: SIZES.padding,
    },
});
