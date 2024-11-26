import { SplashScreen, Stack, useRouter } from 'expo-router';
import GlobalProvider from '../context/GlobalProvider';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-paper';
import ToastManager from 'toastify-react-native';
import Toast from 'react-native-toast-message';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const router = useRouter();


  useEffect(() => {

    const fetchData = async () => {

      const user = await AsyncStorage.getItem("userdetails");
      const showOnboarding = await AsyncStorage.getItem("showOnboarding");
      console.log("showOnboarding",showOnboarding);
      if (user) {
        if (!showOnboarding) {
          router.replace('/');
        } else {
          router.replace('userDetails/step1');
        }
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
      <ToastManager/>
      <Toast />
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

        <Stack.Screen name="search/QucikSearch" 
        
        options={{
          headerTitle: 'Quick Search',
          headerShown: true,
        }}

        />

        <Stack.Screen name="search/AdvanceSearch"
          options={{
            headerTitle: 'Advanced Search',
            headerShown: true,
          }}
        />

        <Stack.Screen name="edit/EditProfile" 
        options={{
          headerTitle: 'Edit Profile',
          headerShown: true,
        }}
        />

        <Stack.Screen name="edit/BasicInfo"
          options={{
            headerTitle: 'Basic Info',
            headerShown: true,
          }}
        />

        <Stack.Screen name="edit/WeightHeight"

          options={{
            headerTitle: 'Weight Height',
            headerShown: true,
          }}  
        />

        <Stack.Screen name="edit/Education"
          options={{
            headerTitle: 'Education',
            headerShown: true,
          }}
        />

        <Stack.Screen name="edit/FamilyDetails"
          options={{
            headerTitle: 'Family Details',
            headerShown: true,
          }}
        />

        <Stack.Screen name="edit/ContactDetails"

          options={{
            headerTitle: 'Contact Details',
            headerShown: true,
          }}
        />

        <Stack.Screen name="edit/Preferences"
          options={{
            headerTitle: 'Preferences',
            headerShown: true,
          }} 
        
        
        />

        
      </Stack>

    </GlobalProvider>
  );
}
