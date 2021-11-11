import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";

// Redux
import { Provider } from "react-redux";
import store from "./Redux/store";
import { StripeProvider } from '@stripe/stripe-react-native';

// Context API
// import Auth from "./Context/store/Auth";

// Navigatiors
import Main from "./Navigators/Main";

// Screens
import Header from "./Shared/Header";

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StripeProvider publishableKey="pk_test_51JGoDJGV93cbvl6oZjpA1RLnEGHSNG9JBzgjQcLjkBi16bWKnRPKsT3hjBkRfYHvpcQqCFrDedCdaCEB7hxKtBYg00Vw3m8qRb">
          <Main />
        </StripeProvider>
      </NavigationContainer>
    </Provider>
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
