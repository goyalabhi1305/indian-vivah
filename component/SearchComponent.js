import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import QuickSearch from "./QuickSearch";
import AdvancedSearch from "./AdvancedSearch";
import Recommendations from "./Recommendations";
import { useRouter } from "expo-router";
import { Button } from "react-native-paper";


const SearchComponent = () => {
  const [activeComponent, setActiveComponent] = useState("home");
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header Buttons */}
      <View style={styles.header}>
       
          <Button
            mode="contained"
            onPress={() =>{
              router.push('/search/QucikSearch')
            } } >
            Quick Search
          </Button>

          <Button
            mode="contained"
            onPress={() => {
              router.push('/search/AdvanceSearch')
            }} >
            Advance Search
          </Button>
      </View>

      {/* Saved Profiles */}
      <View style={styles.savedProfiles}>
        <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 10,
        }}
        >Saved Profiles</Text>
        <View style={styles.profileRow}>
          {Array.from({ length: 6 }).map((_, index) => (
            <View key={index} style={styles.savedProfile}>
              <Text>Saved Profile</Text>
            </View>
          ))}
        </View>
      </View>

       <Recommendations setActiveComponent={setActiveComponent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10,
    backgroundColor: '#fff3f4',
   },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  savedProfiles: { marginBottom: 20 },
  profileRow: { flexDirection: "row", flexWrap: "wrap" },
  savedProfile: { margin: 5, padding: 10, borderWidth: 1, borderColor: "gray", borderRadius: 5 },
});

export default SearchComponent;
