import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';
import useSWR from 'swr';
import { GetProfileDetailUser, UserOnBoard } from '../../services/endpoint';
import Toast from 'react-native-toast-message';

const ContactDetails = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  // const fetcher2 = async () => {
  //   const response = await UserOnBoard();
  //   return response.data?.data;
  // }

  // const { data: formFetchedData, isLoading } = useSWR('getOnboardData', fetcher2);

 


    const fetcher = async () => {
      const response = await GetProfileDetailUser()
      return {
        contactData: response.data?.contactData,
        data: response.data?.data
      }
  }

  const { data, isLoading:isLoading2, error } = useSWR('fetchUserProfileDetailsEdit', fetcher)

  useEffect(() => {
    if (data) {
      console.log(data);
      setPhone(data.contactData?.phone);
      setEmail(data.contactData?.email);
      setAddress(data?.data?.currentLocation?.address);
    }
  }
    , [data]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = {
        phone,
        email,
        currentLocation: {
          
          ...data?.data?.currentLocation,
          address: address,

        }
      };

      const response = await UserOnBoard(payload);

      setLoading(false);

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Contact details saved successfully',
      });
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong. Please try again',
      });
    }
  }

  if ( isLoading2) {
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
        label="Phone Number"
        value={phone}
        keyboardType="phone-pad"
        onChangeText={setPhone}
        style={styles.input}
      />
      <TextInput
        label="Email Address"
        value={email}
        keyboardType="email-address"
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        label="Residential Address"
        value={address}
        onChangeText={setAddress}
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
  }
});

export default ContactDetails;
