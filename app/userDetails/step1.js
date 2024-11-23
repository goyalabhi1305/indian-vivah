import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const Step1 = () => {
    const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    email: '',
    maritalStatus: '',
    bloodGroup: '',
  });

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContinue = () => {
    router.replace('userDetails/step2');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Tell us about yourself</Text>
      <View style={styles.formContainer}>
        <TextInput
          label="First Name"
          mode="outlined"
          value={formData.firstName}
          onChangeText={(text) => handleInputChange('firstName', text)}
          style={styles.input}
        />
        <TextInput
          label="Last Name"
          mode="outlined"
          value={formData.lastName}
          onChangeText={(text) => handleInputChange('lastName', text)}
          style={styles.input}
        />
        <TextInput
          label="Gender"
          mode="outlined"
          value={formData.gender}
          onChangeText={(text) => handleInputChange('gender', text)}
          style={styles.input}
        />
        <TextInput
          label="DOB"
          mode="outlined"
          value={formData.dob}
          onChangeText={(text) => handleInputChange('dob', text)}
          style={styles.input}
        />
        <TextInput
          label="Email"
          mode="outlined"
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          style={styles.input}
        />
        <TextInput
          label="Marital Status"
          mode="outlined"
          value={formData.maritalStatus}
          onChangeText={(text) => handleInputChange('maritalStatus', text)}
          style={styles.input}
        />
        <TextInput
          label="Blood Group"
          mode="outlined"
          value={formData.bloodGroup}
          onChangeText={(text) => handleInputChange('bloodGroup', text)}
          style={styles.input}
        />
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
  formContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    marginTop: 15,
  },
  button: {
    width: '100%',
    marginTop: 30,
    backgroundColor: '#6200ee',
  },
});

export default Step1;
