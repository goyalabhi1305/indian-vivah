import * as React from 'react';
import { View, Text, useWindowDimensions, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ProfileVisitors from '../component/ProfileVisitors';
import ProfileIVisted from '../component/ProfileIVisted';
import TheyShortlisted from '../component/TheyShortlisted';
import IShortListed from '../component/IShortListed';

// Define the two routes as functional components
const FirstRoute = () => (
  <TheyShortlisted/>
);

const SecondRoute = () => (
  <IShortListed/>
);

const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={styles.tabBar} // Change tab background
      indicatorStyle={styles.indicator} // Customize indicator
      labelStyle={styles.label} // Customize text
    />
  );

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function TabViewExample() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const routes = [
    { key: 'first', title: 'They Shortlisted' },
    { key: 'second', title: 'I Shortlisted' },
  ];

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar} // Use custom tab bar
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      style={{ backgroundColor: '#fff3f4' }}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    backgroundColor: '#ff4f4f', // Tab bar background color
    shadowOffset: 'none', // Remove
  },
  indicator: {
    backgroundColor: '#fff', // Indicator color
  },
  label: {
    color: '#ffffff', // Tab text color
    fontWeight: 'bold',
  },
});
