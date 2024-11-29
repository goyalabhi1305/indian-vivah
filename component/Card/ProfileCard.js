import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Avatar, Button, Card } from 'react-native-paper'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import images from '../../constants/images'
import { mutate } from 'swr'

const ProfileCard = ({item}) => {
    const router = useRouter()
const naviagation = useNavigation()

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

    const handleSend = (id) => {
        mutate('fetchMessages')
        naviagation.push('SingleChat', {
            recevierId: id
        })
    }
    
  return (
    <View>
        <TouchableOpacity onPress={() => { 
            router.push(`UserProfile/${item?._id}`,)
        }}
        activeOpacity={0.9}
        >
        <Card style={styles.card}>
            <Card.Title
                title={(item?.firstName) + " " + item?.lastName}
                subtitle={`Location: ${item?.currentLocation?.city + " " +
                    item?.currentLocation?.country
                }, Education: ${item.education}`}
                left={(props) =>  <Avatar.Image size={45} source={
                    item?.avatar ? { uri: item.avatar } : images.NoUser
                } />}
                right={(props) => (
                    <Text style={styles.heartIcon} {...props}>
                        ❤️
                    </Text>
                )}
            />
            <Card.Content>
                <Text>Age: {calculateAge(item.dob)}</Text>
                <Text>Weight: {item.weight}</Text>
                <Text>Height: {item.height}</Text>
                <Text>Status: {item.maritalStatus}</Text>
            </Card.Content>
            <Card.Actions>
                <Button mode="contained" onPress={()=>{
                    handleSend(item._id)
                }}>
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
        backgroundColor:'#fff'
    },
    heartIcon:{
        marginRight: 20,
        fontSize: 20
    }
})