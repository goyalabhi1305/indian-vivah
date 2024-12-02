import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Avatar, Button, Card, Divider, Icon, IconButton } from 'react-native-paper'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import images from '../../constants/images'
import { mutate } from 'swr'
import { AcceptFriendRequest, SendFriendRequest, ShortListUser } from '../../services/endpoint'
import Toast from 'react-native-toast-message'

const ProfileCard = ({ item , cardType= 'normal',
    friendReqId = null
}) => {
    const router = useRouter()
    const naviagation = useNavigation()
    const [loading, setLoading] = useState(false)

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

            await mutate('sent')

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
        try {

            const payload = {
                profileId: id
            }

            const response = await ShortListUser(payload);

            await mutate('shortlisted')



        } catch (error) {
            console.log(error)
        }
    }

    const handleAcceptRequest = async (id) => {
        try {
            setLoading(true)
            const payload = {
                requestId: friendReqId,
                status: 'ACCEPTED'
            }

            const response = await AcceptFriendRequest(payload);
            await mutate('interests')
            await mutate('accepted')

            if (response) {
                Toast.show({
                    type: 'success',
                    text1: 'Request Accepted'
                })
            }


        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    return (
        <View>

            <TouchableOpacity
                onPress={() => {
                    router.push(`UserProfile/${item?._id}`);
                }}
                activeOpacity={0.9}
                style={{ position: 'relative' }}
            >

                <Card style={styles.card}>
                    <Image
                        source={{ uri: item.avatar }}

                        resizeMethod='resize'
                        resizeMode='cover'
                        style={{
                            position: 'absolute', width: '100%', height: '100%',
                            zIndex: -1, opacity: 0.82, borderRadius: 30, overflow: 'hidden',


                        }}
                        fadeDuration={300}
                    >



                    </Image>
                    <View
                        style={{
                            position: 'absolute', width: '100%', height: '100%',
                            backgroundColor: 'black',
                            zIndex: -1, opacity: 0.5, borderRadius: 30, overflow: 'hidden',

                        }}
                    >

                    </View>

                    <Card.Content
                        style={{
                            marginTop: 130
                        }}
                    >

                        <Text
                            style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textTransform: 'capitalize' }}
                        >
                            {`${item?.firstName} ${item?.lastName}`}
                        </Text>

                        <Text
                            style={{
                                color: 'white', fontSize: 14, textTransform: 'capitalize',
                                marginTop: "-10px", marginBottom: 15
                            }}
                        >
                            {`Location: ${item?.currentLocation?.city} ${item?.currentLocation?.country}, Education: ${item.education}`}
                        </Text>

                        <Text
                            style={{
                                color: 'white', fontSize: 16, textTransform: 'capitalize',
                                marginBottom: 5
                            }}
                        >
                            <Text style={{ fontWeight: 'bold' }}>Age: </Text>
                            {calculateAge(item.dob)}</Text>
                        <Text
                            style={{
                                color: 'white', fontSize: 16, textTransform: 'capitalize',
                                marginBottom: 5
                            }}
                        >
                            <Text style={{ fontWeight: 'bold' }}>
                                Weight: </Text>
                            {item.weight}</Text>
                        <Text
                            style={{
                                color: 'white', fontSize: 16, textTransform: 'capitalize',
                                marginBottom: 5
                            }}
                        >
                            <Text style={{ fontWeight: 'bold' }}>
                                Height: </Text>{item.height}</Text>
                        <Text
                            style={{
                                color: 'white', fontSize: 16, textTransform: 'capitalize',
                                marginBottom: 5
                            }}
                        >
                            <Text style={{ fontWeight: 'bold' }}>
                                Status: </Text>{item.maritalStatus}</Text>

                        <Text
                            style={{
                                color: 'white', fontSize: 16, textTransform: 'capitalize',
                                marginBottom: 5
                            }}
                        >
                            <Text style={{ fontWeight: 'bold' }}>
                                Earns: </Text>{item.salary} lacs.p.a </Text>
                    </Card.Content>
                    <Divider
                        style={{
                            backgroundColor: 'white',
                            marginBottom: 0,
                            marginTop: 10,
                            height: 1
                        }}
                    />
                    <Card.Actions
                    style={{
                        paddingBottom: 0,
                    }}
                    >
                       {
                        cardType === 'normal' ?  <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                            
                        }}
                    >
                       

                        <View>
                            <IconButton
                                iconColor={'#ff4f4f'}
                                icon={'rocket-launch'}
                                mode='contained-tonal'
                                style={{
                                    backgroundColor: 'white',
                                    padding:0}}
                                size={25}
                                onPress={() => {
                                    handleSendInterest(item._id);
                                }}
                            >
                                Send
                            </IconButton>
                            <Text style={{
                                color: 'white', textAlign: 'center',
                                fontSize: 12, textTransform: 'capitalize'
                            }}>Send</Text>
                        </View>

                        <View>
                            <IconButton
                                iconColor={
                                    heartClicked ? 'white' : '#ff4f4f'
                                }
                                icon={'heart'}
                                size={25}
                                style={{
                                    backgroundColor: heartClicked ? 'red' : 'white',
                                    padding:0
                                }}
                                onPress={() => {
                                    setHeartClicked(!heartClicked);
                                    handleShortlist(item._id);
                                }}
                            >
                                Shortlist
                            </IconButton>
                            <Text style={{
                                color: 'white', textAlign: 'center',
                                fontSize: 12, textTransform: 'capitalize'
                            }}>Shortlist</Text>
                        </View>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            <IconButton
                                iconColor={'#ff4f4f'}
                                icon={'chat'}
                                mode='contained-tonal'
                                style={{
                                    backgroundColor: 'white',
                                    padding:0
                                }}
                                size={25}
                                onPress={() => handleSend(item._id)}>
                                Chat
                            </IconButton>
                            <Text style={{
                                color: 'white', textAlign: 'center',
                                fontSize: 12, textTransform: 'capitalize'
                            }}>Chat</Text>
                        </View>
                    </View> : <View
                    style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'center',
                        
                    }}
                    >
                            <Button
                                mode='contained'
                                onPress={() => {
                                    handleAcceptRequest(item._id);
                                }}
                                style={{
                                    backgroundColor: '#ff4f4f',
                                    borderRadius: 20,
                                    width: '100%',
                                    padding: 0,
                                    margin: 0
                                }}
                                contentStyle={{
                                    padding: 0,
                                    margin: 0
                                }}
                                icon={'account-plus'}
                                disabled={loading}
                                loading={loading}
                            >
                                Accept Request
                            </Button>
                            
                    </View>
                       }
                    </Card.Actions>
                    <Card.Actions>

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
        top: -170,
        right: -20,
    }
})