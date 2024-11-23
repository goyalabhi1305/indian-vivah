import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const Education = () => {
  const [highestQualification, setHighestQualification] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [university, setUniversity] = useState('');
  const [graduationYear, setGraduationYear] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        label="Highest Qualification"
        value={highestQualification}
        onChangeText={setHighestQualification}
        style={styles.input}
      />
      <TextInput
        label="Field of Study"
        value={fieldOfStudy}
        onChangeText={setFieldOfStudy}
        style={styles.input}
      />
      <TextInput
        label="University/College"
        value={university}
        onChangeText={setUniversity}
        style={styles.input}
      />
      <TextInput
        label="Graduation Year"
        value={graduationYear}
        keyboardType="numeric"
        onChangeText={setGraduationYear}
        style={styles.input}
      />
      <Button mode="contained" onPress={() => alert('Education Details Saved!')}>
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

export default Education;
