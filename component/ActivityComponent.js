import React from 'react';
import { FlatList, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, Text, Button, Chip, ActivityIndicator } from 'react-native-paper';
import ProfileCard from './Card/ProfileCard';
import { GetAcceptedRequest, ProfileVisitors, ReceviedInterest, SentFriendRequest, TheyShortListedAPI } from '../services/endpoint';
import useSWR from 'swr';
import { useRouter } from 'expo-router';

const profiles = [
    {
        id: '1',
        name: 'John Doe',
        details: 'Current location/Education/Age/Weight/Place/Height/Status',
    },
    {
        id: '2',
        name: 'Jane Smith',
        details: 'Current location/Education/Age/Weight/Place/Height/Status',
    },
    {
        id: '3',
        name: 'Sam Wilson',
        details: 'Current location/Education/Age/Weight/Place/Height/Status',
    },
    {
        id: '4',
        name: 'Sarah Johnson',
        details: 'Current location/Education/Age/Weight/Place/Height/Status',
    },
    {
        id: '5',
        name: 'John Doe',
        details: 'Current location/Education/Age/Weight/Place/Height/Status',
    },
    {
        id: '6',
        name: 'Jane Smith',
        details: 'Current location/Education/Age/Weight/Place/Height/Status',
    },
    {
        id: '7',
        name: 'Sam Wilson',
        details: 'Current location/Education/Age/Weight/Place/Height/Status',
    },
    {
        id: '8',
        name: 'Sarah Johnson',
        details: 'Current location/Education/Age/Weight/Place/Height/Status',
    },
    {
        id: '9',
        name: 'John Doe',
        details: 'Current location/Education/Age/Weight/Place/Height/Status',
    },
    {
        id: '10',
        name: 'Jane Smith',
        details: 'Current location/Education/Age/Weight/Place/Height/Status',
    },
    {
        id: '11',
        name: 'Sam Wilson',
        details: 'Current location/Education/Age/Weight/Place/Height/Status',
    },
    {
        id: '12',
        name: 'Sarah Johnson',
        details: 'Current location/Education/Age/Weight/Place/Height/Status',
    },
    {
        id: '13',
        name: 'John Doe',
        details: 'Current location/Education/Age/Weight/Place/Height/Status',
    },
    {
        id: '14',
        name: 'Jane Smith',
        details: 'Current location/Education/Age/Weight/Place/Height/Status',
    },
    {
        id: '15',
        name: 'Sam Wilson',
        details: 'Current location/Education/Age/Weight/Place/Height/Status',
    },
    {
        id: '16',
        name: 'Sarah Johnson',
        details: 'Current location/Education/Age/Weight/Place/Height/Status',
    },
    {
        id: '17',
        name: 'John Doe',
        details: 'Current location/Education/Age/Weight/Place/Height/Status',
    }

];

