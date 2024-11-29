import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';
import useSWR from 'swr';
import { UserOnBoard } from '../../services/endpoint';

const Education = () => {
  const [highestQualification, setHighestQualification] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [university, setUniversity] = useState('');
  const [graduationYear, setGraduationYear] = useState('');

  const [loading, setLoading] = useState(false);

  const fetcher2 = async () => {
    const response = await UserOnBoard();
    return response.data?.data;
  }

  const { data: formFetchedData, isLoading } = useSWR('getOnboardData', fetcher2);

  useEffect(() => {
    if (formFetchedData) {
      setHighestQualification(formFetchedData.education);
      // setFieldOfStudy(formFetchedData.fieldOfStudy);
      // setUniversity(formFetchedData.university);
      // setGraduationYear(formFetchedData.graduationYear);
    }
  }
    , [formFetchedData]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = {
        education: highestQualification,
        // fieldOfStudy,
        // university,
        // graduationYear,
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
        label="Highest Qualification"
        value={highestQualification}
        onChangeText={setHighestQualification}
        style={styles.input}
      />
      {/* <TextInput
        label="Field of Study"
        value={fieldOfStudy}
        onChangeText={setFieldOfStudy}
        style={styles.input}
      /> */}
      {/* <TextInput
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
      /> */}
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

export default Education;
