import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';
import { UserOnBoard } from '../../services/endpoint';
import useSWR from 'swr';
import DropDownPicker from 'react-native-dropdown-picker';

const FamilyDetails = () => {
  const [fatherOccupation, setFatherOccupation] = useState('');

  const [motherOccupation, setMotherOccupation] = useState('');
  const [sitsters, setSisiters] = useState('');
  const [brothers, setBrothers] = useState('');
  const [familyType, setFamilyType] = useState('');

  const [loading, setLoading] = useState(false);

  const familyTypeArray = [
    { label: 'Joint', value: 'JOINT' },
    { label: 'Nuclear', value: 'NUCLEAR' },
    { label: 'Other', value: 'OTHER' },
  ];

  const [openFamilyType, setOpenFamilyType] = useState(false);

  const fetcher2 = async () => {
    const response = await UserOnBoard();
    return response.data?.data;
  }

  const { data: formFetchedData, isLoading } = useSWR('getOnboardData', fetcher2);


  useEffect(() => {
    if (formFetchedData) {
      setFatherOccupation(formFetchedData.familyDetails?.fatherOccupation);
      setMotherOccupation(formFetchedData.familyDetails?.motherOccupation);
      setSisiters(JSON.stringify(formFetchedData.familyDetails?.siblings[0]?.count));
      setBrothers(JSON.stringify(formFetchedData.familyDetails?.siblings[1]?.count));
      setFamilyType(formFetchedData.familyType);
    }
  }, [formFetchedData]);

  if (isLoading) {
    return <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <ActivityIndicator size="large" />
    </View>
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = {
        familyDetails: {
          motherOccupation: motherOccupation,
          fatherOccupation: fatherOccupation,
          'siblings': [
            {
              'relation': 'BROTHER',
              'count': brothers
            },
            {
              'relation': 'SISTER',
              'count': sitsters
            }
          ]
        },
        familyType: familyType
      };
      const response = await UserOnBoard(payload);

      setLoading(false);
    }
    catch (error) {

      setLoading(false);
      console.log(error);
    }
  }



  return (
    <View style={styles.container}>
      <TextInput
        label="Father's Occupation"
        value={fatherOccupation}
        onChangeText={setFatherOccupation}
        style={styles.input}
      />
      <TextInput
        label="Mother's Occupation"
        value={motherOccupation}
        onChangeText={setMotherOccupation}
        style={styles.input}
      />
      <TextInput
        label="Number of Sisters"
        value={sitsters}
        keyboardType="numeric"
        onChangeText={setSisiters}
        style={styles.input}
      />

      <TextInput
        label="Number of Brothers"
        value={brothers}
        keyboardType="numeric"
        onChangeText={setBrothers}
        style={styles.input}
      />



      <DropDownPicker
        open={openFamilyType}
        value={familyType}
        items={familyTypeArray}
        setOpen={setOpenFamilyType}
        style={{
          zIndex: 1,
          backgroundColor: '#fff3f4',
          marginBottom: 26
        }}
        setValue={(callback) => {
          const value = typeof callback === 'function' ? callback(familyType) : callback;
          setFamilyType(value);
        }}
        placeholder="Select Family Type"
        direction=""
      />
      <Button 
      loading={loading}
      disabled={loading}
      mode="contained" onPress={handleSubmit}>
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

export default FamilyDetails;