const ActivityComponent = () => {
    const router = useRouter();

    const fetcher4 = async () => {
        const response = await ProfileVisitors();
        console.log("response",response?.data)
        return response.data?.interactionCount || [];
    }

    const { data:count, error, isLoading: isLoaindg4 } = useSWR('profileVisotrs-count', fetcher4)

    const fetcher5 = async () => {
        const response = await TheyShortListedAPI();
        console.log("response",response?.data)
        return response.data?.interactionCount;
    }

    const { data:count2, isLoading: isLoading5} = useSWR('theyShortListedAPI-count', fetcher5)

    const [activeTab, setActiveTab] = React.useState('Interest');

    const fetcher = async () => {
        const response = await ReceviedInterest();
        return response.data?.data;
    }

    const { data: received, isLoading: isLoading1 } = useSWR('interests', fetcher);

    const fetcher2 = async () => {
        const response = await GetAcceptedRequest();
        return response.data?.data;
    }

    const { data: accepted, isLoading: isLoading3 } = useSWR('accepted', fetcher2);

    const fetcher3 = async () => {
        const response = await SentFriendRequest();
        return response.data?.data;
    }

    const { data: sent, isLoading, isError } = useSWR('sent', fetcher3);

    const renderProfile = ({ item }) => (
        <ProfileCard item={item?.receiver} />
    );
    const renderProfile2 = ({ item }) => (
        <ProfileCard item={item?.receiver} />
    ); 
    const renderProfile3 = ({ item }) => (
        <ProfileCard item={item?.sender}
        cardType="received"
        friendReqId={item._id}
        />
    );

    if (isLoading1 || isLoading || isLoading3 || isLoaindg4 || isLoading5) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {/* Top Summary Section */}
            <View style={styles.summaryRow}>

                <Card style={styles.summaryCard}>
                    <TouchableOpacity onPress={() => {
                        router.push('ProfileVisit')
                    }}
                    >
                        <Card.Content>
                            <Text variant="titleMedium">Profile visit data</Text>
                            <Text variant="bodySmall">{count} profiles</Text>
                        </Card.Content>
                    </TouchableOpacity>
                </Card>

                <Card style={styles.summaryCard}>
                    <TouchableOpacity onPress={() => {
                        router.push('Shortlisted')
                    }}>
                        <Card.Content>
                            <Text variant="titleMedium">Shortlisted</Text>
                            <Text variant="bodySmall">{count2} profiles</Text>
                        </Card.Content>
                    </TouchableOpacity>
                </Card>
            </View>

            {/* Interest Section */}
            {/* <View style={styles.interestSection}>
        <Text variant="titleLarge"
        style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}
        >Interest</Text>
        <Button mode="text" onPress={() => {}}>
          See all
        </Button>
      </View> */}
            <View style={styles.chipRow}>

                <TouchableOpacity onPress={() => setActiveTab('Interest')}>
                    <Chip
                        mode={activeTab === 'Interest' ? 'contained' : 'outlined'}
                        style={styles.chip}>
                        Received

                    </Chip>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setActiveTab('Accepted')}>
                    <Chip
                        mode={activeTab === 'Accepted' ? 'contained' : 'outlined'}
                        style={styles.chip}>
                        Accepted
                    </Chip>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setActiveTab('Sent')}>
                    <Chip
                        mode={activeTab === 'Sent' ? 'contained' : 'outlined'}
                        style={styles.chip}>
                        Sent
                    </Chip>
                </TouchableOpacity>
            </View>

            {/* Profiles List */}
            {


                activeTab === 'Interest' && <FlatList
                    data={received}
                    renderItem={renderProfile3}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.profileList}
                    showsVerticalScrollIndicator={false}
                />
            }

            {
                activeTab === 'Interest' && received.length === 0 && (
                    <View style={styles.noChatsContainer}>
                        <Text style={styles.noChatsText}>
                            No Received Interest found 🙃</Text>
                    </View>
                )
            }

            {
                activeTab === 'Accepted' && <FlatList
                    data={accepted}
                    renderItem={renderProfile2}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.profileList}
                    showsVerticalScrollIndicator={false}
                />
            }

            {
                activeTab === 'Accepted' && accepted.length === 0 && (
                    <View style={styles.noChatsContainer}>
                        <Text style={styles.noChatsText}>
                            No Accepted Request found 🙃</Text>
                    </View>
                )
            }

            {
                activeTab === 'Sent' && <FlatList
                    data={sent}
                    renderItem={renderProfile}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.profileList}
                    showsVerticalScrollIndicator={false}
                />
            }

{
                activeTab === 'Sent' && sent.length === 0 && (
                    <View style={styles.noChatsContainer}>
                        <Text style={styles.noChatsText}>No Sent Request Found 🙃</Text>
                    </View>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 16,
        backgroundColor: '#fff3f4',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    summaryCard: {
        width: '48%',
        padding: 8,
        borderRadius: 15,
        padding: 10,
        backgroundColor: '#fff',
    },
    interestSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        marginLeft: 10,
    },
    chipRow: {
        flexDirection: 'row',
        marginBottom: 16,
        marginLeft: 10,
        marginTop: 10,
    },
    chip: {
        marginRight: 8,
    },
    profileList: {
        paddingBottom: 16,
    },
    profileCard: {
        marginBottom: 16,
    },
    profileContent: {
        flexDirection: 'row',
        alignItems: 'center',
        // padding: 16,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
        backgroundColor: '#e0e0e0',
    },
    profileText: {
        flex: 1,
    },
    heartButton: {
        alignSelf: 'flex-start',
    },
    noChatsContainer: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        height: "100%",
        marginTop: -150,
    },
    noChatsText: {
        fontWeight: '700',
        fontSize: 20,
        letterSpacing: 1,
        color: '#333',
    },
});

export default ActivityComponent;
