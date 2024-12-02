import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Card, Avatar, Button, TextInput } from "react-native-paper";
import ProfileCard from "./Card/ProfileCard";
import { Picker } from "@react-native-picker/picker";
import CountryStsLst from 'country-state-city-plus';
import { AutocompleteDropdown, AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import useSWR from "swr";
import { ApplyFilter, GetOnBoardingSheet } from "../services/endpoint";
import DropDownPicker from "react-native-dropdown-picker";


const QuickSearch = () => {
  const [showCards, setShowCards] = useState(false); // State to toggle between search form and cards
  const [isLoading, setIsLoading] = useState(false);

  const [config, setConfig] = useState({
    address: {
      country: {},
      state: {},
      city: {},
    },
  });
  const [religions, setReligions] = useState([

  ]);



  const fetcher = async () => {
    const response = await GetOnBoardingSheet();
    return response.data;
  }

  const { data, isLoading: isLoading2 } = useSWR('getOnBoardingSheetData', fetcher);


  useEffect(() => {
    if (data) {
      const transformedReligionArray = data?.religion[0].map((item) => {
        const [id, name] = Object.entries(item)[0];
        return { id: parseInt(id), title: name };
      });
      setReligions(transformedReligionArray);
    }
  }, [data]);

  const [selectedItem, setSelectedItem] = useState(null);

  const [formData, setFormData] = useState({
    religion: '',
    caste: '',
    age: '',
  });

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

  const [openAge, setOpenAge] = useState(false);

  const [errors, setErrors] = useState({});

  const countries_list = CountryStsLst.getAllCountries();
  const states_list = config.address?.country?.id
    ? CountryStsLst.getStatesOfCountry(config.address?.country?.id)
    : [];
  const cities_list = config.address?.state?.id
    ? CountryStsLst.getCitiesOfState(config.address?.state?.id)
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

  const [casts, setCasts] = useState([]);


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


  // Sample card data
  // const cards = Array.from({ length: 10 }).map((_, index) => ({
  //   id: index.toString(),
  //   name: `Profile ${index + 1}`,
  //   location: `Location ${index + 1}`,
  //   education: `Education ${index + 1}`,
  //   age: 25 + index,
  //   weight: 60 + index,
  //   height: 160 + index,
  //   status: index % 2 === 0 ? "Active" : "Inactive",
  // }));

  const [cards, setCards] = useState([]);

  const renderCard = ({ item }) => (
    <ProfileCard item={item} />
  );

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

    if (selectedItem) {
      const castArray = data?.caste[selectedItem?.id]?.[0]?.map((item) => {
        const [id, name] = Object.entries(item)[0];
        return name ? { id: parseInt(id), title: name } : null;
      }

      ).filter(Boolean);;
      setCasts(castArray);
    }

  }, [selectedItem]);

  const handleApply = async () => {
    try {

      setIsLoading(true);
      const payload = {
        religion: formData.religion,
        caste: formData.caste,
        age: [
       formData.age
        ]
      };

      const response = await ApplyFilter(payload);

      setCards(response.data?.data);
      
      setShowCards(true);

      setIsLoading(false);



    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }


  return (
    <AutocompleteDropdownContextProvider>
      <View style={styles.container}>
        {showCards ? (
          // Show Cards when `showCards` is true
          <>
            <Text style={styles.title}>Quick Search Results</Text>

            {
              cards.length === 0 && (
                <View style={styles.noChatsContainer}>
                  <Text style={styles.noChatsText}>No profiles found 🙃</Text>
                </View>
              )
            }

            <FlatList
              data={cards}
              renderItem={renderCard}
              keyExtractor={(item) => item.id}
              numColumns={1}  // Ensure only one component per row
              showsVerticalScrollIndicator={false}
            />
          </>
        ) : (
          // Show Search Form when `showCards` is false
          <View
            style={{
              margin: 20,
            }}
          >
            <View style={styles.searchBox}>
              {/* <Text style={styles.headerText}>
                Search By Location
              </Text> */}
              {/* </View> */}
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={config?.address?.country?.id}
                  onValueChange={handleCountryChange}
                  style={styles.picker}
                >
                  <Picker.Item label="Select Country" value="" />
                  {countries_list?.map((country) => (
                    <Picker.Item key={country?.id} label={country?.name} value={country?.id} />
                  ))}
                </Picker>
              </View>

              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={config.address?.state?.id}
                  onValueChange={handleStateChange}
                  style={styles.picker}
                >
                  <Picker.Item label="Select State" value="" />
                  {states_list.map((state) => (
                    <Picker.Item key={state?.id} label={state?.name} value={state?.id} />
                  ))}
                </Picker>
              </View>

              <View style={styles.pickerContainer}>
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
                  style={styles.picker}
                >
                  <Picker.Item label="Select City" value="" />
                  {cities_list?.map((city) => (
                    <Picker.Item key={city?.id} label={city.name} value={city?.id} />
                  ))}
                </Picker>
              </View>

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
                    dataSet={religions}
                    inputContainerStyle={{
                      backgroundColor: '#fff3f4',
                      borderRadius: 10,
                      width: '100%',
                      borderColor: '#000',
                      borderWidth: 1,
                      padding: 5,
                      marginBottom: 10,
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
                    marginBottom: 10,
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

              {/* <TextInput 
            mode="outlined"
            style={styles.input} placeholder="Search by caste" /> */}
              <DropDownPicker
                open={openAge}
                value={formData.age}
                items={ageItems}
                style={{
                  backgroundColor: '#fff3f4',
                  marginBottom: 5,
                  marginTop: 10
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
            </View>
            <Button
              mode="contained"
              loading={isLoading}
              disabled={isLoading}
              onPress={handleApply} >
              Search
            </Button>
          </View>
        )}
      </View>
    </AutocompleteDropdownContextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    margin: 0,
    backgroundColor: "#fff3f4"
  },
  title: {
    fontSize: 20, marginBottom: 10,
    marginLeft: 20,
    marginTop: 10,
    fontWeight: "bold"
  },
  headerText: { fontSize: 20, fontWeight: "bold", marginBottom: 25 },
  searchBox: { backgroundColor: "", padding: 0, marginBottom: 20 },
  input: {
    backgroundColor: "#fff3f4",
  },
  card: {
    margin: 10,
    padding: 20,
    backgroundColor: "lightgray",
    borderRadius: 5,
  },
  heartIcon: {
    fontSize: 20,
    color: "red",
    marginRight: 16,
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: '#fff3f4', // Light background color
    borderWidth: 1, // Border width
    borderColor: 'black', // Border color
    borderRadius: 10, // Rounded corners
    overflow: 'hidden', // Ensures content stays within rounded corners
    marginBottom: 30// Bottom mar
  },
  picker: {
    height: 50, // Height of the picker
    color: '#000', // Text color
  },
  noChatsContainer: {
    alignItems: 'center',
    marginTop: 200
  },
  noChatsText: {
    fontWeight: '600',
    fontSize: 24,
    letterSpacing: 1,
    color: '#333',
  },
});

export default QuickSearch;
