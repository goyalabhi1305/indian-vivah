import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, ScrollView } from 'react-native';
import { AutocompleteDropdown, AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput, Button, Card, Text, Avatar, Provider } from 'react-native-paper';
import useSWR from 'swr';
import { ApplyFilter, GetOnBoardingSheet } from '../services/endpoint';
import ProfileCard from './Card/ProfileCard';

const AdvancedSearch = () => {
  const [showInputs, setShowInputs] = useState(true); // Controls visibility of inputs
  const [searchResults, setSearchResults] = useState([]); // Stores search results
  const [loading, setLoading] = useState(false);

  const [openAge, setOpenAge] = useState(false);
  const [openMaritalStatus, setOpenMaritalStatus] = useState(false);
  const [errors, setErrors] = useState({});

  const [openDrinkingHabits, setOpenDrinkingHabits] = useState(false);

  const [openSmoking, setOpenSmoking] = useState(false);

  const [openDiet, setOpenDiet] = useState(false);
  const dietItems = [
    { label: 'Vegetarian', value: 'VEG' },
    { label: 'Non-Vegetarian', value: 'NON_VEG' }
];


  const [selectedItem, setSelectedItem] = useState(null);
  const [casts, setCasts] = useState([]);
  const [religions, setReligions] = useState([
  ]);

  

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

  const ageItems = [
    { label: '18-25', value: '18-25' },
    { label: '26-30', value: '26-30' },
    { label: '31-35', value: '31-35' },
    { label: '36-40', value: '36-40' },
    { label: '41-50', value: '41-50' },
    { label: '51-60', value: '51-60' },
    { label: '61-70', value: '61-70' },
    { label: '71-80', value: '71-80' },
    { label: '81-90', value: '81-90' },
    { label: '91-100', value: '91-100' },
  ];

  const [maritalStatusItems, setMaritalStatusItems] = useState([
    { label: 'Single', value: 'SINGLE' },
    { label: 'Married', value: 'MARRIED' },
    { label: 'Divorced', value: 'DIVORCED' },
    { label: 'Widowed', value: 'WIDOWED' },
    { label: 'Annulled', value: 'ANNULLED' },
    { label: 'Awaiting Divorce', value: 'AWAITING_DIVORCED' }
  ]);

  const smokingArray = [
    { label: 'Never', value: 'NEVER' },
    { label: 'Occasionally', value: 'OCCASIONALLY' },
    { label: 'Frequently', value: 'FREQUENTLY' },
];

const drinkingHabitsArray = [
    { label: 'Never', value: 'NEVER' },
    { label: 'Occasionally', value: 'OCCASIONALLY' },
    { label: 'Frequently', value: 'FREQUENTLY' },
];
  const { data, isLoading: isLoading2 } = useSWR('getOnBoardingSheetData', fetcher);

  const fetcher = async () => {
    const response = await GetOnBoardingSheet();
    return response.data;
  }

  useEffect(() => {
    if (data) {
      const transformedReligionArray = data?.religion[0].map((item) => {
        const [id, name] = Object.entries(item)[0];
        return { id: parseInt(id), title: name };
      });
      setReligions(transformedReligionArray);
    }
  }, [data]);

  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    maritalStatus: '',
    religion: '',
    caste: '',
    complexion: '',
    weight: '',
    subCaste: '',
    height: '',
    education: '',
    profession: '',
    annualIncome: '',
    diet: '',
    drinkingHabits: '',
    smoking: '',

  });

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
  // Sample data for FlatList
  const dummyData = Array.from({ length: 10 }).map((_, index) => ({
    id: index.toString(),
    name: `Profile ${index + 1}`,
    location: `Location ${index + 1}`,
    education: `Education ${index + 1}`,
    age: 25 + index,
    weight: 60 + index,
    height: 160 + index,
    status: index % 2 === 0 ? "Active" : "Inactive",
  }));
  const dummyData2 = [
    {
      id: '1',
      name: 'John Doe',
      age: 28,
      weight: '70 kg',
      height: '5 ft 8 in',
      location: 'New York',
      education: 'Engineer',
      status: 'Single',
    },
    {
      id: '2',
      name: 'Jane Smith',
      age: 25,
      weight: '58 kg',
      height: '5 ft 4 in',
      location: 'California',
      education: 'Doctor',
      status: 'Single',
    },
    {
      id: '3',
      name: 'Alice Johnson',
      age: 30,
      weight: '62 kg',
      height: '5 ft 6 in',
      location: 'Texas',
      education: 'Lawyer',
      status: 'Divorced',
    },
  ];

  const handleSearch = async () => {
    try {
    //   {
    //     "occupation": "engineer",
    //     "manglikStatus": "MANGLIK",
    //     "gender": "MALE",
    //     "age": [
    //         "24-30",
    //         "35-40"
    //     ],
    //     "diet": "VEG",
    //     "weight": 75, 
    //     "height": "180",
    //     "complexion": "Fair",
    //     "education": "Bachelors in Computer Science",
    //     "religion": "Christianity",
    //     "caste": "General",
    //     "gotra": "Sharma",
    //     "salary": 85000,
    //     "maritalStatus": "SINGLE"
    // }

    setLoading(true);

      const payload = {
        height: formData.height,
        gender: formData.gender,
        age: [formData.age],
        maritalStatus: formData.maritalStatus,
        religion: formData.religion?.title ? JSON.stringify(formData.religion) : '',
        caste: formData.caste?.title ? JSON.stringify(formData.caste) : '',
        complexion: formData.complexion,
        weight: formData.weight,
        subCaste: formData.subCaste,
        education: formData.education,
        profession: formData.profession,
        annualIncome: formData.annualIncome,
        diet: formData.diet,
        drinkingHabits: formData.drinkingHabits,
        smoking: formData.smoking,
      };

      const response = await ApplyFilter(payload);

      setLoading(false);

      setSearchResults(response.data?.data);
      
      setShowInputs(false);



    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const renderCard = ({ item }) => (
    <ProfileCard item={item} />
  );

  const handleBack = () => {
    setShowInputs(true);
  };

  return (
    <AutocompleteDropdownContextProvider>
      <View >
        {showInputs ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              padding: 16,
              marginBottom: 10
            }}
          >

            {/* Personal Details */}
            <Text style={styles.sectionHeader}>Personal Details</Text>
            {/* <View style={styles.row}>
             
              <TextInput
                label="Height (in)"
                style={styles.input}
                keyboardType="numeric"
              />
            </View> */}
            <TextInput
              label="Height (ft)"
              style={styles.input}
              keyboardType="numeric"
              onChangeText={(text) => handleInputChange('height', text)}
              value={formData.height}
            />

            <DropDownPicker
              open={openAge}
              value={formData.age}
              items={ageItems}
              style={{
                backgroundColor: '#fff3f4',
                marginBottom: 10,
                marginTop: 10,
                zIndex: 1,
                backgroundColor: '#fff3f4',
              }}

              setOpen={setOpenAge}
              setValue={(callback) => {
                const value = typeof callback === 'function' ? callback(formData.gender) : callback;
                handleInputChange('age', value);
                console.log('Selected Age:', value);
              }}
              // setItems={setGenderItems}

              placeholder="Select Age"
            />

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
              style={{
                backgroundColor: '#fff3f4',
                marginBottom: 20,
                marginTop: 10,
                zIndex: 1,
                backgroundColor: '#fff3f4',
              }}
              setItems={setMaritalStatusItems}
              placeholder="Select Marital Status"
            />
            {
              religions?.length > 0 && <View style={styles.input}>
                <AutocompleteDropdown
                  clearOnFocus={false}
                  closeOnBlur={true}
                  placeholder="Select Religion"

                  onSelectItem={(item) => {
                    setSelectedItem(item);
                    handleInputChange('religion', item)
                  }}
                  style={{
                    backgroundColor: '#fff3f4',
                    marginBottom: 5,
                    marginTop: 10
                  }}
                  dataSet={religions}
                  inputContainerStyle={{
                    backgroundColor: '#fff3f4',
                    borderRadius: 10,
                    width: '100%',
                    borderColor: '#000',
                    borderWidth: 1,
                    padding: 5,
                    marginBottom: 5,
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
                  padding: 5,
                  marginBottom: 0,
                  marginTop: 0,
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

            <TextInput label="Complexion" 
            onChangeText={(text) => handleInputChange('complexion', text)}
            value={formData.complexion}
          
            style={styles.input} />
            <TextInput
              label="Weight"
              onChangeText={(text) => handleInputChange('weight', text)}
              value={formData.weight}
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput

              onChangeText={(text) => handleInputChange('subCaste', text)}
              value={formData.subCaste}
            
            label="Sub caste / Gotra" style={styles.input} />

            {/* Location */}
            {/* <Text style={styles.sectionHeader}>Location</Text>
            <TextInput label="City" style={styles.input} />
            <TextInput label="State" style={styles.input} /> */}

            {/* Professional Details */}
            <Text style={styles.sectionHeader}>Professional Details</Text>
            <TextInput label="Education" style={styles.input} 
            onChangeText={(text) => handleInputChange('education', text)}
            value={formData.education}
            
            />
            <TextInput
              onChangeText={(text) => handleInputChange('profession', text)}
              value={formData.profession}
            
            label="Profession" style={styles.input} />
            <TextInput
              label="Annual Income"
              style={styles.input}
              onChangeText={(text) => handleInputChange('annualIncome', text)}
              value={formData.annualIncome}
              keyboardType="numeric"
            />

            {/* Hobbies */}
            <Text style={styles.sectionHeader}>Hobbies</Text>
            <View style={styles.input}>
                            <DropDownPicker
                                open={openDiet}
                                value={formData.diet}
                                items={dietItems}

                                setOpen={setOpenDiet}
                                setValue={(callback) => {
                                    const value = typeof callback === 'function' ? callback(formData.gender) : callback;
                                    handleInputChange('diet', value);
                                    console.log('Selected Gender:', value);
                                }}

                                style={{
                                    backgroundColor: '#fff3f4',
                                }}

                                placeholder="Select Diet"
                            />
                        </View>
                        <View style={styles.input}>
                    <DropDownPicker
                        open={openDrinkingHabits}
                        value={formData.drinkingHabits}
                        items={drinkingHabitsArray}
                        setOpen={setOpenDrinkingHabits}
                        style={{
                            zIndex: 1,
                            backgroundColor: '#fff3f4',
                        }}
                        setValue={(callback) => {
                            const value = typeof callback === 'function' ? callback(formData.bloodGroup) : callback;
                            handleInputChange('drinkingHabits', value);
                            console.log('drinkingHabits', value);
                        }}
                        placeholder="Select Drinking Habits"
                        direction="BOTTOM"
                  
                    />

                </View>

                <View style={styles.input}>
                    <DropDownPicker
                        open={openSmoking}
                        value={formData.smoking}
                        items={smokingArray}
                        setOpen={setOpenSmoking}
                        style={{
                            zIndex: 1,
                            backgroundColor: '#fff3f4',
                        }}
                        setValue={(callback) => {
                            const value = typeof callback === 'function' ? callback(formData.bloodGroup) : callback;
                            handleInputChange('smoking', value);
                            console.log('smoking', value);
                        }}
                        placeholder="Select Smoking Habits"
                        direction=""
                    />

                </View>

            {/* Horoscope Details */}
            {/* <Text style={styles.sectionHeader}>Horoscope Details</Text>
            <TextInput label="Star" style={styles.input} />
            <TextInput label="Dosh" style={styles.input} /> */}

            {/* Search Button */}
            <Button mode="contained" style={
              {
                marginTop: 16,
                paddingVertical: 0,
                marginBottom: 32,
              }
            } 
            loading={loading}
            disabled={loading}
            onPress={handleSearch}>
              Search
            </Button>
          </ScrollView>
        ) : (
          <View style={styles.resultContainer}>
            {/* <Button
              mode="outlined"
              style={styles.backButton}
              onPress={handleBack}
            >
              Back to Search
            </Button> */}
            <FlatList
              data={searchResults}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item._id}
              renderItem={renderCard}

            />
          </View>
        )}
      </View>
    </AutocompleteDropdownContextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3f4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 8,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff3f4',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 16,
    paddingVertical: 0,
    marginBottom: 32,
  },
  resultContainer: {
    // flex: 1,
    marginBotton: 10,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 15,
    backgroundColor: '#fff3f4',
  },
  backButton: {
    marginBottom: 8,
    marginTop: -16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#f6f6f6',
  },
  heartIcon: {
    fontSize: 18,
    color: 'red',
    marginRight: 16,
  },
});

export default AdvancedSearch;
