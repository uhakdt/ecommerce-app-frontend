import React from 'react'
import { Image } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack"

import HomePage from "../Screens/Products/HomePage";
import SingleProduct from "../Screens/Products/SingleProduct"

// Category Screens
import ProductsScreen from '../Screens/Products/categories/ProductsScreen';
import ProductsBathroomScreen from '../Screens/Products/categories/ProductsBathroomScreen';
import ProductsBeautyScreen from '../Screens/Products/categories/ProductsBeautyScreen';
import ProductsKitchenScreen from '../Screens/Products/categories/ProductsKitchenScreen';
import ProductsOutdoorsScreen from '../Screens/Products/categories/ProductsOutdoorsScreen';
import ProductsSetsScreen from '../Screens/Products/categories/ProductsBathroomScreen';
import ProductsSoapBarsScreen from '../Screens/Products/categories/ProductsSoapBarsScreen';


const Stack = createStackNavigator()

function MyStack() {
  return (
    <Stack.Navigator 
      initialRouteName="HomeScreen" 
      screenOptions={{
        headerTintColor: 'white',
        headerLeftLabelVisible: false
      }}
    >

      <Stack.Screen 
        name="HomeScreen"
        component={HomePage}
        options={{
          headerStyle: {
            backgroundColor: "#006994",
          },
          headerTitleStyle: {
            color: "white",
          },
          title: "Home",
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
      <Stack.Screen 
        name="ProductsScreen" 
        component={ProductsScreen}
        options={{
          headerStyle: {
            backgroundColor: "#006994",
          },
          headerTitleStyle: {
            color: "white",
          },
          title: "Our Products",
          cardStyle: {
            backgroundColor: "white",
          },
        }}
      />
      <Stack.Screen 
        name="ProductsBathroomScreen" 
        component={ProductsBathroomScreen}
        options={{
          headerStyle: {
            backgroundColor: "#006994",
          },
          headerTitleStyle: {
            color: "white",
          },
          title: "Bathroom",
          cardStyle: {
            backgroundColor: "white",
          },
        }}
      />
      <Stack.Screen 
        name="ProductsBeautyScreen" 
        component={ProductsBeautyScreen}
        options={{
          headerStyle: {
            backgroundColor: "#006994",
          },
          headerTitleStyle: {
            color: "white",
          },
          title: "Beauty",
          cardStyle: {
            backgroundColor: "white",
          },
        }}
      />
      <Stack.Screen 
        name="ProductsKitchenScreen" 
        component={ProductsKitchenScreen}
        options={{
          headerStyle: {
            backgroundColor: "#006994",
          },
          headerTitleStyle: {
            color: "white",
          },
          title: "Kitchen",
          cardStyle: {
            backgroundColor: "white",
          },
        }}
      />
      <Stack.Screen 
        name="ProductsOutdoorsScreen" 
        component={ProductsOutdoorsScreen}
        options={{
          headerStyle: {
            backgroundColor: "#006994",
          },
          headerTitleStyle: {
            color: "white",
          },
          title: "Outdoors",
          cardStyle: {
            backgroundColor: "white",
          },
        }}
      />
      <Stack.Screen 
        name="ProductsSetsScreen" 
        component={ProductsSetsScreen}
        options={{
          headerStyle: {
            backgroundColor: "#006994",
          },
          headerTitleStyle: {
            color: "white",
          },
          title: "Sets",
          cardStyle: {
            backgroundColor: "white",
          },
        }}
      />
      <Stack.Screen 
        name="ProductsSoapBarsScreen"
        component={ProductsSoapBarsScreen}
        options={{
          headerStyle: {
            backgroundColor: "#006994",
          },
          headerTitleStyle: {
            color: "white",
          },
          title: "Soap Bars",
          cardStyle: {
            backgroundColor: "white",
          },
        }}
      />
      <Stack.Screen 
        name="SingleProduct" 
        component={SingleProduct}
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
    </Stack.Navigator>
  )
}

export default function HomeNavigator() {
  return <MyStack />;
}