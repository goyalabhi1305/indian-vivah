import React, { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import { Card, Avatar, Button } from "react-native-paper";

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
    <Card style={styles.card}>
      <Card.Title
        title={item.name}
        subtitle={`Location: ${item.location}, Education: ${item.education}`}
        left={(props) => <Avatar.Text {...props} label={item.name[0]} />}
        right={(props) => (
          <Text style={styles.heartIcon} {...props}>
            ❤️
          </Text>
        )}
      />
      <Card.Content>
        <Text>Age: {item.age}</Text>
        <Text>Weight: {item.weight} kg</Text>
        <Text>Height: {item.height} cm</Text>
        <Text>Status: {item.status}</Text>
      </Card.Content>
      <Card.Actions
      style={{
        display: "flex",
        gap:10
      }}
      >
       
        <Button mode="contained" onPress={() => { }}>
          Send
        </Button>
        <Button mode="outlined" onPress={() => { }}>
            Ignore
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      {showCards ? (
        // Show Cards when `showCards` is true
        <>
          <Text style={styles.headerText}>Search Results</Text>
          <FlatList
            data={cards}
            renderItem={renderCard}
            keyExtractor={(item) => item.id}
            numColumns={1}  // Ensure only one component per row
          />
        </>
      ) : (
        // Show Search Form when `showCards` is false
        <View>
          <Text style={styles.title}>Quick Search</Text>
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
  container: { flex: 1, padding: 0},
  title: { fontSize: 20, marginBottom: 20 },
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
