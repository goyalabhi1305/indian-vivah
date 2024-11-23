import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import {
  Avatar,
  List,
  TouchableRipple,
} from 'react-native-paper';
import { useNavigation, useRouter } from 'expo-router';

const UserAvatar = ({ conversation }) => (
  <View style={{ position: 'relative' }}>
    <Avatar.Image
      size={48}
      style={{ backgroundColor: 'white' }}
      source={{ uri: conversation?.another_userdata?.profilephoto || 'https://via.placeholder.com/150' }}
    />
  </View>
);

const MessageComponent = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const conversations = [
    {
      _id: '1',
      another_userdata: { firstname: 'John', lastname: 'Doe', profilephoto: 'https://via.placeholder.com/150' },
      lastmsg_cnt: { content: 'Hello, how can I help you?', timestamp: new Date().toString() },
    },
    {
      _id: '2',
      another_userdata: { firstname: 'Jane', lastname: 'Smith', profilephoto: 'https://via.placeholder.com/150' },
      
      lastmsg_cnt: { content: 'Are you interested in our latest offer?', timestamp: new Date().toString() },
    },
    {
      _id: '3',
      another_userdata: { firstname: 'Alice', lastname: 'Wonderland', profilephoto: 'https://via.placeholder.com/150' },
      lastmsg_cnt: { content: 'I am looking for a new job. Can you help me?', timestamp: new Date().toString() },
    },
    {
      _id: '4',
      another_userdata: { firstname: 'Bob', lastname: 'Builder', profilephoto: 'https://via.placeholder.com/150' },
      lastmsg_cnt: { content: 'Can you fix it?', timestamp: new Date().toString() },
    },
    {
      _id: '5',
      another_userdata: { firstname: 'Charlie', lastname: 'Chaplin', profilephoto: 'https://via.placeholder.com/150' },
      lastmsg_cnt: { content: 'I am looking for a new job. Can you help me?', timestamp: new Date().toString() },
    },
    {
      _id: '6',
      another_userdata: { firstname: 'David', lastname: 'Doe', profilephoto: 'https://via.placeholder.com/150' },
      lastmsg_cnt: { content: 'Hello, how can I help you?', timestamp: new Date().toString() },
    },
    {
      _id: '7',
      another_userdata: { firstname: 'Eve', lastname: 'Smith', profilephoto: 'https://via.placeholder.com/150' },
      lastmsg_cnt: { content: 'Are you interested in our latest offer?', timestamp: new Date().toString() },
    },
    {
      _id: '8',
      another_userdata: { firstname: 'Frank', lastname: 'Wonderland', profilephoto: 'https://via.placeholder.com/150' },
      lastmsg_cnt: { content: 'I am looking for a new job. Can you help me?', timestamp: new Date().toString() },
    },
    {
      _id: '9',
      another_userdata: { firstname: 'George', lastname: 'Builder', profilephoto: 'https://via.placeholder.com/150' },
      lastmsg_cnt: { content: 'Can you fix it?', timestamp: new Date().toString() },
    },
    {
      _id: '10',
      another_userdata: { firstname: 'Helen', lastname: 'Chaplin', profilephoto: 'https://via.placeholder.com/150' },
      lastmsg_cnt: { content: 'I am looking for a new job. Can you help me?', timestamp: new Date().toString() },
    }
  ];

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
              onPress={() => router.push('/SingleChat', { conversationId: conversation._id })}
              rippleColor='rgba(0, 0, 0, .32)'
            >
              <List.Item
                title={() => (
                  <View>
                    <Text>{`${conversation?.another_userdata?.firstname || ""} ${conversation?.another_userdata?.lastname || ""}`.trim() || "Unknown User"}</Text>
                    {conversation?.type === "brand" && (
                      <Text style={{ fontSize: 12, color: 'gray' }}>
                        {conversation?.BrandDetails?.name || "Brand"}
                      </Text>
                    )}
                    {conversation?.type === "campaign" && (
                      <Text style={{ fontSize: 12, color: 'gray' }}>
                        {conversation?.camp_dtl?.title || "Campaign"}
                      </Text>
                    )}
                  </View>
                )}
                description={conversation?.lastmsg_cnt?.content}
                left={(props) => <UserAvatar conversation={conversation} />}
                right={(props) => {
                  const date = new Date(conversation?.lastmsg_cnt?.timestamp).toDateString();
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
    backgroundColor: '#fff',
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
});

export default MessageComponent;
