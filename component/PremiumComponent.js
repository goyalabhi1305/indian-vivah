// import React from 'react';
// import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
// import images from '../constants/images';

// const PremiumMembership = () => {
//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <Text style={styles.header}>Premium Membership</Text>

//       {/* Content or Graphic Section */}
//       <View style={styles.contentBox}>
//         <Text style={styles.contentText}>
//         <Image
//                     source={images.AppLogo}
//                     style={{ height: 150, marginBottom: 200, 
//                         width: 300, borderRadius: 20
//                     }}
//                     resizeMode="contain"
//                 />
//         </Text>
//       </View>

//       {/* Plans Section */}
//       <View style={styles.plansContainer}>
//         <View style={styles.planBox}>
//           <Text style={styles.planTitle}>Basic</Text>
//           <Text style={styles.planPrice}>700/month</Text>
//         </View>
//         <View style={styles.planBox}>
//           <Text style={styles.planTitle}>Premium</Text>
//           <Text style={styles.planPrice}>1000/month</Text>
//         </View>
//         <View style={styles.planBox}>
//           <Text style={styles.planTitle}>Elite</Text>
//           <Text style={styles.planPrice}>5000/month</Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff3f4',
//     justifyContent: 'center',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   contentBox: {
//     height: 200,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   contentText: {
//     textAlign: 'center',
//     color: '#333',
//     fontSize: 16,
//   },
//   plansContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     gap: 20,
//   },
//   planBox: {
//     width: Dimensions.get('window').width / 3.5,
//     backgroundColor: '#d3d3d3',
//     borderRadius: 8,
//     paddingVertical: 20,
//     alignItems: 'center',
//   },
//   planTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#333',
//   },
//   planPrice: {
//     fontSize: 14,
//     color: '#333',
//   },
// });

// export default PremiumMembership;


import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableHighlight, View } from 'react-native';
import { Card, Text, Button, RadioButton, Chip, DataTable } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import plan from '../utils/plan';
import RazorpayCheckout from 'react-native-razorpay';

const features = [
  { name: 'Unlimited calls & contact sharing', proLite: true, pro: true, proMax: true },
  { name: 'Advanced Search', proLite: true, pro: true, proMax: true },
  { name: 'Super Interest', proLite: '0', pro: '20', proMax: '40' },
  { name: 'Spotlights', proLite: '0', pro: '3', proMax: '6' },
  { name: 'Contact views', proLite: '0', pro: '20', proMax: '60' },
  { name: 'Relationship Manager', proLite: false, pro: false, proMax: false },
];

const subscriptionPlans = [
  { duration: '1 month', price: '₹516', originalPrice: '₹1,288' },
  { duration: '3 months', price: '₹1,288', originalPrice: '₹3,220' },
  { duration: 'Till Marriage', price: '₹3,932', originalPrice: '₹9,830' },
];

export default function PricingComparison() {
  const [selectedPlan, setSelectedPlan] = useState('1 month');

  const renderCheckmark = (value) => {
    if (typeof value === 'boolean') {
      return value ? (
        <MaterialCommunityIcons name="check" size={20} color="#4CAF50" />
      ) : (
        <MaterialCommunityIcons name="close" size={20} color="#F44336" />
      );
    }
    return <Text style={styles.valueText}>{value}</Text>;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>Choose Your Plan</Text>
        <Chip mode="outlined" style={styles.discountChip}>FLAT 60% OFF ON ALL PLANS</Chip>
      </View>

      <DataTable style={styles.featureTable}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title
            style={{ flex: 4 }}
          >Features</DataTable.Title>
          <DataTable.Title
            style={{ flex: 1.2 }}
          >Pro Lite</DataTable.Title>
          <DataTable.Title>Pro</DataTable.Title>
          <DataTable.Title>Pro Max</DataTable.Title>
        </DataTable.Header>

        {features.map((feature, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell style={{ flex: 4, alignItems: 'center' }}>
              <Text style={{ textAlign: 'left', lineHeight: 20, }}>
                {feature.name}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 1 }}>
              {renderCheckmark(feature.proLite)}
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 1 }}>
              {renderCheckmark(feature.pro)}
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 1 }}>
              {renderCheckmark(feature.proMax)}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>

      <Card style={styles.subscriptionCard}>
        <Card.Content>
          <RadioButton.Group onValueChange={value => setSelectedPlan(value)} value={selectedPlan}>
            {subscriptionPlans.map((plan, index) => (
              <View key={index} style={styles.planRow}>
                <RadioButton.Item
                  label={plan.duration}
                  value={plan.duration}
                  position="leading"
                  labelStyle={styles.planLabel}
                />
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>{plan.price}</Text>
                  <Text style={styles.originalPrice}>{plan.originalPrice}</Text>
                </View>
              </View>
            ))}
          </RadioButton.Group>
        </Card.Content>
      </Card>

      {/* <Button
        mode="contained"
        style={styles.getProButton}
        labelStyle={styles.buttonLabel}
        onPress={() => console.log('Get Pro pressed')}>
        
      </Button> */}

      <TouchableHighlight
        onPress={() => {
          var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: '0344276128msh9f9c8d86ab62406p1c3ea5jsn31343fb04f92', // Your API key
            amount: '5000',
            name: 'foo',
            prefill: {
              email: 'void@razorpay.com',
              contact: '9191919191',
              name: 'Razorpay Software',
            },
            theme: { color: '#fff3f4' },
          };
          RazorpayCheckout.open(options)
            .then((data) => {
              // handle success
              alert(`Success: ${data.razorpay_payment_id}`);
            })
            .catch((error) => {
              // handle failure
              alert(`Error: ${error.code} | ${error.description}`);
            });
        }}
        style={[{
          padding: 16,
        },
          styles.getProButton
        ]}>
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Get Pro now</Text>
      </TouchableHighlight>


      <Text style={styles.footer}>Recurring payment, cancel anytime</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3f4',
    padding: 16,
    width: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  discountChip: {
    backgroundColor: '#FFE0E0',
  },
  featureTable: {
    marginBottom: 24,
    backgroundColor: '#fff',
  },
  tableHeader: {
    backgroundColor: '#F5F5F5',
  },
  valueText: {
    fontSize: 16,
  },
  subscriptionCard: {
    marginBottom: 24,
    backgroundColor: "#fff"
  },
  planRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  planLabel: {
    fontSize: 16,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: '#666',
  },
  getProButton: {
    marginBottom: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#E91E63',
  },
  buttonLabel: {
    fontSize: 18,
    paddingVertical: 4,
  },
  footer: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
  },
});
