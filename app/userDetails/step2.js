import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const Step2 = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    caste: '',
    horoscope: '',
    currentAddress: {
      address: '',
      pincode: '',
      city: '',
      state: '',
      country: '',
    },
    permanentAddress: {
      address: '',
      pincode: '',
      city: '',
      state: '',
      country: '',
    },
  });

  const handleInputChange = (field, value, addressType, key) => {
    if (addressType) {
      setFormData((prev) => ({
        ...prev,
        [addressType]: {
          ...prev[addressType],
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleContinue = () => {
    console.log('Form Data Submitted:', formData);
    router.replace('userDetails/step3');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Tell us about yourself</Text>
      <View style={styles.formContainer}>
        {/* Caste and Horoscope */}
        <TextInput
          label="Caste"
          mode="outlined"
          value={formData.caste}
          onChangeText={(text) => handleInputChange('caste', text)}
          style={styles.input}
        />
        <TextInput
          label="Horoscope"
          mode="outlined"
          value={formData.horoscope}
          onChangeText={(text) => handleInputChange('horoscope', text)}
          style={styles.input}
        />

        {/* Current Address */}
        <Text style={styles.subHeader}>Current Address</Text>
        <TextInput
          label="Enter the address"
          mode="outlined"
          value={formData.currentAddress.address}
          onChangeText={(text) => handleInputChange(null, text, 'currentAddress', 'address')}
          style={styles.input}
        />
        <View style={styles.row}>
          <TextInput
            label="Pincode"
            mode="outlined"
            value={formData.currentAddress.pincode}
            onChangeText={(text) => handleInputChange(null, text, 'currentAddress', 'pincode')}
            style={styles.halfInput}
          />
          <TextInput
            label="City"
            mode="outlined"
            value={formData.currentAddress.city}
            onChangeText={(text) => handleInputChange(null, text, 'currentAddress', 'city')}
            style={styles.halfInput}
          />
        </View>
        <View style={styles.row}>
          <TextInput
            label="State"
            mode="outlined"
            value={formData.currentAddress.state}
            onChangeText={(text) => handleInputChange(null, text, 'currentAddress', 'state')}
            style={styles.halfInput}
          />
          <TextInput
            label="Country"
            mode="outlined"
            value={formData.currentAddress.country}
            onChangeText={(text) => handleInputChange(null, text, 'currentAddress', 'country')}
            style={styles.halfInput}
          />
        </View>

        {/* Permanent Address */}
        <Text style={styles.subHeader}>Permanent Address</Text>
        <TextInput
          label="Enter the address"
          mode="outlined"
          value={formData.permanentAddress.address}
          onChangeText={(text) => handleInputChange(null, text, 'permanentAddress', 'address')}
          style={styles.input}
        />
        <View style={styles.row}>
          <TextInput
            label="Pincode"
            mode="outlined"
            value={formData.permanentAddress.pincode}
            onChangeText={(text) => handleInputChange(null, text, 'permanentAddress', 'pincode')}
            style={styles.halfInput}
          />
          <TextInput
            label="City"
            mode="outlined"
            value={formData.permanentAddress.city}
            onChangeText={(text) => handleInputChange(null, text, 'permanentAddress', 'city')}
            style={styles.halfInput}
          />
        </View>
        <View style={styles.row}>
          <TextInput
            label="State"
            mode="outlined"
            value={formData.permanentAddress.state}
            onChangeText={(text) => handleInputChange(null, text, 'permanentAddress', 'state')}
            style={styles.halfInput}
          />
          <TextInput
            label="Country"
            mode="outlined"
            value={formData.permanentAddress.country}
            onChangeText={(text) => handleInputChange(null, text, 'permanentAddress', 'country')}
            style={styles.halfInput}
          />
        </View>

        {/* Continue Button */}
        <Button
          mode="contained"
          onPress={handleContinue}
          style={styles.button}
          uppercase={false}
        >
          Continue
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  formContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    marginTop: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
  },
  halfInput: {
    width: '48%',
  },
  button: {
    width: '100%',
    marginTop: 30,
    backgroundColor: '#6200ee',
  },
});

export default Step2;
