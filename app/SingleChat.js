import React, { useEffect, useState, useRef } from 'react';
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	KeyboardAvoidingView,
	SafeAreaView,
	Platform,
	Image,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import { useNavigation, useRouter } from 'expo-router';
import images from '../constants/images';

const HeaderTitle = ({ firstname, lastname, profilephoto, handleRedirectToPortfolio }) => (
	<TouchableOpacity onPress={handleRedirectToPortfolio} style={styles.headerContainer}>
		{profilephoto ? (
			<Image source={{ uri: profilephoto }} style={styles.profilePhoto} />
		) : (
			<Image source={images.NoUser} style={styles.profilePhoto} />
		)}
		<Text style={styles.headerText}>
			{firstname ? `${firstname} ${lastname}` : 'Chat'}
		</Text>
	</TouchableOpacity>
);

const SingleChat = () => {
	const navigation = useNavigation();
	const router = useRouter();
	const scrollViewRef = useRef();
	const [messages, setMessages] = useState([
		{
			content: 'Hello! How can I help you today?',
			position: 'left',
			time: new Date().toISOString(),
		},
		{
			content: 'I have a question about my order.',
			position: 'right',
			time: new Date().toISOString(),
		},
	]);
	const [text, setText] = useState('');

	const handleRedirectToPortfolio = () => {
		router.push('/UserProfile');
	};

	useEffect(() => {
		navigation.setOptions({
			headerTitle: () => (
				<HeaderTitle
					firstname="John"
					lastname="Doe"
					profilephoto={null}
					handleRedirectToPortfolio={handleRedirectToPortfolio}
                    
                    headerTintColor='#ffffff'

                    // make the header text white and bold
                    headerTitleStyle={{
                        fontWeight: 'bold',
                        color: '#fff',
                    }}
				/>
			),
		});
	}, []);

	const handleSubmit = () => {
		if (text.trim() === '') return;

		const newMessage = {
			content: text,
			position: 'right',
			time: new Date().toISOString(),
		};

		setMessages((prevMessages) => [...prevMessages, newMessage]);
		setText('');
		scrollViewRef.current.scrollToEnd({ animated: true });
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<KeyboardAvoidingView
					style={styles.container}
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 90}>
					<ScrollView
						ref={scrollViewRef}
						style={styles.containerChat}
						contentContainerStyle={styles.contentContainer}
						onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
					>
						{messages.map((message, index) => {
							const isSent = message.position === 'right';
							const time = new Date(message.time);
							const relativeTime = time.toLocaleTimeString('en-US', {
								hour: 'numeric',
								minute: 'numeric',
								hour12: true,
							});

							return (
								<View
									key={index}
									style={{
										alignItems: isSent ? 'flex-end' : 'flex-start',
										marginVertical: 5,
									}}>
									<View
										style={[
											styles.chatBubble,
											{ backgroundColor: isSent ? '#0171e3' : '#dddada' },
										]}>
										<Text style={{ color: isSent ? 'white' : 'black', fontSize: 15 }}>
											{message.content}
										</Text>
										<Text
											style={{
												color: isSent ? '#ddd' : '#666',
												fontSize: 11,
												textAlign: 'right',
												marginTop: 5,
											}}>
											{relativeTime}
										</Text>
									</View>
								</View>
							);
						})}
					</ScrollView>
					<View style={styles.sendMessageContainer}>
						<TextInput
							placeholder="Type a message"
							mode="outlined"
							style={styles.textInput}
							value={text}
							onChangeText={setText}
							onSubmitEditing={handleSubmit}
						/>
						<IconButton
							icon="send"
							iconColor="#0171e3"
							size={27}
							onPress={handleSubmit}
							style={styles.sendButton}
						/>
					</View>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	containerChat: {
		flex: 1,
		paddingHorizontal: 15,
		backgroundColor: '#f9f9f9',
	},
	contentContainer: {
		flexGrow: 1,
		justifyContent: 'flex-end',
	},
	sendMessageContainer: {
		flexDirection: 'row',
		padding: 10,
		alignItems: 'center',
		backgroundColor: '#ffffff',
		borderTopWidth: 1,
		borderTopColor: '#e0e0e0',
	},
	textInput: {
		flex: 1,
		marginRight: 10,
		backgroundColor: '#f7f7f7',
		borderRadius: 20,
	},
	sendButton: {
		borderRadius: 30,
	},
	chatBubble: {
		maxWidth: '75%',
		padding: 10,
		borderRadius: 10,
	},
	headerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: -20,
	},
	profilePhoto: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 10,
	},
	headerText: {
		fontSize: 18,
        color: '#fff',
		fontWeight: 'bold',
	},
});

export default SingleChat;
