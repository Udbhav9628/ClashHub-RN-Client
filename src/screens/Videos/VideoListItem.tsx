import React, { useEffect, useState } from "react";
import { View, Text, Image, Alert } from "react-native";
import styles from "./styles";
import { getYoutubeMeta } from "react-native-youtube-iframe";
import PlayerModal from "./PlayerModal";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, FONTS, DPwidth, Dpheight } from "../../constants/Theame";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";

const VideoListItem = ({
    Item,
}: {
    Item: any
}) => {

    const [modalVisible, setModalVisible] = useState(false);

    const [YTMeta, setYTMeta] = useState({
        title: '',
        thumbnail_url: 'https://static.videezy.com/system/resources/thumbnails/000/014/052/original/loading-circle-bars.jpg',
    })

    async function YtMetaData() {
        try {
            const meta = await getYoutubeMeta(Item.RoomDetails.YT_Video_id)
            setYTMeta(meta)
        } catch (error: any) {
            Alert.alert(
                "Error",
                error,
                [
                    {
                        text: "OK",
                    },
                ]
            );
        }
    }
    useEffect(() => {
        YtMetaData()
    }, [])



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

    function Return_Match_Status() {
        if (Days === 0 && Hours === 0 && Minutes === 0 && Item.Match_Status === 'Started' && !Match_Cancelled) {
            return (<Text style={styles.time}>
                Live
            </Text>)
        } else if (Days === 0 && Hours === 0 && Minutes === 0 && Item.Match_Status === 'Completed') {
            return (<Text style={styles.time}>
                Finished
            </Text>)
        } else if (Match_Cancelled) {
            return (<Text style={styles.time}>
                Suspended
            </Text>)
        }
    }

    const { User } = useSelector((state: any) => state.FetchUser_reducer);

    const isJoined = Item.Joined_User.find((Item: any) => {
        return Item.UserId === User.id;
    });

    return (
        <View>
            <PlayerModal
                Item={Item}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
            <TouchableOpacity style={styles.videoCard} onPress={() => setModalVisible(true)}>
                {/* Tumbnail */}
                <View>
                    <Image style={styles.thumbnail} source={{ uri: `${YTMeta?.thumbnail_url}` }} />
                    <View style={styles.timeContainer}>
                        <Text style={styles.time}>
                            Per Kill  &#x20B9;{Item?.Perkill_Prize}
                        </Text>
                    </View>
                    <View style={styles.timeContainer2}>
                        {Days === 0 && Hours === 0 && Minutes === 0 ? (
                            Return_Match_Status()) : (<Text style={styles.time}>
                                {!Days || Days === 0 ? '' : `${Days}D,`} {!Hours || Hours === 0 ? '' : `${Hours}H:`}{Minutes}M
                            </Text>)}
                    </View>
                    {isJoined && (<View style={styles.timeContainer3}>
                        <Text style={styles.time}>
                            Joined
                        </Text>
                    </View>)}
                </View>

                {/* Title row */}
                <View style={styles.titleRow}>
                    {/* Avatar */}
                    <Image style={styles.avatar} source={{ uri: `https://api.multiavatar.com/${Item.GuildId}.png` }} />

                    {/* Middle container: Title, subtitle, etc. */}
                    <View style={styles.midleContainer}>
                        <Text style={styles.title}>{`${Item.Game_Name} ${Item.GameType}`}</Text>
                        {/* <Progressbar step={Item?.Joined_User.length} totalsteps={Item?.Total_Players} Height={7} /> */}
                        <View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <Text style={{
                                        fontFamily: 'Poppins-Regular',
                                        fontSize: Dpheight(0.6) * DPwidth(0.7), color: COLORS.darkGray2
                                    }}>Slots  </Text>
                                    <Text
                                        style={{
                                            color: COLORS.black, fontFamily: 'Poppins-Regular',
                                            fontSize: Dpheight(0.6) * DPwidth(0.7), fontWeight: "700"
                                        }}
                                    >
                                        {Item?.Joined_User.length} / {Item?.Total_Players}
                                    </Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <Text style={{
                                        fontFamily: 'Poppins-Regular',
                                        fontSize: Dpheight(0.6) * DPwidth(0.7), color: COLORS.darkGray2
                                    }}>Entry  </Text>
                                    <Text
                                        style={{
                                            color: COLORS.black, fontFamily: 'Poppins-Regular',
                                            fontSize: Dpheight(0.6) * DPwidth(0.7), fontWeight: "700"
                                        }}
                                    >
                                        &#x20B9;{Item?.EntryFee}
                                    </Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <Text style={{
                                        fontFamily: 'Poppins-Regular',
                                        fontSize: Dpheight(0.6) * DPwidth(0.7), color: COLORS.darkGray2
                                    }}>Map  </Text>
                                    <Text
                                        style={{
                                            color: COLORS.black, fontFamily: 'Poppins-Regular',
                                            fontSize: Dpheight(0.6) * DPwidth(0.7), fontWeight: "700"
                                        }}
                                    >
                                        {Item?.Map}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity >
        </View>
    );
};

export default VideoListItem;