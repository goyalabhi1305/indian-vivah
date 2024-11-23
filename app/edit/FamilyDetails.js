import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const FamilyDetails = () => {
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [siblings, setSiblings] = useState('');
  const [familyType, setFamilyType] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        label="Father's Name"
        value={fatherName}
        onChangeText={setFatherName}
        style={styles.input}
      />
      <TextInput
        label="Mother's Name"
        value={motherName}
        onChangeText={setMotherName}
        style={styles.input}
      />
      <TextInput
        label="Number of Siblings"
        value={siblings}
        keyboardType="numeric"
        onChangeText={setSiblings}
        style={styles.input}
      />
      <TextInput
        label="Family Type (e.g., Nuclear/Joint)"
        value={familyType}
        onChangeText={setFamilyType}
        style={styles.input}
      />
      <Button mode="contained" onPress={() => alert('Family Details Saved!')}>
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
});

export default FamilyDetails;
