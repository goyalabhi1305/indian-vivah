import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Appbar, Button, Card, Avatar, Text } from "react-native-paper";
import ProfileCard from "./Card/ProfileCard";

const DATA = [
    {
        id: "1",
        name: "John Doe",
        location: "New York",
        education: "Masters",
        age: 30,
        weight: "70kg",
        height: "5'9\"",
        status: "Single",
    },
    {
        id: "2",
        name: "Jane Smith",
        location: "California",
        education: "PhD",
        age: 28,
        weight: "60kg",
        height: "5'6\"",
        status: "Single",
    },
    {
        id: "3",
        name: "Alice Johnson",
        location: "Texas",
        education: "Bachelors",
        age: 32,
        weight: "65kg",
        height: "5'7\"",
        status: "Married",
    },
    {
        id: "4",
        name: "Bob Brown",
        location: "Florida",
        education: "High School",
        age: 25,
        weight: "75kg",
        height: "6'0\"",
        status: "Single",
    },
    {
        id: "5",
        name: "Charlie Davis",
        location: "Washington",
        education: "Masters",
        age: 29,
        weight: "80kg",
        height: "5'10\"",
        status: "Married",
    },
    {
        id: "6",
        name: "David Lee",
        location: "Oregon",
        education: "Bachelors",
        age: 31,
        weight: "70kg",
        height: "5'8\"",
        status: "Single",
    },
    {
        id: "7",
        name: "Eve Wilson",
        location: "Arizona",
        education: "High School",
        age: 27,
        weight: "55kg",
        height: "5'5\"",
        status: "Single",
    },
    {
        id: "8",
        name: "Frank Miller",
        location: "Nevada",
        education: "PhD",
        age: 33,
        weight: "90kg",
        height: "6'2\"",
        status: "Married",
    },
    {
        id: "9",
        name: "Grace Moore",
        location: "Colorado",
        education: "Masters",
        age: 30,
        weight: "65kg",
        height: "5'7\"",
        status: "Single",
    },
    {
        id: "10",
        name: "Harry Harris",
        location: "Utah",
        education: "Bachelors",
        age: 26,
        weight: "75kg",
        height: "5'11\"",
        status: "Single",
    }
];

const HomeComponent = () => {
    const renderHeader = () => (
        <View style={styles.profileContainer}>
            <Avatar.Text size={100} label="U" />
            <View
                style={{
                    display: "flex",
                }}
            >
                <View style={styles.profileInfo}>
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: "bold",
                        }}
                    >Username</Text>

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

    const renderItem = ({ item }) => (
        <ProfileCard item={item} />
    );

    return (
        <View style={styles.container}>
            {/* <Appbar.Header>
        <Appbar.Content title="Home" />
        <Appbar.Action icon="bell" onPress={() => {}} />
      </Appbar.Header> */}
            <FlatList
                data={DATA}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={() => (
                    <>
                        {renderHeader()}
                        <Text style={styles.sectionTitle}>Daily Recommendation</Text>
                    </>
                )}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
            {/* <Appbar style={styles.bottomBar}>
        <Appbar.Action icon="home" onPress={() => {}} />
        <Appbar.Action icon="message" onPress={() => {}} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon="chart-bar" onPress={() => {}} />
        <Appbar.Action icon="crown" onPress={() => {}} />
      </Appbar> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#f4f4f4",
        width: "100%",
        display: "flex",
        gap: 16,
    },
    profileInfo: {
        flex: 1,
        marginLeft: 16,
        color: "black",
        display: "flex",
        flexDirection: "column",

    },
    button: {
        marginHorizontal: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 8,
        marginLeft: 16,
    },
    card: {
        marginHorizontal: 16,
        marginVertical: 8,
    },
    heartIcon: {
        fontSize: 20,
        color: "red",
        marginRight: 16,
    },
    list: {
        paddingBottom: 80, // Space for the bottom bar
    },
    bottomBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "space-around",
        backgroundColor: "white",
    },
});

export default HomeComponent;
