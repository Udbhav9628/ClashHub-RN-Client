import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, Alert } from "react-native";
import { COLORS } from "../../constants/Theame";
import VideoListItem from "./VideoListItem";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Fetch_All_Matchs_Videos, Clear_Match_Reducer_Error } from "../../store/Match/Matchaction";

const HomeScreen = () => {

    const { Matchs_Have_Vid, loading, Error } = useSelector(
        (state: any) => state.Get_Matches_Videos
    );

    const dispatch = useDispatch();
    const Fetch_All_Matchs_Videos_Func = bindActionCreators(
        Fetch_All_Matchs_Videos,
        dispatch
    );

    const Clear_Match_ReducerError = bindActionCreators(
        Clear_Match_Reducer_Error,
        dispatch
    );

    useEffect(() => {
        Fetch_All_Matchs_Videos_Func()
    }, [])

    useEffect(() => {
        if (Error) {
            Clear_Match_ReducerError();
            Alert.alert(
                "Error",
                Error,
                [
                    {
                        text: "OK",
                    },
                ]
            );
        }
    }, [Error]);

    return (
        <View style={styles.container}>
            {loading ? (<View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>) : (
                <FlatList
                    data={Matchs_Have_Vid}
                    keyExtractor={(Item) => `${Item._id}`}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <VideoListItem Item={item} />}
                />)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flex: 1,
    },
});

export default HomeScreen;