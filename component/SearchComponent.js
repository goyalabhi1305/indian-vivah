import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import QuickSearch from "./QuickSearch";
import AdvancedSearch from "./AdvancedSearch";
import Recommendations from "./Recommendations";


const SearchComponent = () => {
  const [activeComponent, setActiveComponent] = useState("home");

  return (
    <View style={styles.container}>
      {/* Header Buttons */}
      <View style={styles.header}>
        <Button title="Home" onPress={() => setActiveComponent("home")} />
        <Button title="Quick Search" onPress={() => setActiveComponent("quickSearch")} />
        <Button title="Advanced Search" onPress={() => setActiveComponent("advancedSearch")} />
      </View>

      {/* Saved Profiles */}
      <View style={styles.savedProfiles}>
        <Text>Saved Profiles</Text>
        <View style={styles.profileRow}>
          {Array.from({ length: 6 }).map((_, index) => (
            <View key={index} style={styles.savedProfile}>
              <Text>Saved Profile</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Active Component Rendering */}
      {activeComponent === "quickSearch" && <QuickSearch />}
      {activeComponent === "advancedSearch" && <AdvancedSearch />}
      {activeComponent === "home" && <Recommendations setActiveComponent={setActiveComponent} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  savedProfiles: { marginBottom: 20 },
  profileRow: { flexDirection: "row", flexWrap: "wrap" },
  savedProfile: { margin: 5, padding: 10, borderWidth: 1, borderColor: "gray", borderRadius: 5 },
});

export default SearchComponent;
