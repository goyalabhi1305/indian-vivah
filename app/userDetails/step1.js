import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { AutocompleteDropdown, AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import FieldHelperText from '../../component/FieldHelperText';
import useSWR from 'swr';
import { GetOnBoardingSheet, UserOnBoard } from '../../services/endpoint';
// import DatePicker from 'react-native-date-picker';

const Step1 = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    // age: '',
    gender: null,
    email: '',
    religion: null,
    caste: null,
    subCaste: '',
    // maritalStatus: null,
    bloodGroup: null,
  });

  const [loading, setLoading] = useState(false);

  const fetcher = async () => {
    const response = await GetOnBoardingSheet();
    return response.data;
  }

  const { data } = useSWR('getOnBoardingSheetData', fetcher);


  const fetcher2 = async () => {
    const response = await UserOnBoard();
    return response.data?.data;
  }

  const {data:formFetchedData} = useSWR('getOnboardData', fetcher2);

  useEffect(() => {
    if(formFetchedData){
      setFormData({
        firstName: formFetchedData.firstName,
        lastName: formFetchedData.lastName,
        gender: formFetchedData?.gender,
        email: formFetchedData.email,
        religion: formFetchedData.religion ? JSON.parse(formFetchedData.religion) : null,
        caste: formFetchedData.caste ? JSON.parse(formFetchedData.caste) : null,
        subCaste: formFetchedData.subCaste,
        bloodGroup: formFetchedData.bloodGroup,

      });

      console.log("formFetchedData",formFetchedData?.religion);
    }
  }, [formFetchedData]);

  const [errors, setErrors] = useState({});

  const [openGender, setOpenGender] = useState(false);
  const [genderItems, setGenderItems] = useState([
    { label: 'Male', value: 'MALE' },
    { label: 'Female', value: 'FEMALE' },
    { label: 'Other', value: 'OTHER' }
  ]);



  const [openBloodGroup, setOpenBloodGroup] = useState(false);
  const [bloodGroupItems, setBloodGroupItems] = useState([
    { label: 'A+', value: 'A+' },
    { label: 'A-', value: 'A-' },
    { label: 'B+', value: 'B+' },
    { label: 'B-', value: 'B-' },
    { label: 'AB+', value: 'AB+' },
    { label: 'AB-', value: 'AB-' },
    { label: 'O+', value: 'O+' },
    { label: 'O-', value: 'O-' }
  ]);

  const [religions, setReligions] = useState([

  ]);

  const [selectedItem, setSelectedItem] = useState(null);

  const [casts, setCasts] = useState([]);

  const handleInputChange = (name, value) => {
    console.log("name", name);
    console.log("value", value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  useEffect(() => {
    if (data) {
      const transformedReligionArray = data?.religion[0].map((item) => {
        const [id, name] = Object.entries(item)[0];
        return { id: parseInt(id), title: name };
      });
      setReligions(transformedReligionArray);
    }
  }, [data]);

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

  const validateFields = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = 'This field is required.';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = async () => {
    if (validateFields()) {
      // Call dummy API on successful validation
      // console.log('Form submitted:', formData);
      // setTimeout(() => alert('Form submitted successfully!'), 500);
      // router.replace('userDetails/step2');
console.log("formData",formData);
      try{
        setLoading(true);
        const payload = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          gender: formData.gender,
          email: formData.email,
          religion: JSON.stringify(formData.religion),
          caste: JSON.stringify(formData.caste),
          gotra: formData.subCaste,
          bloodGroup: formData.bloodGroup,
        };

        const response = await UserOnBoard(payload);


        router.push('userDetails/step2');
          
        setLoading(false);
      }catch(error){
        setLoading(false);
        console.log("error",error);
      }

    }
  };

  

  return (
    <AutocompleteDropdownContextProvider>
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>Tell us about yourself</Text>
        <View style={styles.formContainer}>
          <TextInput
            label="First Name"
            mode="outlined"
            value={formData.firstName}
            onChangeText={(text) => handleInputChange('firstName', text)}
            style={styles.input}
            error={!!errors.firstName}
          />
          <FieldHelperText error={errors.firstName} />

          <TextInput
            label="Last Name"
            mode="outlined"
            value={formData.lastName}
            onChangeText={(text) => handleInputChange('lastName', text)}
            style={styles.input}
            error={!!errors.lastName}
          />
          <FieldHelperText error={errors.lastName} />

          {/* <TextInput
            label="Age"
            mode="outlined"
            value={formData.age}
            keyboardType="numeric"
            onChangeText={(text) => handleInputChange('age', text)}
            style={styles.input}
            error={!!errors.age}
          />

          <FieldHelperText error={errors.age} /> */}

          <View style={styles.input}>
            <DropDownPicker
              open={openGender}
              value={formData.gender}
              items={genderItems}

              setOpen={setOpenGender}
              setValue={(callback) => {
                const value = typeof callback === 'function' ? callback(formData.gender) : callback;
                handleInputChange('gender', value);
                console.log('Selected Gender:', value);
              }}
              setItems={setGenderItems}
              
              placeholder="Select Gender"
            />
          </View>
          {/* <HelperText type="error" visible={!!errors.gender}>
            {errors.gender}
          </HelperText> */}
          <FieldHelperText error={errors.gender} />




          <TextInput
            label="Email"
            mode="outlined"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            style={styles.input}
            error={!!errors.email}
          />
          <FieldHelperText error={errors.email} />

          <View style={styles.input}>
            <AutocompleteDropdown
              clearOnFocus={false}
              closeOnBlur={true}
              placeholder="Select Religion"
              onSelectItem={(item) => {
                setSelectedItem(item);
                handleInputChange('religion', item)}}
              dataSet={religions}
              inputContainerStyle={{
                backgroundColor: '#fff',
                borderRadius: 5,
                width: '100%',
                borderColor: '#000',
                borderWidth: 1,
              }}
              
              textInputProps={{
                placeholder: 'Select Religion',
                autoCorrect: false,
                autoCapitalize: 'none',
                style: {
                  borderRadius: 25,
                  backgroundColor: '#fff',
                  color: '#000',
                  paddingLeft: 18,
                },
              }}
            />
          </View>
          <FieldHelperText error={errors.religion} />


          <View style={styles.input}>
            <AutocompleteDropdown
              clearOnFocus={false}
              closeOnBlur={true}
              placeholder="Select Caste"
              inputContainerStyle={{
                backgroundColor: '#fff',
                borderRadius: 5,
                width: '100%',
                borderColor: '#000',
                borderWidth: 1,
              }}
              
              textInputProps={{
                placeholder: 'Select Caste',
                autoCorrect: false,
                autoCapitalize: 'none',
                style: {
                  borderRadius: 25,
                  backgroundColor: '#fff',
                  color: '#000',
                  paddingLeft: 18,
                },
              }}
              onSelectItem={(item) => handleInputChange('caste', item)}
              dataSet={casts}
            />
          </View>
          <FieldHelperText error={errors.caste} />


          <TextInput
            label="Sub Caste / Gotra"
            mode="outlined"
            value={formData.subCaste}
            onChangeText={(text) => handleInputChange('subCaste', text)}
            style={styles.input}
            error={!!errors.subCaste}
          />
          <FieldHelperText error={errors.subCaste} />

          {/* <View style={styles.input}>
            <DropDownPicker
              open={openMaritalStatus}
              value={formData.maritalStatus}
              items={maritalStatusItems}
              setOpen={setOpenMaritalStatus}
              setValue={(value) => handleInputChange('maritalStatus', value)}
              setItems={setMaritalStatusItems}
              placeholder="Select Marital Status"
            />
          </View>
          <FieldHelperText error={errors.maritalStatus} /> */}


          <View style={styles.input}>
            <DropDownPicker
              open={openBloodGroup}
              value={formData.bloodGroup}
              items={bloodGroupItems}
              setOpen={setOpenBloodGroup}
              setValue={(callback) => {
                const value = typeof callback === 'function' ? callback(formData.bloodGroup) : callback;
                handleInputChange('bloodGroup', value);
                console.log('Selected Blood Group:', value);
              }}
              setItems={setBloodGroupItems}
              placeholder="Select Blood Group"
            />
          </View>
          <FieldHelperText error={errors.bloodGroup} />


          <Button
            mode="contained"
            loading={loading}
            disabled={loading}
            onPress={handleContinue}
            style={styles.button}
          >
            Continue
          </Button>
        </View>
      </ScrollView>
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
    marginTop: 10,
    width: '100%',
  },
  input: {
    width: '100%',
    marginTop: 10,
    // marginBottom: 10,
  },
  button: {
    marginTop: 30,
  },
});

export default Step1;
