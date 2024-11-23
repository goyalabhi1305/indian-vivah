import { SplashScreen, Stack, useRouter } from 'expo-router';
import GlobalProvider from '../context/GlobalProvider';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-paper';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const router = useRouter();


  useEffect(() => {

    const fetchData = async () => {

      const user = await AsyncStorage.getItem("userdetails");
      console.log(user);
      if (user) {
        router.replace('/');
        // router.replace('userDetails/step1');
      } else {
        router.replace('(auth)/SignIn');
      }
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 500);
    }

    fetchData()
  }, []);

  return (
    <GlobalProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#663399',

          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push('Notification')}>
              <Icon source="bell" size={24} color="#fff" style={{ marginRight: 10 }} />
            </TouchableOpacity>
          ),
        }}
      >
        <Stack.Screen name="index"
           options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(auth)/SignIn"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(auth)/VerifyOtp"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="userDetails/step1"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="userDetails/step2"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="userDetails/step3"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="userDetails/step4"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="userDetails/step5"
          options={{ headerShown: false }}
        />

        <Stack.Screen name="Notification" />

        <Stack.Screen name="UserProfile" />

        <Stack.Screen name="SingleChat" />
      </Stack>

    </GlobalProvider>
  );
}
