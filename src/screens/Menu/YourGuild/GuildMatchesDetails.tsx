import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Iconss from "react-native-vector-icons/MaterialIcons";
import { SIZES, COLORS, FONTS, Dpheight, DPwidth } from "../../../constants/Theame";
import { useFocusEffect } from "@react-navigation/native";
import ModalJoinedPlayers from "./ModalJoinedPlayers";
import BottomPopup from "../../../components/BottomPopup";
import MatchUpdateModal from "../../../components/MatchUpdateModal";
import ClubFollowres from "./ClubFollowres";
import RoomDetailsModal from "../../Home/RoomDetailsModal";
import LiveYtModal from "./LiveYtModal";
import Player from "../../../components/Player";

const GuildMatchesDetails = ({
    route,
    navigation,
}: {
    route: any;
    navigation: any;
}) => {
    const { Item, GameImage
    } = route.params;

    const [modalVisible, setModalVisible] = useState(false)
    const [RoomDetailsModals, setRoomDetailsModal] = useState(false)
    const [Disable, setDisable] = useState(false)

    const [JoinedPlayermodal, setJoinedPlayermodal] = useState(false);
    const [ShowParticipants_Modal, setShowParticipants_Modal] = useState(false);
    const [ShowYt_Modal, setShowYt_Modal] = useState(false);

    const [Days, setDays] = useState(0);
    const [Hours, setHours] = useState(0);
    const [Minutes, setMinutes] = useState(0);

    const Second = 1000;
    const Minute = Second * 60;
    const Hour = Minute * 60;
    const Day = Hour * 24;

    const [Match_Cancelled, setMatch_Cancelled] = useState(false)

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
            Start_Timer();
            return () => clearInterval(Timer);
        }, [])
    );

    useEffect(() => {
        Timer_Function()
    }, []);

    return (
        <View style={style.container}>
            <ScrollView>
                {/* Header */}
                <View style={style.Header}>
                    {/* Header Left */}
                    <TouchableOpacity
                        style={style.HeaderLeft}
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name="angle-left" size={20} color="black" />
                    </TouchableOpacity>
                    <View
                        style={{
                            marginLeft: "24%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                color: COLORS.black,
                                ...FONTS.h2,
                                fontWeight: "700",
                            }}
                        >
                            Match Details
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        flex: 1,
                        marginTop: SIZES.padding,
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
                        <View style={style.TitleWraper}>
                            <Text
                                style={{
                                    fontFamily: 'Poppins-SemiBold', fontSize: 22,
                                    fontWeight: "700",
                                    color: COLORS.black,
                                }}
                            >
                                {Item.Game_Name} {Item.GameType} {Item._id.slice(-2)} Match
                            </Text>
                        </View>
                        {/* Match Status */}
                        <View>
                            {/* Secheduled */}
                            {(Minutes !== 0) && (Item.Match_Status === 'Scheduled') && (
                                <View style={style.EntryFeeWraper}>
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
                                <View style={style.EntryFeeWraper}>
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
                                <View style={style.EntryFeeWraper}>
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
                                <View style={style.EntryFeeWraper}>
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
                                <View style={style.EntryFeeWraper}>
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
                        <View style={style.InfoWrapper}>
                            {/* Info Left Details */}
                            <View>
                                {/* Match Map */}
                                <View style={style.InfoLeftItem}>
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
                                <View style={style.InfoLeftItem}>
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
                                <View style={style.InfoLeftItem}>
                                    <Text style={{
                                        color: COLORS.darkGray2,
                                        fontFamily: 'Poppins-SemiBold', fontSize: 14,
                                    }}>
                                        Time - 24H Format
                                    </Text>
                                    <Text
                                        style={{
                                            color: COLORS.black,
                                            fontFamily: 'Poppins-SemiBold', fontSize: 16,
                                            fontWeight: "700",
                                        }}
                                    >
                                        {new Date(Item.Date_Time).toLocaleTimeString().slice(0, 5)}
                                    </Text>
                                </View>
                                {/* prize */}
                                <View style={style.InfoLeftItem}>
                                    <Text style={{
                                        color: COLORS.darkGray2,
                                        fontFamily: 'Poppins-SemiBold', fontSize: 14,
                                    }}>
                                        Prize
                                    </Text>
                                    <Text
                                        style={{
                                            color: COLORS.black,
                                            fontFamily: 'Poppins-SemiBold', fontSize: 16,
                                            fontWeight: "700",
                                        }}
                                    >
                                        &#x20B9; {Item.Perkill_Prize} Per Kill
                                    </Text>
                                </View>
                                {/* Profit Per Player */}
                                <View style={style.InfoLeftItem}>
                                    <Text style={{
                                        color: COLORS.darkGray2,
                                        fontFamily: 'Poppins-SemiBold', fontSize: 14,
                                    }}>
                                        Profit Per Player
                                    </Text>
                                    <Text
                                        style={{
                                            color: COLORS.black,
                                            fontFamily: 'Poppins-SemiBold', fontSize: 16,
                                            fontWeight: "700",
                                        }}
                                    >
                                        &#x20B9; {Item.EntryFee - Item.Perkill_Prize}
                                    </Text>
                                </View>
                                {/* Joined Players Number */}
                                <View style={style.InfoLeftItem}>
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
                                {/* Entry Fee */}
                                <View style={style.InfoLeftItem}>
                                    <Text style={{
                                        color: COLORS.darkGray2,
                                        fontFamily: 'Poppins-SemiBold', fontSize: 14,
                                    }}>
                                        Entry Fee
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
                            </View>
                        </View>
                    </View>
                    {/* Info Right Image */}
                    <View>
                        <Image source={GameImage} style={style.InfoWrapperImage} />
                    </View>
                </View>
                {/* Bottom */}
                <View style={{
                    marginTop: 60,
                    marginBottom: 60
                }}>
                    {/* Bottom Button*/}
                    <ModalJoinedPlayers modalVisible={JoinedPlayermodal}
                        setModalVisible={setJoinedPlayermodal}
                        navigation={navigation}
                        Joined_User={Item.Joined_User} Match={Item}
                        ShowReportButton={false} />
                    {/* Results - Ongoing , Completed */}
                    {Item.Match_Status !== 'Scheduled' && !Match_Cancelled && Minutes === 0 && (
                        <View style={style.Elevation}>
                            <TouchableOpacity onPress={() => { setJoinedPlayermodal(true) }}
                            >
                                <View style={style.GuildWrapper}>
                                    <Image
                                        style={{
                                            margin: 3,
                                            width: DPwidth(12),
                                            height: Dpheight(5),
                                            borderRadius: SIZES.radius,
                                            resizeMode: "contain",
                                        }}
                                        source={{
                                            uri: "https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-result-internet-marketing-service-flaticons-flat-flat-icons.png",
                                        }}
                                    />
                                    {/* Info Of Guild */}
                                    <View style={style.GuildInfo}>
                                        <View>
                                            <Text
                                                style={{
                                                    color: COLORS.black,
                                                    fontSize: 17,
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {Item.Match_Status === 'Started' ? "Update Players Kills" : 'See Result'}
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
                        </View>)}
                    {/* Go Live */}
                    {Item.Match_Status === 'Started' && (<View style={style.Elevation}>
                        <View>
                            {Item.RoomDetails.YT_Video_id ? <Player
                                Item={Item}
                                modalVisible={ShowYt_Modal}
                                setModalVisible={setShowYt_Modal}
                            /> : <LiveYtModal modalVisible={ShowYt_Modal}
                                setModalVisible={setShowYt_Modal}
                                navigation={navigation}
                                Disable={Disable}
                                setDisable={setDisable}
                                MatchId={Item._id} />}
                        </View>
                        <TouchableOpacity onPress={() => { setShowYt_Modal(true) }}
                        >
                            <View style={style.GuildWrapper}>
                                <View style={{ margin: 13 }}><Iconss name="live-tv" size={Dpheight(3.4)} color="black" /></View>
                                <View style={style.GuildInfo}>
                                    <View>
                                        <Text
                                            style={{
                                                color: COLORS.black,
                                                fontSize: 17,
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {Item.RoomDetails.YT_Video_id ? "Watch" : "Broadcast"}
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
                    </View>)}
                    {/* Room Details */}
                    {Item.Match_Status === 'Started' && (<View style={style.Elevation}>
                        <RoomDetailsModal modalVisible={RoomDetailsModals}
                            setModalVisible={setRoomDetailsModal}
                            MatchId={Item._id} RoomDetails={Item.RoomDetails} />
                        <TouchableOpacity
                            onPress={() => { setRoomDetailsModal(true) }}>
                            <View style={style.GuildWrapper}>
                                <View style={{ margin: 12 }}><Icon name="info-circle" size={Dpheight(3)} color="black" /></View>
                                {/* Info Of Guild */}
                                <View style={style.GuildInfo}>
                                    <View>
                                        <Text
                                            style={{
                                                color: COLORS.black,
                                                fontSize: 17,
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Room Details
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
                    </View>)}
                    {/* Participants*/}
                    <View style={{ marginBottom: 25 }}>
                        <View style={style.Elevation}>
                            <View>
                                <ClubFollowres modalVisible={ShowParticipants_Modal}
                                    setModalVisible={setShowParticipants_Modal}
                                    navigation={navigation}
                                    Followers={Item.Joined_User} />
                            </View>
                            <TouchableOpacity onPress={() => { setShowParticipants_Modal(true) }}
                            >
                                <View style={style.GuildWrapper}>
                                    <View style={{ margin: 10 }}><Icon name="users" size={Dpheight(3.4)} color="black" /></View>
                                    {/* Info Of Guild */}
                                    <View style={style.GuildInfo}>
                                        <View>
                                            <Text
                                                style={{
                                                    color: COLORS.black,
                                                    fontSize: 17,
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Participants {Item.Joined_User.length}
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
                    {/* Updates */}
                    <View>
                        <MatchUpdateModal
                            Days={Days}
                            Hours={Hours}
                            Minutes={Minutes}
                            Match_Status={Item.Match_Status} />
                    </View>
                    {/* Bottom Button */}
                    <BottomPopup
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        MatchId={Item._id}
                        Amount={null}
                        Match_Status={Item.Match_Status}
                        Disable={Disable}
                        setDisable={setDisable}
                        navigation={navigation}
                        ModalContainerStyle={
                            {
                                position: "absolute",
                                bottom: -8,
                                left: 2,
                                right: 2,
                                margin: 10,
                                height: 380,
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
                        }
                    />
                </View>
            </ScrollView>
            {Item.Match_Status === 'Scheduled' && !Match_Cancelled && (
                <TouchableOpacity
                    onPress={() => {
                        setModalVisible(true)
                    }}
                    style={style.Floating_Button_Style}
                >
                    <Text
                        style={{
                            color: COLORS.white,
                            fontWeight: "bold",
                            fontSize: 17,
                        }}
                    >
                        Enter Room Details
                    </Text>
                </TouchableOpacity>
            )
            }
        </View>
    )
}

export default GuildMatchesDetails

const style = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flex: 1,
    },
    Header: {
        marginTop: 10,
        flexDirection: "row",
        marginHorizontal: 17,
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
        marginHorizontal: SIZES.padding,
        marginVertical: 12,
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