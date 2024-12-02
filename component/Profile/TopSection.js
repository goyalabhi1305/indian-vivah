import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar, Divider } from 'react-native-paper'
import images from '../../constants/images'

const TopSection = ({ data }) => {
    return (
        <View>
        <View
            style={{
                padding: 10,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
            }}
        >
            <Avatar.Image size={70} source={
                data?.avatar ? { uri: data.avatar } : images.NoUser
            } />

            <View>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                {data?.firstName + " " + data?.lastName}
            </Text>
            <Text>{data?.shortId}</Text>
            </View>
        </View>
        <Divider />
        </View>
    )
}

export default TopSection

const styles = StyleSheet.create({})