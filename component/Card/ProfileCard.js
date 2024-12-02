import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Avatar, Button, Card, Icon } from 'react-native-paper'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import images from '../../constants/images'
import { mutate } from 'swr'
import { SendFriendRequest, ShortListUser } from '../../services/endpoint'
import Toast from 'react-native-toast-message'

const ProfileCard = ({ item }) => {
    const router = useRouter()
    const naviagation = useNavigation()

    const [loadingInterest, setLoadingInterest] = useState(false)

    const [heartClicked, setHeartClicked] = useState(false)

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

    const handleSendInterest = async (id) => {
        try {
            setLoadingInterest(true)

            const payload = {
                receiverId: id
            }

            const response = await SendFriendRequest(payload);

            setLoadingInterest(false)
            Toast.show({
                type: 'success',
                text1: 'Interest Sent'
            })

        } catch (error) {
            setLoadingInterest(false)
            Toast.show({
                type: 'error',
                text1: 'Unable to send interest'
            })

            console.log(error)
        }

    }

    const handleShortlist = async (id) => {
        try{

            const payload = {
                profileId: id
            }

            const response = await ShortListUser(payload);

            

        }catch(error){
            console.log(error)
        }
    }

    return (
        <View>

            <TouchableOpacity
                onPress={() => {
                    router.push(`UserProfile/${item?._id}`);
                }}
                activeOpacity={0.9}
            >
                <Card style={styles.card}>
                    <Card.Title
                        title={`${item?.firstName} ${item?.lastName}`}
                        subtitle={`Location: ${item?.currentLocation?.city} ${item?.currentLocation?.country}, Education: ${item.education}`}
                        left={(props) => (
                            <Avatar.Image
                                size={45}
                                source={item?.avatar ? { uri: item.avatar } : images.NoUser}
                            />
                        )}
                        // right={(props) => (
                        //     <Text style={styles.heartIcon} {...props}>
                               
                        //     </Text>
                        // )}
                    />
                    <Card.Content>
                        <Text>Age: {calculateAge(item.dob)}</Text>
                        <Text>Weight: {item.weight}</Text>
                        <Text>Height: {item.height}</Text>
                        <Text>Status: {item.maritalStatus}</Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button
                            loading={loadingInterest}
                            disabled={loadingInterest}
                            mode="contained"
                            onPress={() => {
                                handleSendInterest(item._id);
                            }}
                        >
                            Send
                        </Button>
                        <Button mode="outlined" onPress={() => handleSend(item._id)}>
                            Chat
                        </Button>
                    </Card.Actions>
                    <Card.Actions>
                        {/* <Button
                            loading={loadingInterest}
                            disabled={loadingInterest}
                            mode="contained"
                            onPress={() => {
                                handleSendInterest(item._id);
                            }}
                        >
                            Send
                        </Button>
                        <Button mode="outlined" onPress={() => handleSend(item._id)}>
                            Chat
                        </Button> */}
                         <TouchableOpacity
                                    onPress={(event) => {
                                        event.stopPropagation(); // Prevent event from bubbling
                                        setHeartClicked(!heartClicked);
                                        handleShortlist(item._id);
                                    }}
                                    style={styles.heartIcon}
                                >
                                    <Icon
                                        source={heartClicked ? 'heart' : 'heart-outline'}
                                        size={25}
                                        color={heartClicked ? 'red' : 'black'}
                                    />
                                </TouchableOpacity>
                    </Card.Actions>
                </Card>
            </TouchableOpacity>;

        </View>
    )
}

export default ProfileCard

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 16,
        marginVertical: 8,
        position: 'relative',
        backgroundColor: '#fff'
    },
    heartIcon: {
        marginRight: 20,
        fontSize: 20,
        paddingHorizontal: 30,
        paddingVertical: 20,
        zIndex: 10000,
        position: 'absolute',
        top: -220,
        right: -30,
    }
})