import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const WeightHeight = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        label="Weight (kg)"
        value={weight}
        onChangeText={setWeight}
        style={styles.input}
      />
      <TextInput
        label="Height (cm)"
        value={height}
        onChangeText={setHeight}
        style={styles.input}
      />
      <Button mode="contained" onPress={() => alert('Saved!')}>
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

export default WeightHeight;
