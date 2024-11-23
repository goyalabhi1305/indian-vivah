import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Button, Text, TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

const EditProfile = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.title}>Edit</Text>
      <List.Section>
        <TouchableRipple
          onPress={() => router.push('edit/BasicInfo')}
          rippleColor="rgba(0, 0, 0, .32)"
        >
          <View style={styles.listItem}>
            <List.Item
              title="Basic Info"
              right={() => <Button>Edit</Button>}
            />
          </View>
        </TouchableRipple>

        <TouchableRipple
          onPress={() => router.push('edit/WeightHeight')}
          rippleColor="rgba(0, 0, 0, .32)"
        >
          <View style={styles.listItem}>
            <List.Item
              title="Add Weight, Height"
              right={() => <Button>Edit</Button>}
            />
          </View>
        </TouchableRipple>

        <TouchableRipple
          onPress={() => router.push('edit/Education')}
          rippleColor="rgba(0, 0, 0, .32)"
        >
          <View style={styles.listItem}>
            <List.Item
              title="Add Education"
              right={() => <Button>Edit</Button>}
            />
          </View>
        </TouchableRipple>

        <TouchableRipple
          onPress={() => router.push('edit/FamilyDetails')}
          rippleColor="rgba(0, 0, 0, .32)"
        >
          <View style={styles.listItem}>
            <List.Item
              title="Add Family Details"
              right={() => <Button>Edit</Button>}
            />
          </View>
        </TouchableRipple>

        <TouchableRipple
          onPress={() => router.push('edit/ContactDetails')}
          rippleColor="rgba(0, 0, 0, .32)"
        >
          <View style={styles.listItem}>
            <List.Item
              title="Add Contact Details"
              right={() => <Button>Edit</Button>}
            />
          </View>
        </TouchableRipple>

        <TouchableRipple
          onPress={() => router.push('edit/Preferences')}
          rippleColor="rgba(0, 0, 0, .32)"
        >
          <View style={styles.listItem}>
            <List.Item
              title="Preferences"
              right={() => <Button>Edit</Button>}
            />
          </View>
        </TouchableRipple>
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  listItem: {
    // backgroundColor: '#fff', // Optional: Add background to match List.Item style
  },
});

export default EditProfile;
