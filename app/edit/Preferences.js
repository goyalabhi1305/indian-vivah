import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const Preferences = () => {
  const [preferredPartnerAge, setPreferredPartnerAge] = useState('');
  const [preferredLocation, setPreferredLocation] = useState('');
  const [preferredReligion, setPreferredReligion] = useState('');
  const [preferredHeight, setPreferredHeight] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        label="Preferred Partner Age (e.g., 25-30)"
        value={preferredPartnerAge}
        onChangeText={setPreferredPartnerAge}
        style={styles.input}
      />
      <TextInput
        label="Preferred Location"
        value={preferredLocation}
        onChangeText={setPreferredLocation}
        style={styles.input}
      />
      <TextInput
        label="Preferred Religion"
        value={preferredReligion}
        onChangeText={setPreferredReligion}
        style={styles.input}
      />
      <TextInput
        label="Preferred Height (e.g., 5'5\ 5'9\)"
        value={preferredHeight}
        onChangeText={setPreferredHeight}
        style={styles.input}
      />
      <Button mode="contained" onPress={() => alert('Preferences Saved!')}>
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  }
});

export default Preferences;
