import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CarouselCards from './CrouselCards'
import ProfileSection from './ProfileSection'
import useSWR from 'swr'
import { GetProfileDetailUser } from '../../services/endpoint'
import { useLocalSearchParams } from 'expo-router'
import TopSection from './TopSection'
import { ActivityIndicator } from 'react-native-paper'

const ProfilePage = () => {

  const {id} = useLocalSearchParams()
  console.log(id)

  const fetcher = async () => {
    const response = await GetProfileDetailUser(id)
    return response.data?.data
  }

  const { data, isLoading, error } = useSWR(
    id ? `fetchUserProfileDetails${id}` : null,
    fetcher)

  if (isLoading) {
    return <View 
    style={{
      height: "95%",
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF3F4'
    }}
    >
      <ActivityIndicator size="large" />
     
  </View>
  }


  return (
    <ScrollView
    contentContainerStyle={styles.contentContainer}
    >
      <TopSection data={data} />
      <CarouselCards 
      data={data}
      />
      <ProfileSection 
        data={data}
      />
    </ScrollView>
  )
}

export default ProfilePage

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#FFF3F4',
  },
})