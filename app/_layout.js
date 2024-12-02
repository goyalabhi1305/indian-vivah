import { SplashScreen, Stack, useRouter } from 'expo-router';
import GlobalProvider from '../context/GlobalProvider';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import { DefaultTheme, Icon, PaperProvider } from 'react-native-paper';
import ToastManager from 'toastify-react-native';
import Toast from 'react-native-toast-message';

SplashScreen.preventAutoHideAsync();

const theme = {
	...DefaultTheme,
	roundness: 10,
	colors: {
		...DefaultTheme.colors,
		primary: '#ff4f4f',
		secondaryContainer: '#f5c6ca',
		// secondaryContainer: '#FFF3F4',
	},
};

export default function RootLayout() {

  const router = useRouter();


  useEffect(() => {

    const fetchData = async () => {

      const user = await AsyncStorage.getItem("userdetails");
      let showOnboarding = await AsyncStorage.getItem("showOnboarding");
      showOnboarding = JSON.parse(showOnboarding || 'true');
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
      	<PaperProvider theme={theme}>
      {/* <ToastManager/> */}
      <Toast />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ff4f4f',
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

        <Stack.Screen name="Message"

          options={{
            headerTitle: 'Chats',
            headerShown: true,
          }}


        />

        <Stack.Screen name="Search"

          options={{
            headerTitle: 'Search',
            headerShown: true,
          }}
          />

        <Stack.Screen name="UserProfile" />

        <Stack.Screen name="UserProfile/[id]"
          options={{
            headerTitle: 'Profile',
            headerShown: true,
          }}
        />


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

        <Stack.Screen name="ProfileVisit"
          options={{
            headerTitle: 'Profile Visit',
            headerShown: true,
          }}
        />

        <Stack.Screen name="ShortListed"
          options={{
            headerTitle: 'Short Listed',
            headerShown: true,
          }}
        />

        
      </Stack>

      </PaperProvider>

    </GlobalProvider>
  );
}
