import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import { LinearGradient } from 'expo-linear-gradient';

const CardSkeletonLoader = () => {
  return (
    <View style={styles.cardContainer}>
      {/* Profile Image Placeholder */}
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.imagePlaceholder}
      />

      {/* Text Lines for Name */}
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.namePlaceholder}
      />

      {/* Text Lines for Details */}
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.textPlaceholder}
      />
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.textPlaceholder}
      />
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.textPlaceholder}
      />

      {/* Bottom Buttons */}
      <View style={styles.buttonRow}>
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.iconPlaceholder}
        />
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.iconPlaceholder}
        />
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.iconPlaceholder}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.get("window").width * 0.9,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    alignSelf: "center",
    elevation: 5,
  },
  imagePlaceholder: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginBottom: 15,
  },
  namePlaceholder: {
    width: "60%",
    height: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  textPlaceholder: {
    width: "90%",
    height: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  iconPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default CardSkeletonLoader;
