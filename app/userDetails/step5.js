import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

const Step5 = () => {
  const [images, setImages] = useState([]);
  const router = useRouter();

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

  const handleContinue = () => {
    console.log('Uploaded Images:', images);
    // Navigate to the next step or perform any action
    router.push('/');

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
        disabled={images.length === 0}
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
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
    backgroundColor: '#6200ee',
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
    width: '100%',
    backgroundColor: '#6200ee',
    marginBottom: 20,
  },
});

export default Step5;
