import React, { useEffect, useCallback } from "react";
import { FlatList, View, StyleSheet, RefreshControl } from "react-native";
import { ActivityIndicator, Avatar, Button, Text } from "react-native-paper";
import ProfileCard from "./Card/ProfileCard";
import { GetProfileDetailUser } from "../services/endpoint";
import { GetAllUsers } from "../services/calls/GetAllUsers.api";
import useSWR from "swr";

const HomeComponent = () => {
    const [config, setConfig] = React.useState({ refreshing: false });
    const [loadMoreLoading, setLoadMoreLoading] = React.useState(false);
    const [usersData, setUsersData] = React.useState([]);
    const [userMeta, setUserMeta] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [isEndReached, setIsEndReached] = React.useState(false);
    const [page, setPage] = React.useState(1);

    const fetcher = async () => {
        const response = await GetProfileDetailUser()
        return response.data?.data
    }

    const { data, isLoading, error } = useSWR('fetchUserProfileDetails', fetcher)

    const fetchData = useCallback(async (currentPage) => {
        try {
            const response = await GetAllUsers(currentPage);
            return response.data;
        } catch (error) {
            console.error("Error fetching users:", error);
            return { data: [], meta: {} };
        }
    }, []);

    useEffect(() => {
        const fetchInitialData = async () => {
            const response = await fetchData(1);
            setUsersData(response.data);
            setUserMeta(response.meta);
            setIsEndReached(response.meta.totalUsers - 1 <= response.data.length);
            
            setLoading(false);
        };

        fetchInitialData();
    }, [fetchData]);

    const handleLoadMore = async () => {
        if (loading || loadMoreLoading || isEndReached) return;

        setLoadMoreLoading(true);
        const response = await fetchData(page + 1);

        setUsersData((prev) => [...prev, ...response.data]);
        setUserMeta(response.meta);
        setIsEndReached(response.meta.totalUsers <= usersData.length + response.data.length);
        setPage((prev) => prev + 1);
        setLoadMoreLoading(false);
    };

    const handleRefresh = async () => {
        setConfig({ ...config, refreshing: true });
        const response = await fetchData(1);

        setUsersData(response.data);
        setUserMeta(response.meta);
        setIsEndReached(response.meta.totalUsers <= response.data.length);
        setPage(1);
        setConfig({ ...config, refreshing: false });
    };

    const renderHeader = () => (
        <View style={styles.profileContainer}>
            <Avatar.Image size={100} source={
                {
                    uri: data?.avatar
                }
            } />
            <View
                style={{
                    display: "flex",
                    marginLeft: 10,
                    marginTop: 10,
                }}
            >
                <View style={styles.profileInfo}>
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: "bold",
                        }}
                    >
                        {data?.firstName + " " + data?.lastName}
                    </Text>
                    <Text> ID: {data?.shortId}</Text>
                </View>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 0,
                        marginVertical: 16,
                    }}
                >

                    <Button mode="contained" style={styles.button}>
                        Boost Profile
                    </Button>
                    <Button mode="outlined" style={styles.button}>
                        Premium
                    </Button>
                </View>
            </View>

        </View>
    );

    const renderItem = useCallback(({ item }) => <ProfileCard item={item} />, []);

    const renderFooter = () =>
        loadMoreLoading ? <ActivityIndicator animating size={22} style={{ marginVertical: 10 }} /> : null;

    if (loading || isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={usersData}
                keyExtractor={(item) => item._id.toString()}
                ListHeaderComponent={() => (
                    <>
                        {renderHeader()}
                        <Text style={styles.sectionTitle}>Daily Recommendation</Text>
                    </>
                )}
                renderItem={renderItem}
                ListFooterComponent={renderFooter}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                refreshControl={
                    <RefreshControl
                        refreshing={config.refreshing}
                        onRefresh={handleRefresh}
                    />
                }
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#FFF3F4",
    },
    profileInfo: {
        flex: 1,
        marginLeft: 16,
    },
    actionButtons: {
        flexDirection: "row",
        marginVertical: 16,
    },
    button: {
        marginHorizontal: 4,
    },
    list: {
        paddingBottom: 80, // Space for the bottom bar
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 8,
        marginLeft: 16,
    },
});

export default HomeComponent;
