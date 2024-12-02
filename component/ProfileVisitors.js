import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { ProfileVisitors } from '../services/endpoint'
import { ActivityIndicator } from 'react-native-paper'
import useSWR from 'swr'
import ProfileCard from './Card/ProfileCard'

const ProfileVisitorsComponent = () => {

    const fetcher = async () => {
        const response = await ProfileVisitors();
        return response.data?.data || [];
    }

    const { data, error, isLoading } = useSWR('profileVisotrs', fetcher)

   

    const renderProfile = ({ item }) => (
        <ProfileCard item={item?.interactedBy} />
    );

    if (isLoading) {
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <ActivityIndicator size="large" />
        </View>
    }

    return (
        <View>
             
             {
                data?.length === 0 && (
                    <View style={styles.noChatsContainer}>
                        <Text style={styles.noChatsText}>No Profile Visitors Yet 🙃</Text>
                    </View>
                )
            }
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
    noChatsContainer: {
        alignItems: 'center',
        marginTop: 200
      },
      noChatsText: {
        fontWeight: '600',
        fontSize: 24,
        letterSpacing: 1,
        color: '#333',
      },
})

export default ProfileVisitorsComponent