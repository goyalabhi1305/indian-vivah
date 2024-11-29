import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

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

const Tab = createBottomTabNavigator();

export default function MyComponent() {
  const router = useRouter();
  return (

    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ff4f4f',
        tabBarInactiveTintColor: '#000',
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}

          // make z-index low
          style={{ elevation: 0, zIndex: 0 ,
            backgroundColor:'#FFF3F4',
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
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#ff4f4f',
            height: 60
          },

          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push('Notification')}
            >
              <Icon name="bell" size={24} color="#fff" style={{ marginRight: 20 }} />
            </TouchableOpacity>
          ),
          headerTitle: '',
          headerLeft: () => (
            <HeaderLeftComponent />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={MessageScreen}
        options={{
          tabBarLabel: 'Message',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#ff4f4f',
            height: 60
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({ color, size }) => {
            return <Icon name="message" size={size} color={color} />;
          },
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push('Notification')}
            >
              <Icon name="bell" size={24} color="#fff" style={{ marginRight: 20 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#ff4f4f',
            height: 60
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({ color, size }) => {
            return <Icon name="magnify" size={size} color={color} />;
          },

          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push('Notification')}
            >
              <Icon name="bell" size={24} color="#fff" style={{ marginRight: 20 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          tabBarLabel: 'Activity',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#ff4f4f',
            height: 60
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({ color, size }) => {
            return <Icon name="pulse" size={size} color={color} />;
          },
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push('Notification')}
            >
              <Icon name="bell" size={24} color="#fff" style={{ marginRight: 20 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="My Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'My Profile',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#ff4f4f',
            height: 60
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({ color, size }) => {
            return <Icon name="account" size={size} color={color} />;
          },
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push('Notification')}
            >
              <Icon name="bell" size={24} color="#fff" style={{ marginRight: 20 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Premium"
        component={PremiumScreen}
        options={{
          tabBarLabel: 'Premium',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#ff4f4f',
            height: 60
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({ color, size }) => {
            return <Icon name="star" size={size} color={color} />;
          },
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push('Notification')}
            >
              <Icon name="bell" size={24} color="#fff" style={{ marginRight: 20 }} />
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

function MessageScreen() {
  return (
    <View style={styles.container}>
      <MessageComponent />
    </View>
  );
}

function SearchScreen() {
  return (
    <View style={styles.container}>
      <SearchComponent />
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
    // <View style={styles.container}>
    <SelfProfileComponent />
    // </View>
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
