import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { UserOnBoard, UserOnBoardFormData } from '../../services/endpoint';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Step5 = () => {
  const [images, setImages] = useState([]);
  
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    // Ask for media library permissions
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access gallery is required!');
      return;
    }

    // Open the image picker with multiple selection enabled
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Allow multiple images to be selected
      quality: 1,
    });

    if (!result.canceled) {
      // Only add the selected images to the state if the number is <= 5
      if (images.length + result.assets.length <= 5) {
        setImages([...images, ...result.assets.map(asset => asset.uri)]);
      } else {
        alert('You can upload up to 5 images only!');
      }
    }
  };

  const handleContinue = async () => {

    try {
      setLoading(true);
      console.log('Uploading Images:', images);
      const formData = new FormData();
      formData.append('avatar', {
        uri: images[0],
        type: 'image/jpeg',
        name: 'profile.jpg', // Adjust the name according to your image name
      });

      images.forEach((image, index) => {
        formData.append(`fivePics`, {
          uri: image,
          type: 'image/jpeg',
          name: `image_${index + 1}.jpg`, // Adjust the name according to your image name
        });
      });

      formData.append('isOnboardingDone', true);

      const response = await UserOnBoardFormData(formData);

      await AsyncStorage.setItem('userdetails', JSON.stringify(response.data));
      await AsyncStorage.setItem('showOnboarding', 'false');

      console.log('Uploaded Images:', images);

      setLoading(false);
      // Navigate to the next step or perform any action
      router.replace('/');
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Error uploading images!',
      });
      console.log(error);
    }

  };

  const renderImage = ({ item }) => (
    <Image source={{ uri: item }} style={styles.gridImage} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Upload your 5 best photos!</Text>

      {/* Grid to display images */}
      {images.length > 0 ? (
        <FlatList
          data={images}
          renderItem={renderImage}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2} // Display images in 2 columns
          columnWrapperStyle={styles.columnWrapper}
          style={styles.grid}
          key={images.length} // Ensure a fresh render when images change
        />
      ) : (
        <View style={styles.placeholder}>
          <Text>No images uploaded yet!</Text>
        </View>
      )}

      {/* Button to pick images */}
      <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
        <Text style={styles.galleryButtonText}>Choose from Gallery</Text>
      </TouchableOpacity>

      {/* Continue Button */}
      <Button
        mode="contained"
        onPress={handleContinue}
        style={styles.button}
        disabled={images.length === 0 || loading}
        loading={loading}
      >
        Continue
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
    backgroundColor: '#fff3f4',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  placeholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 20,
  },
  grid: {
    marginBottom: 20,
    width: '100%',
  },
  gridImage: {
    width: '48%', // Adjust image size to fit 2 images per row
    height: 150,
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  galleryButton: {
    backgroundColor:'#ff4f4f',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  galleryButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor:'#ff4f4f',
    width: '100%',
    marginBottom: 20,
  },
});

export default Step5;
