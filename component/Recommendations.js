import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import useSWR from "swr";
import { GetRandomUser } from "../services/endpoint";
import ProfileCard from "./Card/ProfileCard";

const Recommendations = ({ setActiveComponent }) => {
  const [showAll, setShowAll] = useState(false);
  const recommendations = Array.from({ length: 30 }).map((_, index) => ({
    id: index.toString(),
    name: `Name ${index + 1}`,
  }));

  const fetcher = async () => {
    const response = await GetRandomUser();
    return response.data?.data;
  }

  const { data, error, isLoading } = useSWR("recommendations", fetcher)


  const renderCard = ({ item }) => (
    <ProfileCard item={item} />
  );


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text   style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 10,
        }}>Recommendations</Text>
        <TouchableOpacity onPress={() => setShowAll(!showAll)}>
          <Text style={styles.link}>{showAll ? "Show Less" : "See All"}</Text>
        </TouchableOpacity>
      </View>

      {/* Force FlatList re-render by updating the `key` prop */}
      <FlatList
        // key={showAll ? "grid" : "list"} // Changes the key based on layout
        data={showAll ? data : data?.slice(0, 2)}
        renderItem={renderCard}
        keyExtractor={(item) => item._id}
        // numColumns={showAll ? 2 : 1} // Change layout dynamically
        // columnWrapperStyle={showAll && styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1,
    width: "100%",
   },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10,
    paddingHorizontal:15
   },
  link: { color: "blue",
    marginTop: 10
   },
  card: {
    flex: 1,
    margin: 10,
    padding: 20,
    backgroundColor: "lightgray",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  columnWrapper: { justifyContent: "space-between" },
});

export default Recommendations;
