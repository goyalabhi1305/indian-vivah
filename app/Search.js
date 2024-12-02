import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchComponent from '../component/SearchComponent'

const Search = () => {
  return (
    <View
    style={{
        flex: 1,
        backgroundColor: '#fff3f4',
    }}
    >
       <SearchComponent />
    </View>
  )
}

export default Search

const styles = StyleSheet.create({})