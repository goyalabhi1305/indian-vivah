import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import QuickSearch from '../../component/QuickSearch'

const QucikSearch = () => {
  return (

    <View
    style={{
      backgroundColor: "#fff",
      flex: 1,
    }}
    >
      <QuickSearch />
    </View>
  )
}

export default QucikSearch

const styles = StyleSheet.create({})