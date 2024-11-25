import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import useSWR from 'swr';
import { GetOnBoardingSheet } from '../../services/endpoint';
import { AutocompleteDropdown, AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import { useHeaderHeight } from '@react-navigation/elements';
// import DatePicker from 'react-native-date-picker';

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
  const [selectedItem, setSelectedItem] = useState(null);
  const [religions, setReligions] = useState([]);
  const [casts, setCasts] = useState([]);
  const [selectedCaste, setSelectedCaste] = useState(null);


  const [open, setOpen] = useState(false);

  const fetcher = async () => {
    const response = await GetOnBoardingSheet();
    return response.data;
  }

  const { data } = useSWR('getOnBoardingSheetData', fetcher);

  useEffect(() => {
    if (data) {
      const transformedReligionArray = data?.religion[0].map((item) => {
        const [id, name] = Object.entries(item)[0];
        return { id: parseInt(id), title: name };
      });
      setReligions(transformedReligionArray);
    }
  }, [data]);

  console.log("selectedItem", selectedItem);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContinue = () => {
    router.replace('userDetails/step2');
  };

  useEffect(() => {

    if (selectedItem) {
      console.log("selectedItem", selectedItem);
      const castArray = data?.caste[selectedItem?.id]?.[0]?.map((item) => {
        const [id, name] = Object.entries(item)[0];
        return name ? { id: parseInt(id), title: name } : null;
      }

    ).filter(Boolean);;
    console.log("castArray***", castArray);
    setCasts(castArray);
    }

  }, [selectedItem]);

  const headerHeight = useHeaderHeight();

  return (
    <AutocompleteDropdownContextProvider headerOffset={headerHeight} >
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
          {/* <TextInput
          label="DOB"
          mode="outlined"
          value={formData.dob}
          onChangeText={(text) => handleInputChange('dob', text)}
          style={styles.input}
        /> */}
          {/* <Button mode='outlined' onPress={() => setOpen(true)} >
          {formData?.dob ? formData?.dob : 'Select Date'}
      </Button>
         <DatePicker
        modal
        open={open}
        date={formData?.dob ? new Date(formData?.dob) : new Date()}
        onConfirm={(date) => {
          setOpen(false)
          setFormData((prev) => ({
            ...prev,
            dob: date.toISOString().split('T')[0]
          }))
        }}
        onCancel={() => {
          setOpen(false)
        }}
      /> */}

          <TextInput
            label="Email"
            mode="outlined"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            style={styles.input}
          />

          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}
          >
            <AutocompleteDropdown
              clearOnFocus={false}
              closeOnBlur={true}
              closeOnSubmit={false}
              initialValue={{ id: '2' }} // or just '2'
              onSelectItem={setSelectedItem}
              dataSet={religions}
              inputContainerStyle={{
                backgroundColor: '#fff',
                borderRadius: 10,
                width: '100%',
              }}
            />;
          </View>

          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}
          >
            <AutocompleteDropdown
              clearOnFocus={false}
              closeOnBlur={true}
              closeOnSubmit={false}
              initialValue={{ id: '2' }} // or just '2'
              onSelectItem={setSelectedCaste}
              dataSet={casts}
              inputContainerStyle={{
                backgroundColor: '#fff',
                borderRadius: 10,
                width: '100%',
              }}
            />;
          </View>

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
    </AutocompleteDropdownContextProvider>
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
