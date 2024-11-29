import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import useSWR from 'swr';
import { UserOnBoard } from '../../services/endpoint';

const WeightHeight = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const [loading, setLoading] = useState(false);

  const fetcher2 = async () => {
    const response = await UserOnBoard();
    return response.data?.data;
  }

  const { data: formFetchedData, isLoading } = useSWR('getOnboardData', fetcher2);

  useEffect(() => {
    if (formFetchedData) {
      setWeight(JSON.stringify(formFetchedData.weight));
      setHeight(formFetchedData.height);
    }
  }, [formFetchedData]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = {
        weight,
        height,
      };
      const response = await UserOnBoard(payload);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) {
    return <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <ActivityIndicator size="large" />
    </View>
  }

  return (
    <View style={styles.container}>
      <TextInput
        label="Weight (kg)"
        value={weight}
        onChangeText={setWeight}
        style={styles.input}
      />
      <TextInput
        label="Height (ft)"
        value={height}
        onChangeText={setHeight}
        style={styles.input}
      />
      <Button mode="contained"
        loading={loading}
        disabled={loading}
        onPress={handleSubmit}>
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff3f4',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff3f4',
  }
});

export default WeightHeight;
