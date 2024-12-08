import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, TouchableOpacity, View, TouchableWithoutFeedback, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { height, width } = Dimensions.get('window');

const HeaderLeftComponent = () => {
    const [showDrawer, setShowDrawer] = useState(false);
    const drawerAnim = useRef(new Animated.Value(-250)).current; // Keep this animated value in a ref
    const router = useRouter();

    // Function to handle drawer opening/closing animation
    const toggleDrawer = () => {
        if (showDrawer) {
            // Animate drawer to the left (off-screen) when closing
            Animated.timing(drawerAnim, {
                toValue: -250, // Moves the drawer off-screen
                duration: 300, // Animation duration
                useNativeDriver: true,
            }).start(() => {
                setShowDrawer(false); // Set showDrawer to false after animation completes
            });
        } else {
            // Reset the drawer to -250 before starting the open animation
            drawerAnim.setValue(-250);

            // Animate drawer from left to its normal position when opening
            Animated.timing(drawerAnim, {
                toValue: 0, // Drawer comes into view
                duration: 300, // Animation duration
                useNativeDriver: true,
            }).start();
            setShowDrawer(true); // Set showDrawer to true immediately to show the drawer
        }
    };

    // Function to close the drawer if clicked outside
    const closeDrawer = () => {
        Animated.timing(drawerAnim, {
            toValue: -250, // Move the drawer off-screen
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setShowDrawer(false); // Set showDrawer to false after animation completes
        });
    };

    return (
        <>
            {/* Menu Icon */}
            <TouchableOpacity
                activeOpacity={0.7}
                style={{
                    zIndex: 1005,
                    padding: 10,
                    paddingRight: 20,
                    paddingLeft: 5,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 20,
                    alignItems: 'center',
                }}
                onPress={toggleDrawer}
            >
                <Icon name="menu" size={24} style={{ marginLeft: 20 }} />
                <Text
                style={{
                    color: '#000',
                    fontSize: 20,
                    fontWeight: 'bold',
                }}
                >Matches</Text>
            </TouchableOpacity>

            {/* Overlay - TouchableWithoutFeedback to close the drawer */}


            {/* Drawer View */}
            {showDrawer && (
                <Animated.View
                    style={{
                        backgroundColor: '#fff',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        width: 250,
                        height: height + height,
                        transform: [{ translateX: drawerAnim }], // Use animated translation to move the drawer
                        zIndex: 90001, // Ensure the drawer appears above the overlay
                    }}
                >
                    {/* Drawer content can go here */}
                    <TouchableOpacity
                        onPress={() => {
                            AsyncStorage.removeItem('token');
                            AsyncStorage.removeItem('userdetails');
                            AsyncStorage.removeItem('showOnboarding');
                            router.replace('(auth)/SignIn');
                        }
                        }

                        style={{
                            padding: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: '#ddd',
                            marginTop: 50
                        }}
                        
                    >
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </Animated.View>
            )}

            {showDrawer && (
                <TouchableWithoutFeedback onPress={closeDrawer}>
                    <View
                        // style={{
                        //     position: 'absolute',
                        //     top: 0,

                        //     right: 0,
                        //     height: height,
                        //     width: 100,

                        //     backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
                        //     zIndex: 1002, // Ensure the overlay is above the content but below the drawer
                        // }}
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: width,
                            height: height,
                            // transform: [{ translateX: drawerAnim }], // Use animated translation to move the drawer
                            zIndex: 1000, // Ensure the drawer appears above the overlay
                        }}
                    />
                </TouchableWithoutFeedback>
            )}
        </>
    );
};

export default HeaderLeftComponent;

const styles = StyleSheet.create({});
