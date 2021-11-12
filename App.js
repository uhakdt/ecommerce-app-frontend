import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";

// Redux
import { Provider } from "react-redux";
import store from "./Redux/store";
import { StripeProvider } from '@stripe/stripe-react-native';

// Context API
import Auth from "./Context/store/Auth";

// Navigatiors
import Main from "./Navigators/Main";

const App = () => {
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          <StripeProvider publishableKey="pk_live_51JGoDJGV93cbvl6oVHlocRdXMTnBxMgXlploT8m443cIr67BPRYJxzSaWMTYA9kiPe5xsz4yfR2Ph1V0dxQIw5aT00TzOT8Gs0">
            <Main />
          </StripeProvider>
        </NavigationContainer>
      </Provider>
    </Auth>
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
