import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


// Screens
import ProductContainer from './Screens/Products/ProductContainer';
import Header from './Shared/Header';

const App = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ProductContainer />
    </View>
  );
}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
