import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { IShortListedAPI, ProfileVisitors, TheyShortListedAPI } from '../services/endpoint'
import { ActivityIndicator } from 'react-native-paper'
import useSWR from 'swr'
import ProfileCard from './Card/ProfileCard'

const IShortListed = () => {

    const fetcher = async () => {
        const response = await IShortListedAPI();
        return response.data?.data;
    }

    const { data, error, isLoading } = useSWR('IShortListedAPI', fetcher)

    if (isLoading) {
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <ActivityIndicator size="large" />
        </View>
    }

    const renderProfile = ({ item }) => (
        <ProfileCard item={item?.interactedBy} />
    );

    return (
        <View>
            <FlatList
                data={data}
                renderItem={renderProfile}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.profileList}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 16,
        backgroundColor: '#fff',
    },
    profileList: {
        padding: 5
    },
})

export default IShortListed