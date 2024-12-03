import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeComponent from '../component/HomeComponent';
import MessageComponent from '../component/MessageComponent';
import SearchComponent from '../component/SearchComponent';
import { useRouter } from 'expo-router';
import PremiumMembership from '../component/PremiumComponent';
import ActivityComponent from '../component/ActivityComponent';
import SelfProfileComponent from '../component/SelfProfileComponent';
import HeaderLeftComponent from '../component/HeaderLeftComponent';
import {
	IconCards,
	IconCardsFilled,
	IconClock,
	IconClockFilled,
	IconCrown,
	IconUser,
	IconUserCircle,
	IconUserCircleFilled,
	IconUserFilled,
} from '@tabler/icons-react-native';

const Tab = createBottomTabNavigator();

export default function MyComponent() {
	const router = useRouter();
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: true,
				tabBarActiveTintColor: '#ff4f4f',
				tabBarInactiveTintColor: '#000',
				headerTitle: '',
				zIndex: -1, // Reduced z-index for tabs
			}}
			tabBar={({ navigation, state, descriptors, insets }) => (
				<BottomNavigation.Bar
					navigationState={state}
					safeAreaInsets={insets}
					style={{
						elevation: 10,
						zIndex: 1, // Make sure the tab bar is below the menu (lower z-index)
						borderWidth: 0.5,
						borderColor: '#ddd',
						borderStyle: 'solid',
						borderRadius: 20,
						overflow: 'hidden',
						backgroundColor: '#FFF3F4',
					}}
					onTabPress={({ route, preventDefault }) => {
						const event = navigation.emit({
							type: 'tabPress',
							target: route.key,
							canPreventDefault: true,
						});

						if (event.defaultPrevented) {
							preventDefault();
						} else {
							navigation.dispatch({
								...CommonActions.navigate(route.name, route.params),
								target: state.key,
							});
						}
					}}
					renderIcon={({ route, focused, color }) => {
						const { options } = descriptors[route.key];
						if (options.tabBarIcon) {
							return options.tabBarIcon({ focused, color, size: 24 });
						}

						return null;
					}}
					getLabelText={({ route }) => {
						const { options } = descriptors[route.key];
						const label =
							options.tabBarLabel !== undefined
								? options.tabBarLabel
								: options.title !== undefined
								? options.title
								: route.title;

						return label;
					}}
				/>
			)}
		>
			<Tab.Screen
				name='Matches'
				component={HomeScreen}
				options={{
					tabBarLabel: 'Matches',
					headerShown: true,
					headerStyle: {
						backgroundColor: '#FFF3F4',
						height: 120,
					},
					tabBarIcon: ({ color, size, focused }) => {
						if (focused) {
							return <IconCardsFilled color={color} />;
						} else return <IconCards color={color} />;
					},
					headerRight: () => (
						<View style={{ flexDirection: 'row' }}>
							<TouchableOpacity
								activeOpacity={0.7}
								onPress={() => router.push('Search')}
							>
								<Icon name='magnify' size={24} style={{ marginRight: 20 }} />
							</TouchableOpacity>
							<TouchableOpacity
								activeOpacity={0.7}
								onPress={() => router.push('Message')}
							>
								<Icon name='chat' size={24} style={{ marginRight: 20 }} />
							</TouchableOpacity>

							<TouchableOpacity
								activeOpacity={0.7}
								onPress={() => router.push('Notification')}
							>
								<Icon name='bell' size={24} style={{ marginRight: 20 }} />
							</TouchableOpacity>
						</View>
					),
					headerTitle: '',
					headerLeft: () => <HeaderLeftComponent />,
				}}
			/>
			<Tab.Screen
				name='Activity'
				component={ActivityScreen}
				options={{
					tabBarLabel: 'Activity',
					headerShown: true,
					headerStyle: {
						height: 120,
						backgroundColor: '#FFF3F4',
					},
					tabBarIcon: ({ color, size, focused }) => {
						if (focused) {
							return <IconClockFilled color={color} />;
						}
						return <IconClock color={color} />;
					},
					headerTitle: 'Activity',
					headerRight: () => (
						<TouchableOpacity
							activeOpacity={0.7}
							onPress={() => router.push('Notification')}
						>
							<Icon
								name='bell'
								size={24}
								style={{ marginRight: 20 }}
							/>
						</TouchableOpacity>
					),
				}}
			/>
			<Tab.Screen
				name='My Profile'
				component={ProfileScreen}
				options={{
					tabBarLabel: 'My Profile',
					headerShown: true,
					headerStyle: {
						backgroundColor: '#FFF3F4',
						height: 120,
					},
					tabBarIcon: ({ color, size, focused }) => {
						if (focused) {
							return <IconUserCircle color={color} />;
						}
						return <IconUserCircle color={color} />;
					},
					headerTitle: 'My Profile',
					headerRight: () => (
						<TouchableOpacity
							activeOpacity={0.7}
							onPress={() => router.push('Notification')}
						>
							<Icon name='bell' size={24} style={{ marginRight: 20 }} />
						</TouchableOpacity>
					),
				}}
			/>
			<Tab.Screen
				name='Premium'
				component={PremiumScreen}
				options={{
					tabBarLabel: 'Premium',
					headerShown: true,
					headerStyle: {
						backgroundColor: '#FFF3F4',
						height: 120,
					},
					headerTitle: 'Premium',
					tabBarIcon: ({ color, size }) => {
						return <IconCrown size={size} color={color} />;
					},
					headerRight: () => (
						<TouchableOpacity
							activeOpacity={0.7}
							onPress={() => router.push('Notification')}
						>
							<Icon name='bell' size={24} style={{ marginRight: 20 }} />
						</TouchableOpacity>
					),
				}}
			/>
		</Tab.Navigator>
	);
}

function HomeScreen() {
	return (
		<View style={styles.container}>
			<HomeComponent />
		</View>
	);
}

function ActivityScreen() {
	return (
		<View style={styles.container}>
			<ActivityComponent />
		</View>
	);
}

function ProfileScreen() {
	return (
		<SelfProfileComponent />
	);
}

function PremiumScreen() {
	return (
		<View style={styles.container}>
			<PremiumMembership />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFF3F4',
	},
});
