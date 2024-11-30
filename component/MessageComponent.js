import React, { useCallback, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import {
  ActivityIndicator,
  Avatar,
  List,
  TouchableRipple,
} from 'react-native-paper';
import { useNavigation, useRouter } from 'expo-router';
import { GetAllConversations } from '../services/endpoint';
import useSWR from 'swr';

const UserAvatar = ({ conversation }) => (
  <View style={{ position: 'relative' }}>
    <Avatar.Image
      size={48}
      style={{ backgroundColor: 'white' }}
      source={{ uri: conversation?.avatar || 'https://via.placeholder.com/150' }}
    />
  </View>
);

const MessageComponent = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [conversations, setConversations] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [isEndReached, setIsEndReached] = React.useState(false);

  const fetcher = async () => {
    const response = await GetAllConversations();
    return response.data?.data;
  };

  const {data} = useSWR('fetchMessages', fetcher)


  const fetchData = useCallback(async (currentPage) => {
    try {
      const response = await GetAllConversations(currentPage);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      const response = await fetchData(1);
      setConversations(response.data);
      // setIsEndReached(response.meta.totalUsers - 1 <= response.data.length);
      setLoading(false);
    };

    fetchInitialData();
  }, [fetchData]);

  useEffect(() => {

    if(data) {
      setConversations(data)
    }

  }, [data])

  if (loading) {
    return (
        <View style={styles.centered}>
            <ActivityIndicator size="large" />
        </View>
    );
}


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {conversations.length === 0 && (
          <View style={styles.noChatsContainer}>
            <Text style={styles.noChatsText}>No chats found 🙃</Text>
          </View>
        )}
        {conversations.map((conversation) => (
          <View key={conversation._id}>
            <TouchableRipple
              onPress={() =>  navigation.push('SingleChat', {
                recevierId: conversation?.userId
            })}
              rippleColor='rgba(0, 0, 0, .32)'
            >
              <List.Item
                title={() => (
                  <View>
                    <Text>{`${conversation?.firstName || ""} ${conversation?.lastName || ""}`.trim() || "Unknown User"}</Text>
                  
                  </View>
                )}
                description={conversation?.lastMessage}
                left={(props) => <UserAvatar conversation={conversation} />}
                right={(props) => {
                  const date = new Date(conversation?.lastMessageTime).toDateString();
                  return (
                    <View style={{ justifyContent: 'center' }}>
                      <Text>{date}</Text>
                    </View>
                  );
                }}
              />
            </TouchableRipple>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff3f4',
    padding: 10,
    paddingBottom: 0,
    paddingTop: 5
  },
  noChatsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noChatsText: {
    fontWeight: '600',
    fontSize: 24,
    letterSpacing: 1,
    color: '#333',
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
},
});

export default MessageComponent;
