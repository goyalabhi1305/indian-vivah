import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Button, Card, Avatar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import useSWR, { mutate } from 'swr';
import { GetProfileDetailUser } from '../services/endpoint';
import images from '../constants/images';

import { UserOnBoardFormData } from '../services/endpoint';


const UserProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const router = useRouter();

  const fetcher = async () => {
    const response = await GetProfileDetailUser()
    return response.data?.data
  }

  const { data, isLoading, error } = useSWR('fetchUserProfileDetails', fetcher)

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
      handleUploadImage(result.assets[0].uri);
    }
  };

  const handleUploadImage = async (uri) => {
    try{

      const formData = new FormData();
      formData.append('avatar', {
        uri: uri,
        type: 'image/jpeg',
        name: 'profile.jpg',
      });

      const response = await UserOnBoardFormData(formData);
      mutate('fetchUserProfileDetails');
      console.log(response);

    }catch(error){
      console.log(error)
    }
  }

  function calculateAge(dobString) {
    const dob = new Date(dobString); // Convert the date string to a Date object
    const today = new Date(); // Get the current date

    let age = today.getFullYear() - dob.getFullYear(); // Calculate the difference in years
    const monthDifference = today.getMonth() - dob.getMonth(); // Check the month difference

    // If the current date is before the birthday this year, subtract one year from the age
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    

    return age;
}

  return (
    <ScrollView style={styles.container}>
      {/* Profile Image and User Info */}
      <TouchableOpacity onPress={handleImagePicker}>
        <View style={styles.profileImageContainer}>
          {data?.avatar ? (
              <Avatar.Image size={100} source={
                {
                    uri:(profileImage || data?.avatar)
                }
            } />
          ) : (
            <Image
              source={images.NoUser}
              style={styles.profileImage}
            />
          )}
        </View>
      </TouchableOpacity>
      <Text variant="titleMedium" style={styles.username}>
        {data?.firstName + " " + data?.lastName}
      </Text>
      <Text variant="bodySmall" style={styles.userId}>
        {data?._id}
      </Text>

      {/* About Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium"
          style={styles.subHeading}
          >About</Text>
          <View style={styles.infoRow}>
            <Text
            style={styles.left}
            >Name:</Text>
            <Text>
              {data?.firstName + " " + data?.lastName}
               </Text>
          </View>
          <View style={styles.infoRow}>
            <Text
            
            style={styles.left}>Gender:</Text>
            <Text>
              {
                data?.gender
              }
               </Text>
          </View>
          <View style={styles.infoRow}>
            <Text
            style={styles.left}
            >Date of birth:</Text>
            <Text>
              {
                calculateAge(data?.dob)
              }
               </Text>
          </View>
          <View style={styles.infoRow}>
            <Text
            style={styles.left}
            >Marital status:</Text>
            <Text>
              {
                data?.maritalStatus
              }
               </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Background Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium"
           style={styles.subHeading}
          >Background</Text>
          <View style={styles.infoRow}>
            <Text
            style={styles.left}
            >Country:</Text>
            <Text> 
              {data?.currentLocation?.country}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text
            style={styles.left}
            >State:</Text>
            <Text> 
              {data?.currentLocation?.state}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text
            style={styles.left}
            >Religion:</Text>
            <Text> 
              {JSON.parse(data?.religion).title}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text
            style={styles.left}
            >Sub caste:</Text>
            <Text>
              {
                JSON.parse(data?.caste).title
              }
               </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Professional Details Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium"
           style={styles.subHeading}
          >Professional Details</Text>
          <View style={styles.infoRow}>
            <Text
            style={styles.left}
            >Education:</Text>
            <Text> 
              {data?.education}
            </Text>
          </View>
         <View style={styles.infoRow}>
            <Text
            style={styles.left}
            >Occupation:</Text>
            <Text> 
              {data?.occupation?.position}
            </Text>
          </View>
  
          <View style={styles.infoRow}>
            <Text
            style={styles.left}
            >Income:</Text>
            <Text> 
              {data?.salary}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text
            style={styles.left}
            >Employment:</Text>
            <Text> 
              {data?.occupation?.company}
            </Text>
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
    backgroundColor: '#fff3f4',
    width: '100%',
  },
  left:{
    fontWeight: 'bold',
  },
  subHeading: {
    marginBottom: 16,
    fontWeight: 'bold',
    fontSize: 18
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  profileImage: {
    width: 100,
    height: 100,
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
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 20,
  },
  userId: {
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#fff',
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
