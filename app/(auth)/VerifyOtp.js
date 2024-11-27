import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button, TextInput } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VerifyOtp } from '../../services/endpoint';
import Toast from 'react-native-toast-message';

const VerifyOtpCode = () => {
    const [code, setCode] = React.useState('');
    const { phone } = useLocalSearchParams();
    const router = useRouter();

    const [loading, setLoading] = React.useState(false);

    console.log(phone);

    const handleChange = (text) => {
        setCode(text);
    };

    const handleVerifyOtp = async (code) => {
        try {
            setLoading(true);
            const response = await VerifyOtp({ phone: phone, otp: code });
            console.log(code);
            await AsyncStorage.setItem('userdetails', JSON.stringify({ phone: phone }));
            await AsyncStorage.setItem('token', response.data.token);
            await AsyncStorage.setItem('showOnboarding', (response.data.showOnboarding || true).toString());

            if (response.data.showOnboarding || true) {
                router.replace('userDetails/step1');
            }else{
                router.replace('/');
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Invalid OTP',
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

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
                    handleVerifyOtp(code);
                }}
                loading={loading}
                disabled={code.length !== 4 || loading}

            >
                Verify
            </Button>

        </View>
    );
};

export default VerifyOtpCode;

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
        backgroundColor:'#ff4f4f'
    },
});
