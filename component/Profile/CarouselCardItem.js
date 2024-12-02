import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native"

export const SLIDER_WIDTH = Dimensions.get('window').width 
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8)


// const SLIDER_WIDTH = Dimensions.get('window').width;
// const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.75);

const CarouselCardItem = ({ item, index, handleImagePress }) => {
  return (
    <TouchableOpacity onPress={handleImagePress}
    activeOpacity={0.95}
    >
    <View style={styles.container} key={index}>
      <Image
        source={{ uri: item.pic }}
        style={styles.image}

      rezieMode="cover"

      />
    </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    shadowColor: "#000",
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius:8,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 300,
    objectFit: "cover",
    width: "100%",
    borderRadius: 8,
    backgroundColor: 'white',

  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20
  },
  body: {
    color: "#222",
    fontSize: 16,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20
  }
})

export default CarouselCardItem