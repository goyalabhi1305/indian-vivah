import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

const UserProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const router = useRouter();

  // Function to handle image selection
  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access the media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Image and User Info */}
      <TouchableOpacity onPress={handleImagePicker}>
        <View style={styles.profileImageContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholderImage} />
          )}
        </View>
      </TouchableOpacity>
      <Text variant="titleMedium" style={styles.username}>
        Username
      </Text>
      <Text variant="bodySmall" style={styles.userId}>
        User ID
      </Text>

      {/* About Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">About</Text>
          <View style={styles.infoRow}>
            <Text>Name:</Text>
            <Text> </Text>
          </View>
          <View style={styles.infoRow}>
            <Text>Gender:</Text>
            <Text> </Text>
          </View>
          <View style={styles.infoRow}>
            <Text>Date of birth:</Text>
            <Text> </Text>
          </View>
          <View style={styles.infoRow}>
            <Text>Marital status:</Text>
            <Text> </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Background Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Background</Text>
          <View style={styles.infoRow}>
            <Text>Country:</Text>
            <Text> </Text>
          </View>
          <View style={styles.infoRow}>
            <Text>State:</Text>
            <Text> </Text>
          </View>
          <View style={styles.infoRow}>
            <Text>Religion:</Text>
            <Text> </Text>
          </View>
          <View style={styles.infoRow}>
            <Text>Sub caste:</Text>
            <Text> </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Professional Details Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Professional Details</Text>
          <View style={styles.infoRow}>
            <Text>Education:</Text>
            <Text> </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Edit Button */}
      <Button mode="contained" 
        onPress={() => router.push('edit/EditProfile')}
      style={styles.editButton}>
        Edit
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    width: '100%',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  placeholderImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#cccccc',
  },
  username: {
    textAlign: 'center',
    marginTop: 0,
  },
  userId: {
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  editButton: {
    marginTop: 16,
    alignSelf: 'center',
    width: '100%',
    marginBottom: 16,
  },
});

export default UserProfile;
