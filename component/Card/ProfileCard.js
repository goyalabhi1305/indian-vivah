import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Avatar, Button, Card } from 'react-native-paper'
import { useRouter } from 'expo-router'

const ProfileCard = ({item}) => {
    const router = useRouter()
  return (
    <View>
        <TouchableOpacity onPress={() => { 
            router.push('/UserProfile')
        }}
        activeOpacity={0.9}
        >
        <Card style={styles.card}
       
        >
            <Card.Title
                title={item.name}
                subtitle={`Location: ${item.location}, Education: ${item.education}`}
                left={(props) => <Avatar.Text {...props} label={item.name[0]} />}
                right={(props) => (
                    <Text style={styles.heartIcon} {...props}>
                        ❤️
                    </Text>
                )}
            />
            <Card.Content>
                <Text>Age: {item.age}</Text>
                <Text>Weight: {item.weight}</Text>
                <Text>Height: {item.height}</Text>
                <Text>Status: {item.status}</Text>
            </Card.Content>
            <Card.Actions>
                <Button mode="contained" onPress={() => { }}>
                    Send
                </Button>
                <Button mode="outlined" onPress={() => { }}>
                    Ignore
                </Button>
            </Card.Actions>
        </Card>
        </TouchableOpacity>
    </View>
  )
}

export default ProfileCard

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 16,
        marginVertical: 8,
    },
    heartIcon:{
        marginRight: 20,
        fontSize: 20
    }
})