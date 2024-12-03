import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AutocompleteDropdown, AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput, Button, Menu, Provider } from 'react-native-paper';

import { useHeaderHeight } from '@react-navigation/elements';
import { UserOnBoard } from '../../services/endpoint';
import FieldHelperText from '../../component/FieldHelperText';
import useSWR from 'swr';
//...

const Step3 = () => {
    const headerHeight = useHeaderHeight();

    const router = useRouter();
    const [formData, setFormData] = useState({
        education: '',
        aboutCareer: '',
        otherThings: '',
        income: '',
        company: '',
        officeLocation: '',
        position: '',
        linkedinProfile: '',
        height: '',
        diet: '',
        complexion: '',
        bio: '',
        weight: '',
    });

    const { data: formFetchedData, isLoading } = useSWR('getOnboardData');


    useEffect(() => {
        if (formFetchedData) {
            setFormData({
                education: formFetchedData.education,
                aboutCareer: formFetchedData.aboutCareer,
                otherThings: formFetchedData.otherThings,
                income: formFetchedData?.salary ? JSON.stringify(formFetchedData.salary || '') : null,
                company: formFetchedData?.occupation?.company,
                officeLocation: formFetchedData?.occupation?.officeLocation,
                position: formFetchedData?.occupation?.position,
                linkedinProfile: formFetchedData.linkedinProfile,
                height: formFetchedData.height,
                diet: formFetchedData.diet,
                complexion: formFetchedData.complexion,
                bio: formFetchedData.bio,
                weight: formFetchedData?.weight ? JSON.stringify(formFetchedData.weight || '') : null
            })
        }
    }, [formFetchedData]);

    const [loading, setLoading] = useState(false);
    const [openHeight, setOpenHeight] = useState(false);
    const [openDiet, setOpenDiet] = useState(false);
    const [openComplexion, setOpenComplexion] = useState(false);

    const [errors, setErrors] = useState({});

    const heightItems = [];

    const dietItems = [
        { label: 'Vegetarian', value: 'VEG' },
        { label: 'Non-Vegetarian', value: 'NON_VEG' }
    ];

    const complexions = [
        { value: "fair", label: "Fair" },
        { value: "light-wheatish", label: "Light Wheatish" },
        { value: "medium-wheatish", label: "Medium Wheatish" },
        { value: "dusky-wheatish", label: "Dusky Wheatish" },
        { value: "golden-wheatish", label: "Golden Wheatish" },
        { value: "light-dusky", label: "Light Dusky" },
        { value: "rich-dusky", label: "Rich Dusky" },
        { value: "olive-brown", label: "Olive Brown" },
        { value: "caramel", label: "Caramel" },
        { value: "light-brown", label: "Light Brown" },
        { value: "medium-brown", label: "Medium Brown" },
        { value: "deep-brown", label: "Deep Brown" },
        { value: "chocolate-brown", label: "Chocolate Brown" },
        { value: "ebony", label: "Ebony" },
        { value: "deep-dark", label: "Deep Dark" },
        { value: "mahogany", label: "Mahogany" },
        { value: "jet-black-brown", label: "Jet Black Brown" }
      ];

    for (let feet = 4; feet <= 7; feet++) {
        for (let inches = 0; inches < 12; inches++) {
            const label = `${feet}'${inches}"`;
            const value = label;
            heightItems.push({ title: label, id: value });
        }
    }

    // Ensure 7'0" is included (loop stops at 6'11")
    heightItems.push({ title: "7'0\"", id: "7'0\"" });

    const [menuVisible, setMenuVisible] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [field]: '',
        }));
    };

    const handleContinue = async () => {

        if (validateFields(formData)) {
            try {

                setLoading(true);

                const payload = {
                    education: formData.education,
                    aboutCareer: formData.aboutCareer,
                    otherThings: formData.otherThings,
                    salary: formData.income,
                    occupation: {
                        company: formData.company,
                        officeLocation: formData.officeLocation,
                        position: formData.position,
                    },
                    height: formData.height?.id,
                    diet: formData.diet,
                    complexion: formData.complexion,
                    bio: formData.bio,
                    weight: formData.weight,
                };

                if (formData.linkedinProfile?.length > 0) {
                    payload.linkedinProfile = formData.linkedinProfile;
                }

                const response = await UserOnBoard(payload);

                router.push('userDetails/step4');


                setLoading(false);

            } catch (e) {
                setLoading(false);
                console.log(e);
            }
        }
    };

    const validateFields = (formData) => {
        const errors = {};

        if (!formData.education) {
            errors.education = 'Education is required.';
        }

        if (!formData.aboutCareer) {
            errors.aboutCareer = 'About Career is required.';
        }

        if (!formData.weight) {
            errors.weight = 'Weight is required.';
        }


        if (!formData.income) {
            errors.income = 'Income is required.';
        }

        if (!formData.company) {
            errors.company = 'Company is required.';
        }

        if (!formData.officeLocation) {
            errors.officeLocation = 'Office Location is required.';
        }

        if (!formData.position) {
            errors.position = 'Position is required.';
        }

        // if (!formData.linkedinProfile) {
        //   errors.linkedinProfile = 'LinkedIn Profile is required.';
        // }

        if (
            formData.linkedinProfile &&
            !formData.linkedinProfile.match(/^(https?:\/\/)?([\w]+\.)?linkedin\.com\/.+$/)) {
            errors.linkedinProfile = 'Invalid LinkedIn Profile URL';
        }

        if (!formData.height?.id) {
            errors.height = 'Height is required.';
        }

        if (!formData.diet) {
            errors.diet = 'Diet is required.';
        }

        if (!formData.complexion) {
            errors.complexion = 'Complexion is required.';
        }

        if (!formData.bio) {
            errors.bio = 'Bio is required.';
        }

        console.log(errors);

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    console.log('Form Data:', formData);

    return (
        <AutocompleteDropdownContextProvider headerOffset={headerHeight} >
                <ScrollView style={styles.container}>
                    <Text style={styles.headerText}>Tell us about yourself</Text>
                    <View style={styles.formContainer}>

                        <View style={styles.input}>
                            <AutocompleteDropdown
                                clearOnFocus={false}
                                closeOnBlur={true}
                                placeholder="Select Height"
                                onSelectItem={(item) => {
                                    handleInputChange('height', item)
                                }}
                                value={formData.height}
                                dataSet={heightItems}
                                inputContainerStyle={{
                                    backgroundColor: '#fff3f4',
                                    borderRadius: 10,
                                    width: '100%',
                                    borderColor: '#000',
                                    borderWidth: 1,
                                }}

                                textInputProps={{
                                    placeholder: 'Select Height',
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

                        <FieldHelperText error={errors.height} />

                        <TextInput
                            label="Weight"
                            mode="outlined"
                            value={formData.weight}
                            onChangeText={(text) => handleInputChange('weight', text)}
                            style={styles.input}
                        />

                        <FieldHelperText error={errors.weight} />

                        {/* Education Field */}
                        <TextInput
                            label="Education"
                            mode="outlined"
                            value={formData.education}
                            onChangeText={(text) => handleInputChange('education', text)}
                            style={styles.input}
                        />

                        <FieldHelperText error={errors.education} />

                        {/* Job Field */}
                        <TextInput
                            label="Job"
                            mode="outlined"
                            value={formData.aboutCareer}
                            onChangeText={(text) => handleInputChange('aboutCareer', text)}
                            style={styles.input}
                        />

                        <FieldHelperText error={errors.aboutCareer} />

                        {/* Other Things Dropdown */}
                        {/* <Menu
                        visible={menuVisible}
                        onDismiss={() => setMenuVisible(false)}
                        anchor={
                            <TextInput
                                label="Other things"
                                mode="outlined"
                                value={formData.otherThings}
                                onFocus={() => setMenuVisible(true)}
                                style={styles.input}
                                editable={false}
                            />
                        }
                    >
                        <Menu.Item
                            onPress={() => {
                                handleInputChange('otherThings', 'Hobbies');
                                setMenuVisible(false);
                            }}
                            title="Hobbies"
                        />
                        <Menu.Item
                            onPress={() => {
                                handleInputChange('otherThings', 'Interests');
                                setMenuVisible(false);
                            }}
                            title="Interests"
                        />
                        <Menu.Item
                            onPress={() => {
                                handleInputChange('otherThings', 'Skills');
                                setMenuVisible(false);
                            }}
                            title="Skills"
                        />
                    </Menu> */}

                        {/* Income Field */}
                        <TextInput
                            label="Income"
                            mode="outlined"
                            keyboardType='numeric'
                            value={formData.income}
                            onChangeText={(text) => handleInputChange('income', text)}
                            style={styles.input}
                        />

                        <FieldHelperText error={errors.income} />

                        <View style={[styles.input,
                            { zIndex: openDiet ? 2000 : 1 }
                        ]}>
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
                                dropDownContainerStyle={{
                                    zIndex: 2000,
                                    borderColor: '#d0d0d0',
                                    backgroundColor: '#ffffff',
                                  }}

                                style={{
                                    backgroundColor: '#fff3f4',
                                }}

                                placeholder="Select Diet"
                            />
                        </View>

                        <FieldHelperText error={errors.diet} />

                        {/* Company Field */}
                        <TextInput
                            label="Company Name"
                            mode="outlined"
                            value={formData.company}
                            onChangeText={(text) => handleInputChange('company', text)}
                            style={styles.input}
                        />

                        <FieldHelperText error={errors.company} />

                        {/* Office Location Field */}

                        <TextInput
                            label="Office Location"
                            mode="outlined"
                            value={formData.officeLocation}
                            onChangeText={(text) => handleInputChange('officeLocation', text)}
                            style={styles.input}
                        />

                        <FieldHelperText error={errors.officeLocation} />

                        {/* Position Field */}
                        <TextInput
                            label="Position"
                            mode="outlined"
                            value={formData.position}
                            onChangeText={(text) => handleInputChange('position', text)}
                            style={styles.input}
                        />

                        <FieldHelperText error={errors.position} />

                        {/* LinkedIn Profile Field */}
                        <TextInput
                            label="LinkedIn Profile"
                            mode="outlined"
                            value={formData.linkedinProfile}
                            onChangeText={(text) => handleInputChange('linkedinProfile', text)}
                            style={styles.input}
                        />

                        <FieldHelperText error={errors.linkedinProfile} />

                        <TextInput
                            label="Bio"
                            multiline={true}
                            numberOfLines={4}
                            mode="outlined"
                            value={formData.bio}
                            onChangeText={(text) => handleInputChange('bio', text)}
                            style={{
                                minHeight: 120,
                                marginTop: 15,
                                backgroundColor: '#fff3f4',

                            }}
                        />

                        <FieldHelperText error={errors.bio} />


                        <DropDownPicker
                            open={openComplexion}
                            value={formData.complexion}
                            items={complexions}
                            style={{
                                backgroundColor: '#fff3f4',
                                marginBottom: 10,
                                marginTop: 10,
                                zIndex: 1,
                                backgroundColor: '#fff3f4',
                            }}

                            setOpen={setOpenComplexion}
                            setValue={(callback) => {
                                const value = typeof callback === 'function' ? callback(formData.gender) : callback;
                                handleInputChange('complexion', value);
                                console.log('Selected Age:', value);
                            }}
                            // setItems={setGenderItems}
                            listMode="SCROLLVIEW"
                            placeholder="Select Complexion"
                        />

                        <FieldHelperText error={errors.complexion} />




                        {/* Continue Button */}
                        <Button
                            mode="contained"
                            onPress={handleContinue}
                            style={styles.button}
                            uppercase={false}
                            loading={loading}
                            disabled={loading}
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
        marginBottom: 20,
    },
    formContainer: {
        width: '100%',
        marginBottom: 60,
    },
    input: {
        width: '100%',
        marginTop: 15,
        backgroundColor: '#fff3f4',
    },
    button: {
        marginTop: 10,
        backgroundColor: '#ff4f4f',
    },
});

export default Step3;
