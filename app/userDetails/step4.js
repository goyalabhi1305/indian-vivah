import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput, Button, Chip } from 'react-native-paper'; // Assuming you have a dropdown package
import FieldHelperText from '../../component/FieldHelperText';
import { UserOnBoard } from '../../services/endpoint';
import useSWR from 'swr';

const Step3 = () => {
    const router = useRouter();

    const hobbies = [
        { id: 1, name: 'Reading' },
        { id: 2, name: 'Writing' },
        { id: 3, name: 'Singing' },
        { id: 4, name: 'Dancing' },
        { id: 5, name: 'Cooking' },
        { id: 6, name: 'Travelling' },
    ];

    const interests = [
        { id: 1, name: 'Technology' },
        { id: 2, name: 'Music' },
        { id: 3, name: 'Movies' },
        { id: 4, name: 'Sports' },
        { id: 5, name: 'Books' },
        { id: 6, name: 'Fashion' },
        { id: 7, name: 'Fitness' },

    ];

    const familyTypeArray = [
        { label: 'Joint', value: 'JOINT' },
        { label: 'Nuclear', value: 'NUCLEAR' },
        { label: 'Other', value: 'OTHER' },
    ];

    const contactShowArray = [
        { label: 'All', value: 'ALL' },
        { label: 'No One', value: 'NO_ONE' },
        { label: 'Show Where I Express Interest', value: 'SHOW_I_EXPRESS_INTEREST' },
    ];

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

    const disabilityArray = [
        { label: 'None', value: 'NONE' },
        { label: 'Physical', value: 'PHYSICAL' },
        { label: 'Visual', value: 'VISUAL' },
        { label: 'Hearing', value: 'HEARING' },
        { label: 'Other', value: 'OTHER' },
    ];

    const employedInSectorArray = [
        { label: 'Private', value: 'PRIVATE' },
        { label: 'Government', value: 'GOVERNMENT' },
        { label: 'Self', value: 'SELF' },
        { label: 'Other', value: 'OTHER' },
    ];

    const manglikStatusArray = [
        { label: 'Manglik', value: 'MANGLIK' },
        { label: 'Non-Manglik', value: 'NON_MANGLIK' },
        { label: 'Do not know', value: 'DONOT_KNOW' },
        { label: 'Anshik Manglik', value: 'ANSHIK_MANGLIK' },
    ];

    const [formData, setFormData] = useState({
        hobbies: [],
        interests: [],
        manglikStatus: '',
        motherTongue: '',
        disability: '',
        employedInSector: '',
        rashi: '',
        nakshatra: '',
        drinkingHabits: '',
        smoking: '',
        familyType: '',
        contactShow: '',
        haveChildren: '',
        motherOccupation: '',
        fatherOccupation: '',
        brothers: '',
        sisters: '',
    });

  const {data:formFetchedData, isLoading} = useSWR('getOnboardData');

  console.log('formFetchedData*****', formFetchedData.familyDetails);
    useEffect(() => {
        if(formFetchedData){
            console.log('formFetchedData*****', formFetchedData.familyDetails);
           
            setFormData((prev) => ({
                ...prev,
                hobbies: formFetchedData.hobbies,
                interests: formFetchedData.interests,
                manglikStatus: formFetchedData.manglikStatus,
                motherTongue: formFetchedData.motherTongue,
                disability: formFetchedData.disability,
                employedInSector: formFetchedData.employedInSector,
                rashi: formFetchedData.rashi,
                nakshatra: formFetchedData.nakshatra,
                drinkingHabits: formFetchedData.drinkingHabits,
                smoking: formFetchedData.smoking,
                familyType: formFetchedData.familyType,
                contactShow: formFetchedData.contactShow,
                motherOccupation: formFetchedData.familyDetails?.motherOccupation,
                fatherOccupation: formFetchedData.familyDetails?.fatherOccupation,
                brothers: JSON.stringify(formFetchedData.familyDetails?.siblings[0]?.count),
                sisters: JSON.stringify(formFetchedData.familyDetails?.siblings[1]?.count),
            }));

        }
    }, [formFetchedData]);

    const [openManglikStatus, setOpenManglikStatus] = useState(false);
    const [openDrinkingHabits, setOpenDrinkingHabits] = useState(false);
    const [openDisability, setOpenDisability] = useState(false);

    const [openFamilyType, setOpenFamilyType] = useState(false);
    const [openContactShow, setOpenContactShow] = useState(false);
    const [openSmoking, setOpenSmoking] = useState(false);
    const [openEmployedInSector, setOpenEmployedInSector] = useState(false);
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({});


    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: '' }));
    };

    console.log('formData', formData);

    const handleChipSelection = (field, value) => {
        if (formData[field].includes(value)) {
            setFormData((prev) => ({
                ...prev,
                [field]: prev[field].filter((item) => item !== value),
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [field]: [...prev[field], value],
            }));
        }
    };

    const handleContinue = async () => {

        if(validateFields(formData)){

        try{

            let socialHandles = [];

            // if(formData.instagramUrl){
            //     socialHandles.push(instagramUrl);
            // }

            // if(formData.facebookUrl){
            //     socialHandles.push(facebookUrl);
            // }

            // if(formData.linkedInUrl){
            //     socialHandles.push(linkedInUrl);
            // }

            // if(formData.twitterUrl){
            //     socialHandles.push(twitterUrl);
            // }


            setLoading(true);
            const payload = {
                hobbies: formData.hobbies,
                interests: formData.interests,
                manglikStatus: formData.manglikStatus,
                motherTongue: formData.motherTongue,
                disability: formData.disability,
                employedInSector: formData.employedInSector,
                rashi: formData.rashi,
                nakshatra: formData.nakshatra,
                drinkingHabits: formData.drinkingHabits,
                smoking: formData.smoking,
                familyType: formData.familyType,
                contactShow: formData.contactShow,
                // motherOccupation: formData.motherOccupation,
                // fatherOccupation: formData.fatherOccupation,
                // brothers: formData.brothers,
                // sisters: formData.sisters,
                // socialHandles: socialHandles,
                familyDetails: {
                    motherOccupation: formData.motherOccupation,
                    fatherOccupation: formData.fatherOccupation,
                    'siblings': [
                        {
                            'relation': 'BROTHER',
                            'count': formData.brothers
                        },
                        {
                            'relation': 'SISTER',
                            'count': formData.sisters
                        }
                    ]
                }



            };
    

            const response = await UserOnBoard(payload);
            router.replace('userDetails/step5');
            setLoading(false);

        }catch(e){
            setLoading(false);
            console.log(e);
        }

    }
        
    };

    const validateFields = (formData) => {
        const errors = {};
    
        // Validate required fields
        if (!formData.hobbies.length) {
            errors.hobbies = 'Please select at least one hobby.';
        }
    
        if (!formData.interests.length) {
            errors.interests = 'Please select at least one interest.';
        }

        if(!formData.rashi){
            errors.rashi = 'Rashi is required.';
        }
    
        if (!formData.manglikStatus) {
            errors.manglikStatus = 'Manglik status is required.';
        }
    
        if (!formData.motherTongue) {
            errors.motherTongue = 'Mother tongue is required.';
        }
    
        if (!formData.disability) {
            errors.disability = 'Disability status is required.';
        }
    
        if (!formData.employedInSector) {
            errors.employedInSector = 'Employment sector is required.';
        }
    
        if (!formData.drinkingHabits) {
            errors.drinkingHabits = 'Drinking habits are required.';
        }
    
        if (!formData.smoking) {
            errors.smoking = 'Smoking habits are required.';
        }
    
        if (!formData.familyType) {
            errors.familyType = 'Family type is required.';
        }
    
        if (!formData.contactShow) {
            errors.contactShow = 'Contact show preference is required.';
        }
    
        if (!formData.motherOccupation) {
            errors.motherOccupation = 'Mother\'s occupation is required.';
        }
    
        if (!formData.fatherOccupation) {
            errors.fatherOccupation = 'Father\'s occupation is required.';
        }

        if (!formData.brothers) {
            errors.brothers = 'Number of brothers is required.';
        }

        if (!formData.sisters) {
            errors.sisters = 'Number of sisters is required.';
        }
        
    
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    console.log('errors', errors);
    
    

    return (
        <ScrollView style={styles.container}>
        <Text style={styles.headerText}>Tell us about yourself</Text>
        <View style={styles.formContainer}>
            <Text style={styles.subHeader2}>Choose Hobbies</Text>
            <View style={styles.chipContainer}>
                {hobbies.map((hobby) => (
                    <Chip
                        key={hobby.id}
                        mode="outlined"
                        selected={formData.hobbies.includes(hobby.name)}
                        onPress={() => {
                            setErrors((prev) => ({ ...prev, hobbies: '' }));
                            handleChipSelection('hobbies', hobby.name);
                        }}
                    >
                        {hobby.name}
                    </Chip>
                ))}
                <FieldHelperText error={errors.hobbies} />
            </View>
    
            <Text style={styles.subHeader2}>Choose Interests</Text>
            <View style={styles.chipContainer}>
                {interests.map((interest) => (
                    <Chip
                        key={interest.id}
                        mode="outlined"
                        selected={formData.interests.includes(interest.name)}
                        onPress={() => {
                            setErrors((prev) => ({ ...prev, interests: '' }));
                            handleChipSelection('interests', interest.name);
                        }}
                    >
                        {interest.name}
                    </Chip>
                ))}
                <FieldHelperText error={errors.interests} />
            </View>
    
            {/* Dropdowns */}
            <Text style={styles.subHeader}>Manglik Status</Text>
            <View style={[styles.input, { zIndex: openManglikStatus ? 2000 : 1 }]}>
            <DropDownPicker
                open={openManglikStatus}
                value={formData.manglikStatus}
                items={manglikStatusArray}
                setOpen={setOpenManglikStatus}
                setValue={(callback) => {
                    const value = typeof callback === 'function' ? callback(formData.bloodGroup) : callback;
                    handleInputChange('manglikStatus', value);
                }}
                placeholder="Select Manglik Status"
                style={{ backgroundColor: '#fff3f4' }}
            />
            <FieldHelperText error={errors.manglikStatus} />
        </View>
    
            <Text style={styles.subHeader}>Rashi</Text>
            <TextInput
                label="Rashi"
                value={formData.rashi}
                onChangeText={(value) => handleInputChange('rashi', value)}
                mode="outlined"
                style={styles.input}
            />
            <FieldHelperText error={errors.rashi} />
    
            <Text style={styles.subHeader}>Nakshatra</Text>
            <TextInput
                label="Nakshatra"
                value={formData.nakshatra}
                onChangeText={(value) => handleInputChange('nakshatra', value)}
                mode="outlined"
                style={styles.input}
            />
    
            <Text style={styles.subHeader}>Mother Tongue</Text>
            <TextInput
                label="Mother Tongue"
                value={formData.motherTongue}
                onChangeText={(value) => handleInputChange('motherTongue', value)}
                mode="outlined"
                style={styles.input}
            />
            <FieldHelperText error={errors.motherTongue} />
    
            <Text style={styles.subHeader}>Brothers</Text>
            <TextInput
                label="Number of Brothers"
                value={formData.brothers}
                onChangeText={(value) => handleInputChange('brothers', value)}
                keyboardType="numeric"
                mode="outlined"
                style={styles.input}
            />
            <FieldHelperText error={errors.brothers} />
    
            <Text style={styles.subHeader}>Sisters</Text>
            <TextInput
                label="Number of Sisters"
                value={formData.sisters}
                onChangeText={(value) => handleInputChange('sisters', value)}
                keyboardType="numeric"
                mode="outlined"
                style={styles.input}
            />
            <FieldHelperText error={errors.sisters} />
    
            <Text style={styles.subHeader}>Father's Occupation</Text>
            <TextInput
                label="Father's Occupation"
                value={formData.fatherOccupation}
                onChangeText={(value) => handleInputChange('fatherOccupation', value)}
                mode="outlined"
                style={styles.input}
            />
            <FieldHelperText error={errors.fatherOccupation} />
    
            <Text style={styles.subHeader}>Mother's Occupation</Text>
            <TextInput
                label="Mother's Occupation"
                value={formData.motherOccupation}
                onChangeText={(value) => handleInputChange('motherOccupation', value)}
                mode="outlined"
                style={styles.input}
            />
            <FieldHelperText error={errors.motherOccupation} />
    
            <Text style={styles.subHeader}>Select Employed In Sector</Text>
            <View style={[
                styles.input, { zIndex: openEmployedInSector ? 2000 : 1 },
            ]}>
                <DropDownPicker
                    open={openEmployedInSector}
                    value={formData.employedInSector}
                    items={employedInSectorArray}
                    setOpen={setOpenEmployedInSector}
                    style={{
                        zIndex: 9999, // Increase zIndex to make sure dropdown is visible above other elements
                        backgroundColor: '#fff3f4',
                        position: 'relative',
                    }}



                    setValue={(callback) => {
                        const value = typeof callback === 'function' ? callback(formData.bloodGroup) : callback;
                        handleInputChange('employedInSector', value);
                        console.log('employedInSector', value);
                    }}
                    placeholder="Select Smoking Habits"
                    direction=""
                />
                <FieldHelperText error={errors.employedInSector} />
            </View>
    
            <Text style={styles.subHeader}>Disability</Text>
            <View style={[styles.input,
                { zIndex: openDisability ? 2000 : 1 },
            ]}>
                <DropDownPicker
                    open={openDisability}
                    value={formData.disability}
                    items={disabilityArray}
                    setOpen={setOpenDisability}
                    style={{
                        zIndex: 9999, // Increased zIndex
                        backgroundColor: '#fff3f4',
                        position: 'relative',
                    }}
                    setValue={(callback) => {
                        const value = typeof callback === 'function' ? callback(formData.bloodGroup) : callback;
                        handleInputChange('disability', value);
                        console.log('drinkingHabits', value);
                    }}
                    placeholder="Select Disability"
                    direction="BOTTOM"
                />
                <FieldHelperText error={errors.disability} />
            </View>
    
            <Text style={styles.subHeader}>Drinking Habits</Text>
            <View style={[styles.input,
                { zIndex: openDrinkingHabits ? 2000 : 1 },
            ]}>
                <DropDownPicker
                    open={openDrinkingHabits}
                    value={formData.drinkingHabits}
                    items={drinkingHabitsArray}
                    setOpen={setOpenDrinkingHabits}
                    style={{
                        zIndex: 9999, // Increased zIndex
                        backgroundColor: '#fff3f4',
                        position: 'relative',
                    }}
                    setValue={(callback) => {
                        const value = typeof callback === 'function' ? callback(formData.bloodGroup) : callback;
                        handleInputChange('drinkingHabits', value);
                        console.log('drinkingHabits', value);
                    }}
                    placeholder="Select Drinking Habits"
                    direction="BOTTOM"
                />
                <FieldHelperText error={errors.drinkingHabits} />
            </View>
    
            <Text style={styles.subHeader}>Family Type</Text>
            <View style={[styles.input,
                { zIndex: openFamilyType ? 2000 : 1 },
            ]}>
                <DropDownPicker
                    open={openFamilyType}
                    value={formData.familyType}
                    items={familyTypeArray}
                    setOpen={setOpenFamilyType}
                    style={{
                        zIndex: 9999, // Increased zIndex
                        backgroundColor: '#fff3f4',
                        position: 'relative',
                    }}
                    setValue={(callback) => {
                        const value = typeof callback === 'function' ? callback(formData.bloodGroup) : callback;
                        handleInputChange('familyType', value);
                        console.log('familyType', value);
                    }}
                    placeholder="Select Family Type"
                    direction=""
                />
                <FieldHelperText error={errors.familyType} />
            </View>
    
            <Text style={styles.subHeader}>Smoking Habits</Text>
            <View style={[styles.input,
                { zIndex: openSmoking ? 2000 : 1 },
            ]}>
                <DropDownPicker
                    open={openSmoking}
                    value={formData.smoking}
                    items={smokingArray}
                    setOpen={setOpenSmoking}
                    style={{
                        zIndex: 9999, // Increased zIndex
                        backgroundColor: '#fff3f4',
                        position: 'relative',
                    }}
                    setValue={(callback) => {
                        const value = typeof callback === 'function' ? callback(formData.bloodGroup) : callback;
                        handleInputChange('smoking', value);
                        console.log('smoking', value);
                    }}
                    placeholder="Select Smoking Habits"
                    direction=""
                />
                <FieldHelperText error={errors.smoking} />
            </View>

            <Text style={styles.subHeader}>Contact Show</Text>
                <View style={[styles.input,
                    { zIndex: openContactShow ? 2000 : 1 },
                ]}>
                    <DropDownPicker
                        open={openContactShow}
                        value={formData.contactShow}
                        items={contactShowArray}
                        setOpen={setOpenContactShow}
                        style={{
                            zIndex: 1,
                            backgroundColor: '#fff3f4',
                        }}
                        setValue={(callback) => {
                            const value = typeof callback === 'function' ? callback(formData.bloodGroup) : callback;
                            handleInputChange('contactShow', value);
                            console.log('contactShow', value);
                        }}
                        placeholder="Select Contact Show"
                        direction=""
                    />

                    <FieldHelperText error={errors.contactShow} />
                </View>

                {/* Additional Fields */}


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
    subHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        // marginTop: 20,
        marginTop: 15,
    },
    subHeader2: {
        fontSize: 16,
        fontWeight: 'bold',
        // marginTop: 20,
        marginBottom: 15,
    },
    input: {
        marginTop: 10,
        backgroundColor: '#fff3f4',
    },
    formContainer: {
        width: '100%',
        marginBottom: 50,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 15,
    },
    button: {
        marginTop: 30,
    },
});

export default Step3;
