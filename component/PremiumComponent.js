import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import images from '../constants/images';

const PremiumMembership = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Premium Membership</Text>

      {/* Content or Graphic Section */}
      <View style={styles.contentBox}>
        <Text style={styles.contentText}>
        <Image
                    source={images.AppLogo}
                    style={{ height: 150, marginBottom: 200, 
                        width: 300, borderRadius: 20
                    }}
                    resizeMode="contain"
                />
        </Text>
      </View>

      {/* Plans Section */}
      <View style={styles.plansContainer}>
        <View style={styles.planBox}>
          <Text style={styles.planTitle}>Basic</Text>
          <Text style={styles.planPrice}>700/month</Text>
        </View>
        <View style={styles.planBox}>
          <Text style={styles.planTitle}>Premium</Text>
          <Text style={styles.planPrice}>1000/month</Text>
        </View>
        <View style={styles.planBox}>
          <Text style={styles.planTitle}>Elite</Text>
          <Text style={styles.planPrice}>5000/month</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff3f4',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  contentBox: {
    height: 200,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  contentText: {
    textAlign: 'center',
    color: '#333',
    fontSize: 16,
  },
  plansContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  planBox: {
    width: Dimensions.get('window').width / 3.5,
    backgroundColor: '#d3d3d3',
    borderRadius: 8,
    paddingVertical: 20,
    alignItems: 'center',
  },
  planTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  planPrice: {
    fontSize: 14,
    color: '#333',
  },
});

export default PremiumMembership;
