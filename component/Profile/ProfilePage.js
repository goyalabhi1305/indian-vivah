import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CarouselCards from './CrouselCards'
import ProfileSection from './ProfileSection'

const ProfilePage = () => {
  return (
    <ScrollView>
      <CarouselCards />
      <ProfileSection />
    </ScrollView>
  )
}

export default ProfilePage

const styles = StyleSheet.create({})