import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button, TextInput } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VerifyOtp = () => {
    const [code, setCode] = React.useState('');
    const { phone } = useLocalSearchParams();
    const router = useRouter();

    console.log(phone);

    const handleChange = (text) => {
        setCode(text);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                We have sent you the OTP on
            </Text>

            <Text style={styles.phone}>
                {phone}
            </Text>

            <TextInput
                label="4 digit code"
                value={code}
                mode="outlined"
                placeholder="Enter Verification Code"
                keyboardType="numeric"
                autoFocus={true}
                onChangeText={(text) => handleChange(text)}
                style={styles.input}
            />

            <Button
                mode="contained"
                style={styles.button}
                onPress={() => {
                    AsyncStorage.setItem('userdetails', JSON.stringify({ phone }));
                    router.replace('/');
                }}
            >
                Verify
            </Button>

        </View>
    );
};

export default VerifyOtp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20, // Adds padding for responsiveness
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    phone: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 55,
        width: '100%',
        marginBottom: 20,
    },
    button: {
        width: '100%',
        alignSelf: 'stretch', // Ensures the button takes the full width available
        marginTop: 20,
    },
});
