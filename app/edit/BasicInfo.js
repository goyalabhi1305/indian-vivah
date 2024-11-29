import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';
import { UserOnBoard } from '../../services/endpoint';
import Toast from 'react-native-toast-message';
import useSWR from 'swr';
import DropDownPicker from 'react-native-dropdown-picker';

const BasicInfo = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');

  const [openGender, setOpenGender] = useState(false);
  const [genderItems, setGenderItems] = useState([
    { label: 'Male', value: 'MALE' },
    { label: 'Female', value: 'FEMALE' },
    { label: 'Other', value: 'OTHER' }
  ]);

  const [loading, setLoading] = useState(false);


  const fetcher2 = async () => {
    const response = await UserOnBoard();
    return response.data?.data;
  }

  const { data: formFetchedData, isLoading } = useSWR('getOnboardData', fetcher2);

  useEffect(() => {
    if (formFetchedData) {
      setFirstName(formFetchedData.firstName);
      setLastName(formFetchedData.lastName);
      setGender(formFetchedData.gender);
      setDob(formFetchedData.dob);
    }
  }
    , [formFetchedData]);

  const handleSubmit = async () => {
    try {

      setLoading(true);
      const payload = {
        firstName,
        lastName,
        gender,
        dob,
      };
      const response = await UserOnBoard(payload);

      setLoading(false);

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Basic info saved successfully',
      });

    } catch (e) {
      setLoading(false);
      console.log(e);
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
        label="Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />
      <TextInput
        label="Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />
      {/* <TextInput
        label="Gender"
        value={gender}
        onChangeText={setGender}
        style={styles.input}
      /> */}
        <DropDownPicker
              open={openGender}
              value={gender}
              items={genderItems}

              setOpen={setOpenGender}
              setValue={(callback) => {
                const value = typeof callback === 'function' ? callback(gender) : callback;
                setGender(value);
                console.log('Selected Gender:', value);
              }}
              setItems={setGenderItems}

              style={{
                backgroundColor: '#fff3f4',
                marginBottom: 16,
                marginTop: 10
              }}
              
              placeholder="Select Gender"
            />
      <TextInput
        label="Date of Birth"
        value={dob}
        onChangeText={setDob}
        style={styles.input}
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
  },
});

export default BasicInfo;
