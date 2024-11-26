import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { TextInput, Button, Chip } from 'react-native-paper'; // Assuming you have a dropdown package

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
        { id: 1, name: 'Reading' },
        { id: 2, name: 'Writing' },
        { id: 3, name: 'Singing' },
        { id: 4, name: 'Dancing' },
        { id: 5, name: 'Cooking' },
        { id: 6, name: 'Travelling' },
        { id: 7, name: 'Painting' },
        { id: 8, name: 'Coding' },
        { id: 9, name: 'Gardening' },
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

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

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

    const handleContinue = () => {
        console.log('Form Data Submitted:', formData);
        router.replace('userDetails/step5');
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.headerText}>Tell us about yourself</Text>
            <View style={styles.formContainer}>
                <Text style={styles.subHeader}>Choose Hobbies</Text>
                <View style={styles.chipContainer}>
                    {hobbies.map((hobby) => (
                        <Chip
                            key={hobby.id}
                            mode="outlined"
                            selected={formData.hobbies.includes(hobby.name)}
                            onPress={() => handleChipSelection('hobbies', hobby.name)}
                        >
                            {hobby.name}
                        </Chip>
                    ))}
                </View>

                <Text style={styles.subHeader}>Choose Interests</Text>
                <View style={styles.chipContainer}>
                    {interests.map((interest) => (
                        <Chip
                            key={interest.id}
                            mode="outlined"
                            selected={formData.interests.includes(interest.name)}
                            onPress={() => handleChipSelection('interests', interest.name)}
                        >
                            {interest.name}
                        </Chip>
                    ))}
                </View>

                {/* Dropdowns */}
                <Text style={styles.subHeader}>Manglik Status</Text>
                {/* <Dropdown
                    label="Select Manglik Status"
                    data={manglikStatusArray}
                    value={formData.manglikStatus}
                    onChangeText={(value) => handleInputChange('manglikStatus', value)}
                /> */}

                <Text style={styles.subHeader}>Drinking Habits</Text>
                {/* <Dropdown
                    label="Select Drinking Habits"
                    data={drinkingHabitsArray}
                    value={formData.drinkingHabits}
                    onChangeText={(value) => handleInputChange('drinkingHabits', value)}
                /> */}

                <Text style={styles.subHeader}>Smoking Habits</Text>
                {/* <Dropdown
                    label="Select Smoking Habits"
                    data={smokingArray}
                    value={formData.smoking}
                    onChangeText={(value) => handleInputChange('smoking', value)}
                /> */}

                {/* Additional Fields */}
                <Text style={styles.subHeader}>Mother Tongue</Text>
                <TextInput
                    label="Mother Tongue"
                    value={formData.motherTongue}
                    onChangeText={(value) => handleInputChange('motherTongue', value)}
                    mode="outlined"
                />

                <Text style={styles.subHeader}>Brothers</Text>
                <TextInput
                    label="Number of Brothers"
                    value={formData.brothers}
                    onChangeText={(value) => handleInputChange('brothers', value)}
                    keyboardType="numeric"
                    mode="outlined"
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
        </ScrollView>
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
        marginBottom: 20,
    },
    subHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
    },
    formContainer: {
        width: '100%',
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginTop: 15,
    },
    button: {
        marginTop: 30,
        backgroundColor: '#6200ee',
    },
});

export default Step3;
