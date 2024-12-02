// import {
//   KnockProvider,
//   KnockFeedProvider,
//   NotificationFeedContainer,
//   NotificationIconButton,
//   KnockPushNotificationProvider,
//   NotificationFeed,
// } from "@knocklabs/react-native";
// import { useEffect, useRef, useState } from "react";
// import { View } from "react-native";
// import useSWR from "swr";
// import { GetProfileDetailUser } from "../services/endpoint";
// import { Text } from "react-native-paper";


// const Notification = () => {
//   const [isVisible, setIsVisible] = useState(true);
//   const notifButtonRef = useRef(null);
//   const fetcher = async () => {
//     const response = await GetProfileDetailUser()
//     return response.data?.data
// }

// useEffect(() => {
//   const testKnockConnection = async () => {
//     try {
//       const response = await fetch("https://api.knock.app/v1", {
//         headers: {
//           Authorization: `Bearer pk_test_hPs1uxwmB02BZYL0d1oOctXd2BK9llgOwdJOMz1avPE
//           `, // Replace YOUR_API_KEY with your API key
//         },
//       });
//       console.log("Knock API Test:", await response.json());
//     } catch (error) {
//       console.error("Error connecting to Knock API:", error);
//     }
//   };
//   testKnockConnection();
// }, []);

//   const { data, isLoading, error } = useSWR('fetchUserProfileDetails', fetcher)

//   console.log("data",data?._id)

//   if (isLoading) return <Text>Loading...</Text>;

//   return (
//     <View>
//         <KnockProvider apiKey="pk_test_hPs1uxwmB02BZYL0d1oOctXd2BK9llgOwdJOMz1avPE" userId={data._id}>
//       {/* Optionally, use the KnockFeedProvider to connect an in-app feed */}
//       <KnockFeedProvider feedId="0884c7d7-3668-4be4-80b1-b4019726d0de">
//       <NotificationFeed>

//       </NotificationFeed>
//         <NotificationFeedContainer>
//           <Text>Notifications go in here!</Text>
//         </NotificationFeedContainer>
//       </KnockFeedProvider>
//     </KnockProvider>
//     </View>
//   )
// }

// export default Notification


// import {
//   KnockProvider,
//   KnockFeedProvider,
//   useKnockFeed,
// } from "@knocklabs/expo";
// import { GetProfileDetailUser } from "../services/endpoint";

// const App = ({ authenticatedUser }) => (
//   <KnockProvider
//     apiKey="pk_test_hPs1uxwmB02BZYL0d1oOctXd2BK9llgOwdJOMz1avPE"
//     userId={
//       authenticatedUser.id
//     }
//   >
//     <KnockFeedProvider feedId="0884c7d7-3668-4be4-80b1-b4019726d0de">
//       <MyFeedComponent />
//     </KnockFeedProvider>
//   </KnockProvider>
// );



import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import {
  KnockProvider,
  KnockFeedProvider,
  useKnockFeed,
  NotificationFeedCell,
  NotificationFeedContainer,
  KnockExpoPushNotificationProvider,
  NotificationIconButton,
  useExpoPushNotifications,
} from "@knocklabs/expo";
import useSWR from 'swr';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator } from 'react-native-paper';


const Notification = () => {

  const [isNotificationFeedOpen, setIsNotificationFeedOpen] = useState(false);
  const onTopActionButtonTap = useCallback(() => {
    setIsNotificationFeedOpen(!isNotificationFeedOpen);
  }, [isNotificationFeedOpen]);

  const [loading, setLoading] = useState(true);

  const fetcher = async () => {
    const response = await GetProfileDetailUser()
    return response.data?.data
  }

  const { data, isLoading, error } = useSWR('fetchUserProfileDetails', fetcher);



  if (isLoading) {
    return <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <ActivityIndicator size="large" />
    </View>
  }

  return (
    <KnockProvider
      apiKey="pk_test_hPs1uxwmB02BZYL0d1oOctXd2BK9llgOwdJOMz1avPE"
      // host="expo"
      userId={
        data?._id
      }
      logLevel="debug"
    >
      {/* <KnockExpoPushNotificationProvider
        knockExpoChannelId="f565093a-f5ff-4d54-a048-d5419c7b0fbc"
      >
         */}
      <KnockFeedProvider
        feedId="0884c7d7-3668-4be4-80b1-b4019726d0de"
      >
        <MyFeedComponent />
      </KnockFeedProvider>
      {/* </KnockExpoPushNotificationProvider> */}
    </KnockProvider>
  )
}


const MyFeedComponent = () => {
  const { useFeedStore, feedClient } = useKnockFeed();
  const { items, metadata } = useFeedStore();


  // Fetch the feed
  // useEffect(() => feedClient.fetch(), [feedClient]);

  useEffect(() => {
    feedClient.fetch();

    // return () => {
    //   feedClient.unsubscribe();
    // };

  }, [feedClient]);

  return (
    <>
      {
        metadata?.__typename === "FeedMetadata" ? <ScrollView>
          {items.map((item) => (
            <NotificationFeedCell key={item.id} item={item} />
          ))}

          {
            items.length === 0 && (
              <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text>No notifications found 🙃</Text>
              </View>
            )
          }
        </ScrollView> : <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <ActivityIndicator size="large" />
        </View>
      }

    </>
  );
};

export default Notification

const styles = StyleSheet.create({})