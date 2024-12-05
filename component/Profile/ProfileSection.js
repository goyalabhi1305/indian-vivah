import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button, Divider, Chip } from 'react-native-paper';

const ProfileSection = ({ data }) => {
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
    <View style={styles.container}>
      {/* About the user */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.subHeading}>
            About the user
          </Text>
          <Text style={[styles.text, { marginBottom: 16, marginTop: 0}]}>
            {data?.bio}
          </Text>
          <Divider />
          <Text style={[styles.text, { marginTop: 16, marginBottom: 16 }]}>
            {data?.aboutCareer}
          </Text>
        </Card.Content>
      </Card>

      {/* Basic details */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.subHeading}>
            Basic details
          </Text>
          <Text style={styles.text}>Dob: {calculateAge(data?.dob)} </Text>
          <Text style={styles.text}>Marital status: {data?.maritalStatus}</Text>
          <Text style={styles.text}>
            Address:{" "}
            {data?.currentLocation?.city +
              " " +
              data?.currentLocation?.state +
              " " +
              data?.currentLocation?.country}
          </Text>
          <Text style={styles.text}>
            Religion: {JSON.parse(data?.religion)?.title}
          </Text>
          <Text style={styles.text}>Caste: {JSON.parse(data?.caste)?.title}</Text>
          <Text style={styles.text}>Diet: {data?.diet}</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained">Go premium</Button>
        </Card.Actions>
      </Card>

      {/* Contact details */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.subHeading}>
            Contact details
          </Text>
          <Text style={styles.text}>Phone: {data?.phone}</Text>
          <Text style={styles.text}>Email</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained">Go premium</Button>
        </Card.Actions>
      </Card>

      {/* Hobbies */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.subHeading}>
            Hobbies
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 15,
              marginTop: 0,
              marginBottom: 16,
            }}
          >
            {data?.hobbies.map((hobby, index) => (
              <Chip key={index}>{hobby}</Chip>
            ))}

            {data?.interests.map((interest, index) => (
              <Chip key={index}>{interest}</Chip>
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* Carrier and Education */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.subHeading}>
            Carrier and Education
          </Text>
          <Text style={styles.text}>
            Profession: {data?.occupation?.position}
          </Text>
          <Text style={styles.text}>Company names: {data?.organizationName}</Text>
          <Text style={styles.text}>Annual Income: {data?.salary}</Text>
          <Text style={styles.text}>Highest qualification: {data?.education}</Text>
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
    marginTop: 16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  subHeading: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 16,
  },
  text: {
    fontSize: 14, // Base text style
    marginTop:2,
    marginBottom:2
  },
});

export default ProfileSection;
