import React from 'react';
import { FlatList, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, Text, Button, Chip } from 'react-native-paper';
import ProfileCard from './Card/ProfileCard';

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

    const [activeTab, setActiveTab] = React.useState('Interest');

    const renderProfile = ({ item }) => (
        <ProfileCard item={item} />
    );

    return (
        <View style={styles.container}>
            {/* Top Summary Section */}
            <View style={styles.summaryRow}>
                <Card style={styles.summaryCard}>
                    <Card.Content>
                        <Text variant="titleMedium">Profile visit data</Text>
                        <Text variant="bodySmall">0 profiles</Text>
                    </Card.Content>
                </Card>
                <Card style={styles.summaryCard}>
                    <Card.Content>
                        <Text variant="titleMedium">Shortlisted</Text>
                        <Text variant="bodySmall">0 profiles</Text>
                    </Card.Content>
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
                        Interest
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
            <FlatList
                data={profiles}
                renderItem={renderProfile}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.profileList}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 16,
        backgroundColor: '#f5f5f5',
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
});

export default ActivityComponent;
