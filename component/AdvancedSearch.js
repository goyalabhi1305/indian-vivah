import React, { useState } from 'react';
import { StyleSheet, View, FlatList, ScrollView } from 'react-native';
import { TextInput, Button, Card, Text, Avatar, Provider } from 'react-native-paper';

const AdvancedSearch = () => {
  const [showInputs, setShowInputs] = useState(true); // Controls visibility of inputs
  const [searchResults, setSearchResults] = useState([]); // Stores search results

  // Sample data for FlatList
  const dummyData = Array.from({ length: 10 }).map((_, index) => ({
    id: index.toString(),
    name: `Profile ${index + 1}`,
    location: `Location ${index + 1}`,
    education: `Education ${index + 1}`,
    age: 25 + index,
    weight: 60 + index,
    height: 160 + index,
    status: index % 2 === 0 ? "Active" : "Inactive",
  }));
  const dummyData2 = [
    {
      id: '1',
      name: 'John Doe',
      age: 28,
      weight: '70 kg',
      height: '5 ft 8 in',
      location: 'New York',
      education: 'Engineer',
      status: 'Single',
    },
    {
      id: '2',
      name: 'Jane Smith',
      age: 25,
      weight: '58 kg',
      height: '5 ft 4 in',
      location: 'California',
      education: 'Doctor',
      status: 'Single',
    },
    {
      id: '3',
      name: 'Alice Johnson',
      age: 30,
      weight: '62 kg',
      height: '5 ft 6 in',
      location: 'Texas',
      education: 'Lawyer',
      status: 'Divorced',
    },
  ];

  const handleSearch = () => {
    setShowInputs(false);
    setSearchResults(dummyData); // Replace with actual search results
  };

  const handleBack = () => {
    setShowInputs(true);
  };

  return (
      <View >
        {showInputs ? (
          <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            padding: 16,
            marginBottom: 10
          }}
          >

            {/* Personal Details */}
            <Text style={styles.sectionHeader}>Personal Details</Text>
            <View style={styles.row}>
              <TextInput
                label="Height (ft)"
                style={styles.input}
                keyboardType="numeric"
              />
              <TextInput
                label="Height (in)"
                style={styles.input}
                keyboardType="numeric"
              />
            </View>
            <TextInput label="Age" style={styles.input} keyboardType="numeric" />
            <TextInput label="Marital Status" style={styles.input} />
            <TextInput label="Religion" style={styles.input} />
            <TextInput label="Caste" style={styles.input} />
            <TextInput label="Complexion" style={styles.input} />
            <TextInput
              label="Weight"
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput label="Sub caste" style={styles.input} />

            {/* Location */}
            <Text style={styles.sectionHeader}>Location</Text>
            <TextInput label="City" style={styles.input} />
            <TextInput label="State" style={styles.input} />

            {/* Professional Details */}
            <Text style={styles.sectionHeader}>Professional Details</Text>
            <TextInput label="Education" style={styles.input} />
            <TextInput label="Profession" style={styles.input} />
            <TextInput
              label="Annual Income"
              style={styles.input}
              keyboardType="numeric"
            />

            {/* Hobbies */}
            <Text style={styles.sectionHeader}>Hobbies</Text>
            <TextInput label="Eating habits" style={styles.input} />
            <TextInput label="Drinking" style={styles.input} />
            <TextInput label="Smoking" style={styles.input} />

            {/* Horoscope Details */}
            <Text style={styles.sectionHeader}>Horoscope Details</Text>
            <TextInput label="Star" style={styles.input} />
            <TextInput label="Dosh" style={styles.input} />

            {/* Search Button */}
            <Button mode="contained" style={
              {
                marginTop: 16,
                paddingVertical: 0,
                marginBottom: 32,
              }
            } onPress={handleSearch}>
              Search
            </Button>
          </ScrollView>
        ) : (
          <View style={styles.resultContainer}>
            {/* <Button
              mode="outlined"
              style={styles.backButton}
              onPress={handleBack}
            >
              Back to Search
            </Button> */}
            <FlatList
              data={searchResults}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Card style={styles.card}>
                  <Card.Title
                    title={item.name}
                    subtitle={`Location: ${item.location}, Education: ${item.education}`}
                    left={(props) => (
                      <Avatar.Text {...props} label={item.name[0]} />
                    )}
                    right={(props) => (
                      <Text style={styles.heartIcon} {...props}>
                        ❤️
                      </Text>
                    )}
                  />
                  <Card.Content>
                    <Text>Age: {item.age}</Text>
                    <Text>Weight: {item.weight}</Text>
                    <Text>Height: {item.height}</Text>
                    <Text>Status: {item.status}</Text>
                  </Card.Content>
                  <Card.Actions>
                    <Button mode="contained" onPress={() => {}}>
                      Send
                    </Button>
                    <Button mode="outlined" onPress={() => {}}>
                      Ignore
                    </Button>
                  </Card.Actions>
                </Card>
              )}
            />
          </View>
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // padding: 16,
    backgroundColor: 'red',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 8,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 16,
    paddingVertical: 0,
    marginBottom: 32,
  },
  resultContainer: {
    // flex: 1,
    marginBotton: 10,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 15
  },
  backButton: {
    marginBottom: 8,
    marginTop: -16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#f6f6f6',
  },
  heartIcon: {
    fontSize: 18,
    color: 'red',
    marginRight: 16,
  },
});

export default AdvancedSearch;
