import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput, Button } from 'react-native-paper';
import FieldHelperText from '../../component/FieldHelperText';
import useSWR from 'swr';
import CountryStsLst from 'country-state-city-plus';
import { Picker } from '@react-native-picker/picker';
import { UserOnBoard } from '../../services/endpoint';


const Step2 = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    maritalStatus: '',
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

  const [config, setConfig] = useState({
    address: {
      streetone: '',
      city: { id: '', name: '', state_id: '' } || '',
      state: { country_id: '', id: '', name: '' } || '',
      country: { id: '', name: '', phonecode: '', sortname: '' } || '',
      pincode: '',
    },
    loading: false,
  });

  
  const [config2, setConfig2] = useState({
    address: {
      streetone: '',
      city: { id: '', name: '', state_id: '' } || '',
      state: { country_id: '', id: '', name: '' } || '',
      country: { id: '', name: '', phonecode: '', sortname: '' } || '',
      pincode: '',
    },
    loading: false,
  }
);

  
  const {data:formFetchedData, isLoading} = useSWR('getOnboardData');

  useEffect(() => {
    if(formFetchedData){
      setFormData({
        maritalStatus: formFetchedData.maritalStatus,
        horoscope: formFetchedData.horoscope,
        currentAddress: {
          address: formFetchedData.currentLocation?.address,
          pincode: formFetchedData.currentLocation?.pincode,
          city: formFetchedData.currentLocation?.city,
          state: formFetchedData.currentLocation?.state,
          country: formFetchedData.currentLocation?.country,
        },
        permanentAddress: {
          address: formFetchedData.nativeLocation?.address,
          pincode: formFetchedData.nativeLocation?.pincode,
          city: formFetchedData.nativeLocation?.city,
          state: formFetchedData.nativeLocation?.state,
          country: formFetchedData.nativeLocation?.country,
        },
      })

      setConfig((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          city: formFetchedData?.currentLocation?.cityFull,
          state: formFetchedData?.currentLocation?.stateFull,
          country: formFetchedData?.currentLocation?.countryFull,
        },
      }));

      setConfig2((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          city: formFetchedData.nativeLocation?.cityFull,
          state: formFetchedData.nativeLocation?.stateFull,
          country: formFetchedData.nativeLocation?.countryFull,
        },
      }));

      
    }
  }, [formFetchedData])



  const countries_list = CountryStsLst.getAllCountries();
  const states_list = config.address?.country?.id
    ? CountryStsLst.getStatesOfCountry(config.address?.country?.id)
    : [];
  const cities_list = config.address?.state?.id
    ? CountryStsLst.getCitiesOfState(config.address?.state?.id)
    : [];

  
  const countries_list2 = CountryStsLst.getAllCountries();
  const states_list2 = config2.address?.country?.id
    ? CountryStsLst.getStatesOfCountry(config2.address?.country?.id)
    : [];
  const cities_list2 = config2.address?.state?.id
    ? CountryStsLst.getCitiesOfState(config2.address?.state?.id)
    : [];



  const handleChange = (field, value) => {
    setConfig((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [field]: value,
      },
    }));
  };

  const handleChange2 = (field, value) => {
    setConfig2((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [field]: value,
      },
    }));
  };

  const handleCountryChange = (countryId) => {

    if (!countryId) return

    const country = countries_list.find((c) => c.id === countryId);
    handleChange('country', country);
    handleChange('state', { country_id: countryId, id: '', name: '' });
    handleChange('city', { id: '', name: '', state_id: '' });

    setErrors((prev) => ({
      ...prev,
      currentCountry: '',
    }));
  };

  const handleCountryChange2 = (countryId) => {

    if (!countryId) return

    const country = countries_list2.find((c) => c.id === countryId);
    handleChange2('country', country);
    handleChange2('state', { country_id: countryId, id: '', name: '' });
    handleChange2('city', { id: '', name: '', state_id: '' });

    setErrors((prev) => ({
      ...prev,
      nativeCountry: '',
    }));
  };

  const handleStateChange = (stateId) => {

    if (!stateId) return

    const state = states_list.find((s) => s.id === stateId);
    handleChange('state', state);
    handleChange('city', { id: '', name: '', state_id: stateId });

    setErrors((prev) => ({
      ...prev,
      currentState: '',
    }));
  };

  const handleStateChange2 = (stateId) => {

    if (!stateId) return

    const state = states_list2.find((s) => s.id === stateId);
    handleChange2('state', state);
    handleChange2('city', { id: '', name: '', state_id: stateId });

    setErrors((prev) => ({
      ...prev,
      nativeState: '',
    }));
  };

  const [errors, setErrors] = useState({});

  const [openMaritalStatus, setOpenMaritalStatus] = useState(false);
  const [maritalStatusItems, setMaritalStatusItems] = useState([
    { label: 'Single', value: 'SINGLE' },
    { label: 'Married', value: 'MARRIED' },
    { label: 'Divorced', value: 'DIVORCED' },
    { label: 'Widowed', value: 'WIDOWED' },
    { label: 'Annulled', value: 'ANNULLED' },
    { label: 'Awaiting Divorce', value: 'AWAITING_DIVORCED' }
  ]);

  const handleInputChange = (field, value, addressType, key) => {
    if (addressType) {
      setFormData((prev) => ({
        ...prev,
        [addressType]: {
          ...prev[addressType],
          [key]: value,
        },
      }));

      setErrors((prev) => ({
        ...prev,
        [addressType]: '',
      }));



    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }

    // setErrors((prev) => ({
    //   ...prev,
    //   [name]: '',
    // }));
  };

  const handleContinue = async () => {
    if(validateFields()){
      console.log('Form Data:', formData);
    try{

      

      setLoading(true);
      const payload = {
        currentLocation:{
          "country":config.address.country.name,
          "state":config.address.state.name,
          "city":config.address.city.name,
          "address":formData.currentAddress.address,
          "pincode":formData.currentAddress.pincode,
          "countryFull":config.address.country,
          "stateFull":config.address.state,
          "cityFull":config.address.city,
        },

        nativeLocation:{
          "country":config2.address.country.name,
          "state":config2.address.state.name,
          "city":config2.address.city.name,
          "address":formData.permanentAddress.address,
          "pincode":formData.permanentAddress.pincode,
          "countryFull":config2.address.country,
          "stateFull":config2.address.state,
          "cityFull":config2.address.city,
        },

        maritalStatus: formData.maritalStatus,
        horoscope: formData.horoscope,

      }

      const response = await UserOnBoard(payload);
      
      router.push('userDetails/step3');
        
      setLoading(false);

    

    }catch(e){

      setLoading(false);
      console.log(e)
    }
  }
  };

  const validateFields = () => {
    const newErrors = {};
  
    // Validate current location fields
    if (!config?.address?.country?.name) {
      newErrors.currentCountry = 'Current country is required.';
    }
    if (!config?.address?.state?.name) {
      newErrors.currentState = 'Current state is required.';
    }
    if (!config?.address?.city?.name) {
      newErrors.currentCity = 'Current city is required.';
    }
    if (!formData?.currentAddress?.address) {
      newErrors.currentAddress = 'Current address is required.';
    }

    if(!formData?.currentAddress?.pincode){
      newErrors.currentPincode = 'Current pincode is required.';
    }
  
    // Validate native location fields
    if (!config2?.address?.country?.name) {
      newErrors.nativeCountry = 'Permanent country is required.';
    }
    if (!config2?.address?.state?.name) {
      newErrors.nativeState = 'Permanent state is required.';
    }
    if (!config2?.address?.city?.name) {
      newErrors.nativeCity = 'Permanent city is required.';
    }
    if (!formData?.permanentAddress?.address) {
      newErrors.nativeAddress = 'Permanent address is required.';
    }

    if(!formData?.permanentAddress?.pincode){
      newErrors.nativePincode = 'Permanent pincode is required.';
    }
  
    // Validate marital status
    if (!formData?.maritalStatus) {
      newErrors.maritalStatus = 'Marital status is required.';
    }
  
    // Validate horoscope
    if (!formData?.horoscope) {
      newErrors.horoscope = 'Horoscope is required.';
    }
  
    console.log('Errors:', newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  console.log("config",config);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Tell us about yourself</Text>
      <View style={styles.formContainer}>
        {/* Caste and Horoscope */}

        <View style={styles.input}>
          <DropDownPicker
            open={openMaritalStatus}
            value={formData.maritalStatus}
            items={maritalStatusItems}
            setOpen={setOpenMaritalStatus}
            setValue={(callback) => {
              const value = typeof callback === 'function' ? callback(formData.gender) : callback;
              handleInputChange('maritalStatus', value);
              console.log('Selected Gender:', value);
              setErrors((prev) => ({
                ...prev,
                maritalStatus: '',
              }));
            }}
            setItems={setMaritalStatusItems}
            placeholder="Select Marital Status"
          />
        </View>
        <FieldHelperText error={errors.maritalStatus} />
        <TextInput
          label="Horoscope"
          mode="outlined"
          value={formData.horoscope}
          onChangeText={(text) => {
    
            setErrors((prev) => ({
              ...prev,
              horoscope: '',
            }));
            
            handleInputChange('horoscope', text)}}
          style={styles.input}
        />
        <FieldHelperText error={errors.horoscope} />

        {/* Current Address */}
        <Text style={styles.subHeader}>Current Address</Text>
        <TextInput
          label="Enter the address"
          mode="outlined"
          value={formData.currentAddress.address}
          onChangeText={(text) => handleInputChange(null, text, 'currentAddress', 'address')}
          style={styles.input}
        />
        <FieldHelperText error={errors.currentAddress} />
        {/* <View style={styles.row}> */}
        <TextInput
          label="Pincode"
          keyboardType='numeric'
          mode="outlined"
          value={formData.currentAddress.pincode}
          onChangeText={(text) => {
            setErrors((prev) => ({
              ...prev,
              currentPincode: '',
            }));
            handleInputChange(null, text, 'currentAddress', 'pincode')}}
          style={styles.input}
        />
        <FieldHelperText error={errors.currentPincode} />

        {/* </View> */}
        <Picker
          selectedValue={config?.address?.country?.id}
          onValueChange={handleCountryChange}
          style={styles.input}
        >
          <Picker.Item label="Select Country" value="" />
          {countries_list?.map((country) => (
            <Picker.Item key={country?.id} label={country?.name} value={country?.id} />
          ))}
        </Picker>

          <FieldHelperText error={errors.currentCountry} />

        <Picker
          selectedValue={config.address?.state?.id}
          onValueChange={handleStateChange}
          style={styles.input}
        >
          <Picker.Item label="Select State" value="" />
          {states_list.map((state) => (
            <Picker.Item key={state?.id} label={state?.name} value={state?.id} />
          ))}
        </Picker>

          <FieldHelperText error={errors.currentState} />

        <Picker
          selectedValue={config.address?.city?.id}
          onValueChange={(cityId) => {
            if (!cityId) return
            handleChange('city', cities_list.find((city) => city.id === cityId))
            setErrors((prev) => ({
              ...prev,
              currentCity: '',
            }));
          }
          }
          style={styles.input}
        >
          <Picker.Item label="Select City" value="" />
          {cities_list?.map((city) => (
            <Picker.Item key={city?.id} label={city.name} value={city?.id} />
          ))}
        </Picker>

          <FieldHelperText error={errors.currentCity} />


        {/* Permanent Address */}
        <Text style={styles.subHeader}>Permanent Address</Text>
        <TextInput
          label="Enter the address"
          mode="outlined"
          value={formData.permanentAddress.address}
          onChangeText={(text) => {
            setErrors((prev) => ({
              ...prev,
              nativeAddress: '',
            }));
            handleInputChange(null, text, 'permanentAddress', 'address')}}
          style={styles.input}
        />

        <FieldHelperText error={errors?.nativeAddress} />
        {/* <View style={styles.row}> */}
        <TextInput
          label="Pincode"
          mode="outlined"
          keyboardType='numeric'
          value={formData.permanentAddress.pincode}
          onChangeText={(text) => {
            setErrors((prev) => ({
              ...prev,
              nativePincode: '',
            }));
            handleInputChange(null, text, 'permanentAddress', 'pincode')}}
          style={styles.input}
        />

        <FieldHelperText error={errors?.nativePincode} />
        {/* <TextInput
            label="City"
            mode="outlined"
            value={formData.permanentAddress.city}
            onChangeText={(text) => handleInputChange(null, text, 'permanentAddress', 'city')}
            style={styles.halfInput}
          /> */}


        <Picker
          selectedValue={config2?.address?.country?.id}
          onValueChange={handleCountryChange2}
          style={styles.input}
        >
          <Picker.Item label="Select Country" value="" />
          {countries_list2?.map((country) => (
            <Picker.Item key={country?.id} label={country?.name} value={country?.id} />
          ))}
        </Picker>

        <FieldHelperText error={errors.nativeCountry} />
        <Picker
          selectedValue={config2.address?.state?.id}
          onValueChange={handleStateChange2}
          style={styles.input}
        >
          <Picker.Item label="Select State" value="" />
          {states_list2.map((state) => (
            <Picker.Item key={state?.id} label={state?.name} value={state?.id} />
          ))}
        </Picker>

        <FieldHelperText error={errors?.nativeState} />


        <Picker
          selectedValue={config2.address?.city?.id}
          onValueChange={(cityId) => {
            if (!cityId) return
            handleChange2('city', cities_list2.find((city) => city.id === cityId))
            setErrors((prev) => ({
              ...prev,
              nativeCity: '',
            }));
          }
          }
          style={styles.input}
        >
          <Picker.Item label="Select City" value="" />
          {cities_list2?.map((city) => (
            <Picker.Item key={city?.id} label={city.name} value={city?.id} />
          ))}
        </Picker>

        <FieldHelperText error={errors?.nativeCity} />


        {/* Continue Button */}
        <Button
          mode="contained"
          onPress={handleContinue}
          style={styles.button}
          uppercase={false}
          disabled={loading}
          loading={loading}
        >
          Continue
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
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
    marginBottom: 50
  },
});

export default Step2;
