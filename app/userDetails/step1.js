import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { TextInput, Button, HelperText, ActivityIndicator } from 'react-native-paper';
import { AutocompleteDropdown, AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import FieldHelperText from '../../component/FieldHelperText';
import useSWR from 'swr';
import { GetOnBoardingSheet, UserOnBoard } from '../../services/endpoint';
import Toast from 'react-native-toast-message';
import DatePicker from 'react-native-date-picker';

const Step1 = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    // age: '',
    dob: '',
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

  const { data, isLoading: isLoading2 } = useSWR('getOnBoardingSheetData', fetcher);


  const fetcher2 = async () => {
    const response = await UserOnBoard();
    return response.data?.data;
  }

  const { data: formFetchedData, isLoading } = useSWR('getOnboardData', fetcher2);

  useEffect(() => {
    if (formFetchedData) {
      console.log("formFetchedData", formFetchedData);
      setFormData({
        firstName: formFetchedData.firstName,
        lastName: formFetchedData.lastName,
        dob: formFetchedData.dob,
        gender: formFetchedData?.gender,
        email: formFetchedData.email,
        religion: formFetchedData.religion ? JSON.parse(formFetchedData.religion) : null,
        caste: formFetchedData.caste ? JSON.parse(formFetchedData.caste) : null,
        subCaste: formFetchedData.gotra,
        bloodGroup: formFetchedData.bloodGroup,

      });

      const regiousData = formFetchedData.religion ? JSON.parse(formFetchedData.religion) : null;
      setReligionId(regiousData?.id);

    }
  }, [formFetchedData]);

  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);

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

  const [religionId, setReligionId] = useState('');

  const [selectedItem, setSelectedItem] = useState(null);

  const [casts, setCasts] = useState([]);

  const handleInputChange = (name, value) => {
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
      const castArray = data?.caste[selectedItem?.id]?.[0]?.map((item) => {
        const [id, name] = Object.entries(item)[0];
        return name ? { id: parseInt(id), title: name } : null;
      }

      ).filter(Boolean);;
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
      try {

        setLoading(true);
        const payload = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          dob: formData.dob,
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
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
        });
        setLoading(false);
        console.log("error", error);
      }

    }
  };

  if (isLoading || isLoading2) {
    return <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  }




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

          <Button
            mode="outlined"
            onPress={() => setOpen(true)}
            style={styles.buttons}
          >
            {formData.dob ? new Date(formData.dob).toDateString() : 'Select Date of Birth'}
          </Button>

          <DatePicker
            modal
            open={open}
            date={
              formData.dob ? new Date(formData.dob) : new Date()
            }
            onConfirm={(date) => {
              setOpen(false)
              handleInputChange('dob', date)
            }}
            theme='light'
            mode="date"
            onCancel={() => {
              setOpen(false)
            }}
            maximumDate={new Date()} 
          />
          <FieldHelperText error={errors.gender} />


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

          <View style={[styles.input, { zIndex: openGender ? 2000 : 1 }]}>
            <DropDownPicker
              open={openGender}
              value={formData.gender}
              items={genderItems}
              style={{
                backgroundColor: '#fff3f4',
              }}
              containerStyle={{
                backgroundColor: '#fff3f4',
                borderRadius: 10,
              }}
              dropDownContainerStyle={{
                zIndex: 2000,
                borderColor: '#d0d0d0',
                backgroundColor: '#ffffff',
              }}
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

          {
            religions?.length > 0 && <View style={styles.input}>
              <AutocompleteDropdown
                clearOnFocus={false}
                closeOnBlur={true}
                placeholder="Select Religion"
                initialValue={{
                  id: religionId
                }}
                onSelectItem={(item) => {
                  setSelectedItem(item);
                  handleInputChange('religion', item)
                }}
                dataSet={religions}
                inputContainerStyle={{
                  backgroundColor: '#fff3f4',
                  borderRadius: 10,
                  width: '100%',
                  borderColor: '#000',
                  borderWidth: 1,
                  marginTop: 10,
                }}

                textInputProps={{
                  placeholder: 'Select Religion',
                  autoCorrect: false,
                  autoCapitalize: 'none',
                  style: {
                    borderRadius: 25,
                    backgroundColor: '#fff3f4',
                    color: '#000',
                    paddingLeft: 18,
                  },
                }}
              />
            </View>
          }


          <View style={styles.input}>
            <AutocompleteDropdown
              clearOnFocus={false}
              closeOnBlur={true}
              placeholder="Select Caste"
              inputContainerStyle={{
                backgroundColor: '#fff3f4',
                borderRadius: 10,
                width: '100%',
                borderColor: '#000',
                borderWidth: 1,
                marginTop: 10,
              }}

              textInputProps={{
                placeholder: 'Select Caste',
                autoCorrect: false,
                autoCapitalize: 'none',
                style: {
                  borderRadius: 25,
                  backgroundColor: '#fff3f4',
                  color: '#000',
                  paddingLeft: 18,
                },
              }}
              onSelectItem={(item) => handleInputChange('caste', item)}
              dataSet={casts}
            />
          </View>



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
              style={{
                backgroundColor: '#fff3f4',
                marginBottom: 10,
                marginTop: 10
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
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: '#fff3f4',
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
    backgroundColor: '#fff3f4',
    zIndex: 1000
    // marginBottom: 10,
  },
  button: {
    marginTop: 30,
  },
  buttons: {
    marginTop: 30,
    marginBottom: 10
  }
});

export default Step1;
