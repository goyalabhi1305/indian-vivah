import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';

const ProfileSection = () => {
  return (
    <View style={styles.container}>
      {/* About the user */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge">About the user</Text>
        </Card.Content>
        <Card.Actions>
          <Button>View more</Button>
        </Card.Actions>
      </Card>

      {/* Basic details */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge">Basic details</Text>
          <Text>Dob</Text>
          <Text>Marital status</Text>
          <Text>Address</Text>
          <Text>Religion</Text>
          <Text>Caste</Text>
          <Text>Diet Preferences</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained">Go premium</Button>
        </Card.Actions>
      </Card>

      {/* Contact details */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge">Contact details</Text>
          <Text>Phone</Text>
          <Text>Email</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained">Go premium</Button>
        </Card.Actions>
      </Card>

      {/* Hobbies */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge">Hobbies</Text>
        </Card.Content>
      </Card>

      {/* Carrier and Education */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge">Carrier and Education</Text>
          <Text>Profession</Text>
          <Text>Company names</Text>
          <Text>Annual Income</Text>
          <Text>Highest qualification</Text>
          <Text>Education field</Text>
          <Text>College name</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained">Go premium</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    // backgroundColor: '#f5f5f5',
    marginTop: 16,
  },
  card: {
    marginBottom: 16,
  },
});

export default ProfileSection;
