import React, { useState, useRef } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	View,
	StatusBar,
	TouchableOpacity,
	Text,
	Image,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import images from '../../constants/images';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { CreateUser } from '../../services/endpoint';
import Toast from 'react-native-toast-message';

const App = () => {
	const [value, setValue] = useState('');
	const [formattedValue, setFormattedValue] = useState('');
	const [valid, setValid] = useState(false);
	const [showMessage, setShowMessage] = useState(false);
	const router = useRouter();
	const phoneInput = useRef(null);
	const [loading, setLoading] = useState(false);

	const handleCreateUser = async (phone) => {
		try {
			setLoading(true);

			const params = {
				phone: phone,
			};

			const response = await CreateUser(params);

			router.push({
				pathname: '(auth)/VerifyOtp',
				params: { phone: phone },
			});

			setLoading(false);
		} catch (e) {
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: 'Something went wrong',
			});

			setLoading(false);
		}
	};

	return (
		<>
			<StatusBar barStyle='dark-content' />
			<View style={styles.container}>
				<Image
					source={images.AppLogo}
					style={{
						height: 150,
						marginBottom: 100,
						width: 300,
						borderRadius: 20,
					}}
					resizeMode='contain'
				/>

				<PhoneInput
					ref={phoneInput}
					defaultValue={value}
					defaultCode='IN'
					layout='second'
					onChangeText={(text) => {
						setValue(text);
					}}
					style={{
						width: '100%',
						borderRadius: 10,
						fontSize: 30,
						innerHeight: 50,
						borderRadius: 100,
					}}
					containerStyle={{
						borderRadius: 100,
						width: '90%',
						padding: 0,
						fontSize: 20,
						margin: 0,
						marginBottom: 10,
					}}
					onChangeFormattedText={(text) => {
						setFormattedValue(text);
					}}
					withLightTheme
					// withShadow
					autoFocus
				/>

				<View
					style={{
						width: '90%',
					}}
				>
					{showMessage && !valid && (
						<Text
							style={{
								color: 'red',
								marginTop: 0,
								textAlign: 'left',
								display: 'flex',
								justifyContent: 'flex-start',
							}}
						>
							Invalid Phone Number
						</Text>
					)}
				</View>

				<Button
					mode='contained'
					style={{
						marginTop: 20,
						width: '90%',
						marginBottom: 50,
					}}
					size='large'
					fullWidth
					loading={loading}
					disabled={loading}
					setLoading={loading}
					onPress={() => {
						const checkValid = phoneInput.current?.isValidNumber(value);
						if (checkValid) {
							// router.push({
							//     pathname: '(auth)/VerifyOtp',
							//     params: { phone: value },
							// });
							handleCreateUser(value);
						} else {
							setShowMessage(true);
							setValid(checkValid ? checkValid : false);
						}
					}}
				>
					Continue
				</Button>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginTop: 100,
		marginBottom: 70,
	},
	wrapper: {
		marginBottom: 100,
	},
});

export default App;
