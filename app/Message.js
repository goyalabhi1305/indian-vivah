import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MessageComponent from '../component/MessageComponent'

const Message = () => {
  return (
    <View
    style={{
        flex: 1,
        backgroundColor: '#fff3f4',
    }}
    >
      <MessageComponent />
    </View>
  )
}

export default Message

const styles = StyleSheet.create({})