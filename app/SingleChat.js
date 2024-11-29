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
import { TextInput, IconButton, ActivityIndicator } from 'react-native-paper';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import images from '../constants/images';
import { GetMessages, GetProfileDetailUser, SendMessage } from '../services/endpoint';
import useSWR from 'swr';

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
	const params = useLocalSearchParams();

	const navigation = useNavigation();
	const router = useRouter();
	const scrollViewRef = useRef();
	// {
	// 	content: 'Hello! How can I help you today?',
	// 	position: 'left',
	// 	time: new Date().toISOString(),
	// },
	// {
	// 	content: 'I have a question about my order.',
	// 	position: 'right',
	// 	time: new Date().toISOString(),
	// },
	const [messages, setMessages] = useState([
		
	]);
	const [text, setText] = useState('');
	const [loading, setLoading] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	const [endReached, setEndReached] = useState(false);


	const fetcher2 = async () => {
		const response = await GetProfileDetailUser(params.recevierId)
		return response.data?.data
	  }
	
	  const { data, isLoading, error } = useSWR(
		params.recevierId ? `fetchUserProfileDetails${params.recevierId}` : null,
		fetcher2)

	const handleRedirectToPortfolio = () => {
		router.push('/UserProfile/' + params.recevierId);
	};

	console.log("Data", data);
	useEffect(() => {
		navigation.setOptions({
			headerTitle: () => (
				<HeaderTitle
					firstname={data?.firstName || "Loading..."}
					lastname={data?.lastName || ' '}
					profilephoto={data?.avatar}
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
	}, [data]);

	const handleSubmit = async () => {
		if (text.trim() === '') return;

		const newMessage = {
			message: text,
			receiver: params.recevierId,
			createdAt: new Date().toISOString(),
		};
		setMessages((prevMessages) => [...prevMessages, newMessage]);

		setText('');
		scrollViewRef.current.scrollToEnd({ animated: true });

		const payload = {
			receiverId: params.recevierId,
			message: text,
		}
		await SendMessage(payload);

	};


	const fetcher = async () => {
		try{
			const response = await GetMessages(params.recevierId);
			// setData(response.data);
			setMessages([...response.data.data, ...messages]);
			setLoading(false);
			// setLoadingMore(false);
			// if(messages.length + 15 > response.data.msg_cnt){
			// 	setEndReached(true);
			// }

		}catch(error){
			console.error("Error", error);
		}
	}

	useEffect(() => {
		fetcher();
	}, []);


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

						{loading && (
							<ActivityIndicator
								size='large'
								style={styles.loader}
							/>
						)}

						{messages.map((message, index) => {
							const isSent = message.receiver == params.recevierId;
							const time = new Date(message.createdAt);
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
											{message.message}
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
	loader: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default SingleChat;
