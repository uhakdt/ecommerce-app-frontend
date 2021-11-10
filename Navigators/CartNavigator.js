import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { Image } from 'react-native';

import Cart from '../Screens/Cart/Cart';
// import CheckoutNavigator from './CheckoutNavigator';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerStyle: {
            backgroundColor: "#006994",
          },
          headerTitleStyle: {
            color: "white",
          },
          cardStyle: {
            backgroundColor: "white",
          },
          headerTitle: () => (
            <Image
              style={{height: 30, width: 100}}
              source={{ uri: 'https://kaientai-app.s3.eu-west-2.amazonaws.com/design/logo/Logo+-+White.png' }}
            />
          ),
        }}
      />
      {/* <Stack.Screen
        name="Checkout"
        component={CheckoutNavigator}
        options={{
          title: 'Checkout'
        }}
      /> */}
    </Stack.Navigator>
  )
}

export default function CartNavigator() {
  return <MyStack />
}