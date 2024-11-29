import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';
import { UserOnBoard } from '../../services/endpoint';
import useSWR from 'swr';

const Preferences = () => {
  const [preferredPartnerAge, setPreferredPartnerAge] = useState('');
  const [preferredLocation, setPreferredLocation] = useState('');
  const [preferredReligion, setPreferredReligion] = useState('');
  const [preferredHeight, setPreferredHeight] = useState('');

  const [loading, setLoading] = useState(false);

  const fetcher2 = async () => {
    const response = await UserOnBoard();
    return response.data?.data;
  }

  const { data: formFetchedData, isLoading } = useSWR('getOnboardData', fetcher2);

  useEffect(() => {
    if (formFetchedData) {
      setPreferredPartnerAge(formFetchedData?.partnerPreference?.preferredPartnerAge);
      setPreferredLocation(formFetchedData?.partnerPreference?.preferredLocation);
      setPreferredReligion(formFetchedData?.partnerPreference?.preferredReligion);
      setPreferredHeight(formFetchedData?.partnerPreference?.preferredHeight);
    }
  }, [formFetchedData]);

  const handleSubmit = async () => {
    try{

      setLoading(true);

      const payload = {
        partnerPreference: {
          preferredPartnerAge,
          preferredLocation,
          preferredReligion,
          preferredHeight,
        },
      };

      const response = await UserOnBoard(payload);

      setLoading(false);

    }catch(error){

      setLoading(false);
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

export default Preferences;
