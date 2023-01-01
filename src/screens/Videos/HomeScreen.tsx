import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, Alert, Text, ScrollView, RefreshControl } from "react-native";
import { COLORS, SIZES } from "../../constants/Theame";
import VideoListItem from "./VideoListItem";
import { Ip_Address } from '../../constants/Data';
import axios from 'axios';
import { Return_Token } from '../../utils/Utils';

const HomeScreen = ({ navigation }: { navigation: any }) => {
    const [refreshing, setRefreshing] = useState(false);
    const wait = (timeout: any) => {
        return new Promise((resolve) => setTimeout(resolve, timeout));
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setData_Length(0)
        setPage(1)
        setData([] as Array<any>)
        FetchData(1, false);
        wait(500).then(() => setRefreshing(false));
    }, []);

    const [Loading, setLoading] = useState(true)
    const [Data_Length, setData_Length] = useState(0)
    const [Page, setPage] = useState(1);
    const [Data, setData] = useState([] as Array<any>);

    async function FetchData(Page: Number, Issame: Boolean) {
        try {
            setLoading(true)
            const Token: string = (await Return_Token(
                null,
                null,
            )) as string;
            const response = await axios.get(
                `${Ip_Address}/GetVideosMatches?Page=${Page}`,
                {
                    headers: {
                        'content-type': 'application/json',
                        Accept: 'application/json',
                        authToken: Token,
                    },
                },
            );
            if (Data.length > 0 && Issame) {
                setData([...Data, ...response.data])
            } else {
                setData(response.data)
            }
            setLoading(false);
            setData_Length(response.data.length);
        } catch (error: any) {
            Alert.alert("Error", error.message, [
                {
                    text: "OK",
                },
            ]);
        }
    }

    function WhenEndReached() {
        if (Data_Length === 10) {
            FetchData(Page + 1, true);
            setPage((Previous) => Previous + 1);
        }
    }

    useEffect(() => {
        FetchData(1, false)
    }, []);

    return (
        <View style={styles.container}>
            {Loading ? (<View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>) : Data && Data.length === 0 ? (
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: SIZES.h2,
                            fontWeight: "700",
                            marginTop: 330
                        }}
                    >
                        No Data
                    </Text>
                </ScrollView>
            ) : (
                <FlatList
                    data={Data}
                    keyExtractor={(Item) => `${Item._id}`}
                    showsVerticalScrollIndicator={false}
                    onRefresh={() => {
                        setData_Length(0)
                        setPage(1)
                        setData([] as Array<any>)
                        FetchData(1, false);
                    }}
                    refreshing={Loading}
                    renderItem={({ item }) => <VideoListItem Item={item} navigation={navigation} />}
                    onEndReached={() => {
                        WhenEndReached();
                    }}
                    onEndReachedThreshold={0}
                    ListFooterComponent={(<View>
                        {Data_Length === 10 && <View
                            style={{
                                marginVertical: 16,
                                alignItems: "center",
                            }}
                        >
                            <ActivityIndicator size="large" color={COLORS.primary} />
                        </View>}
                    </View>)}
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