import React, { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import { Card, Avatar, Button } from "react-native-paper";
import ProfileCard from "./Card/ProfileCard";

const QuickSearch = () => {
  const [showCards, setShowCards] = useState(false); // State to toggle between search form and cards

  // Sample card data
  const cards = Array.from({ length: 10 }).map((_, index) => ({
    id: index.toString(),
    name: `Profile ${index + 1}`,
    location: `Location ${index + 1}`,
    education: `Education ${index + 1}`,
    age: 25 + index,
    weight: 60 + index,
    height: 160 + index,
    status: index % 2 === 0 ? "Active" : "Inactive",
  }));

  const renderCard = ({ item }) => (
   <ProfileCard item={item} />
  );

  return (
    <View style={styles.container}>
      {showCards ? (
        // Show Cards when `showCards` is true
        <>
          <Text style={styles.title}>Quick Search Results</Text>

          <FlatList
            data={cards}
            renderItem={renderCard}
            keyExtractor={(item) => item.id}
            numColumns={1}  // Ensure only one component per row
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : (
        // Show Search Form when `showCards` is false
        <View
        style={{
          margin: 20,
        }}
        >
          <View style={styles.searchBox}>
            <TextInput style={styles.input} placeholder="Search by location" />
            <TextInput style={styles.input} placeholder="Search by caste" />
            <TextInput style={styles.input} placeholder="Search by age" />
          </View>
          <Button
            mode="contained"
            onPress={() => setShowCards(true)} >
            Search
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 0,
    margin: 0,
   },
  title: { fontSize: 20, marginBottom: 10,
    marginLeft:20,
    marginTop:10,
    fontWeight: "bold"
   },
  headerText: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  searchBox: { backgroundColor: "lightgray", padding: 20, marginBottom: 20 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginBottom: 15,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  card: {
    margin: 10,
    padding: 20,
    backgroundColor: "lightgray",
    borderRadius: 5,
  },
  heartIcon: {
    fontSize: 20,
    color: "red",
    marginRight: 16,
  },
});

export default QuickSearch;
