import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button, Menu, Provider, Chip } from 'react-native-paper';

const Step3 = () => {
    
    const router = useRouter();

    const hobbies = [
        { id: 1, name: 'Reading' },
        { id: 2, name: 'Writing' },
        { id: 3, name: 'Singing' },
        { id: 4, name: 'Dancing' },
        { id: 5, name: 'Cooking' },
        { id: 6, name: 'Travelling' }
    ];

    const musics = [
        { id: 1, name: 'Pop' },
        { id: 2, name: 'Rock' },
        { id: 3, name: 'Jazz' },
        { id: 4, name: 'Classical' },
        { id: 5, name: 'Hip-Hop' },
        { id: 6, name: 'Metal' }
    ];

    const otherHobbies = [
        { id: 1, name: 'Reading' },
        { id: 2, name: 'Writing' },
        { id: 3, name: 'Singing' },
        { id: 4, name: 'Dancing' },
        { id: 5, name: 'Cooking' },
        { id: 6, name: 'Travelling' }
    ];

    const [formData, setFormData] = useState({
        hobbies: [],
        musics: [],
        otherHobbies: []
    });

    const handleInputChange = (field, value) => {
        if (formData[field].includes(value)) {
            setFormData((prev) => ({
                ...prev,
                [field]: prev[field].filter((hobby) => hobby !== value),
            }));
        }
        else {
            setFormData((prev) => ({
                ...prev,
                [field]: [...prev[field], value],
            }));
        }
    }

    const handleContinue = () => {
        console.log('Form Data Submitted:', formData);
        // Navigate to the next step here
        router.replace('userDetails/step5');
    };

    return (
        <Provider>
            <View style={styles.container}>
                <Text style={styles.headerText}>Tell us about yourself</Text>
                <View style={styles.formContainer}>
                    {/* Education Field */}
                    <Text style={styles.subHeader}>Choose Hobbies</Text>

                    <View style={styles.hobbieContainer}>
                    {
                        hobbies.map((hobby) => (
                            <Chip
                                key={hobby.id}
                                mode="outlined"
                                selected={formData.hobbies.includes(hobby.name)}
                                onPress={() => handleInputChange('hobbies', hobby.name)}
                                // style={styles.input}
                            >
                                {hobby.name}
                            </Chip>
                        ))
                    }
                    </View>

                    {/* music/ */}
                    <Text style={styles.subHeader}>Choose Music</Text>

                    <View style={styles.hobbieContainer}>
                    {
                        musics.map((music) => (
                            <Chip
                                key={music.id}
                                mode="outlined"
                                selected={formData.musics.includes(music.name)}
                                onPress={() => handleInputChange('musics', music.name)}
                                // style={styles.input}
                            >
                                {music.name}
                            </Chip>
                        ))
                    }
                    </View>

                    {/* Other Things Dropdown */}
                    <Text style={styles.subHeader}>Choose Other Hobbies</Text>

                    <View style={styles.hobbieContainer}>
                    {
                        otherHobbies.map((hobby) => (
                            <Chip
                                key={hobby.id}
                                mode="outlined"
                                selected={formData.otherHobbies.includes(hobby.name)}
                                onPress={() => handleInputChange('otherHobbies', hobby.name)}
                                // style={styles.input}
                            >
                                {hobby.name}
                            </Chip>
                        ))
                    }
                    </View>


                    {/* Continue Button */}
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
        </Provider>
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
        alignSelf: 'flex-start',
      },
    formContainer: {
        width: '100%',
    },
    input: {
        width: '100%',
        marginBottom: 15,
    },
    button: {
        marginTop: 30,
        backgroundColor: '#6200ee',
    },
    hobbieContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginTop: 15
    }
});

export default Step3;
