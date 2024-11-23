import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button, Menu, Provider } from 'react-native-paper';

const Step3 = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        education: '',
        job: '',
        otherThings: '',
        income: '',
    });

    const [menuVisible, setMenuVisible] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleContinue = () => {
        console.log('Form Data Submitted:', formData);
        // Navigate to the next step here
        router.replace('userDetails/step4');
    };

    return (
        <Provider>
            <View style={styles.container}>
                <Text style={styles.headerText}>Tell us about yourself</Text>
                <View style={styles.formContainer}>
                    {/* Education Field */}
                    <TextInput
                        label="Education"
                        mode="outlined"
                        value={formData.education}
                        onChangeText={(text) => handleInputChange('education', text)}
                        style={styles.input}
                    />

                    {/* Job Field */}
                    <TextInput
                        label="Job"
                        mode="outlined"
                        value={formData.job}
                        onChangeText={(text) => handleInputChange('job', text)}
                        style={styles.input}
                    />

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
                        value={formData.income}
                        onChangeText={(text) => handleInputChange('income', text)}
                        style={styles.input}
                    />

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
    formContainer: {
        width: '100%',
    },
    input: {
        width: '100%',
        marginBottom: 15,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#6200ee',
    },
});

export default Step3;
