import React, { useContext } from "react";
import { Image } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import AuthGlobal from "../Context/store/AuthGlobal";

import Login from '../Screens/User/Login'
import Register from '../Screens/User/Register'
import UserProfile from '../Screens/User/UserProfile'

const Stack = createStackNavigator();

function MyStack() {
  const context = useContext(AuthGlobal)
  let userAuthenticated = context.stateUser.isAuthenticated === false || context.stateUser.isAuthenticated === null

  return (
    <Stack.Navigator initialRouteName="Login">
      
      <Stack.Screen
        name="User Profile"
        component={UserProfile}
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
              style={{ height: 30, width: 100 }}
              source={{ uri: 'https://kaientai-app.s3.eu-west-2.amazonaws.com/design/logo/Logo+-+White.png' }}
            />
          ),
          headerLeft: null
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
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
              style={{ height: 30, width: 100 }}
              source={{ uri: 'https://kaientai-app.s3.eu-west-2.amazonaws.com/design/logo/Logo+-+White.png' }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
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
              style={{ height: 30, width: 100 }}
              source={{ uri: 'https://kaientai-app.s3.eu-west-2.amazonaws.com/design/logo/Logo+-+White.png' }}
            />
          ),
        }}
      />

    </Stack.Navigator>
  )
}

export default function UserNavigator() {
  return <MyStack />
}