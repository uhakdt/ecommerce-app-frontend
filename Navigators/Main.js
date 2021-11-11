import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { FontAwesome } from "react-native-vector-icons";

// Stacks
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import UserNavigator from "./UserNavigator";

import CartIcon from "../Shared/CartIcon";

const Tab = createBottomTabNavigator();

const Main = () => {

  // const context = useContext(AuthGlobal)

  return (
    <Tab.Navigator
      initialRouteName="HomeNavigator"
      screenOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        activeTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={30} />
          ),
          headerShown: false,
          tabBarActiveTintColor: "#172A55"
        }}
        
      />
      <Tab.Screen
        name="CartNavigator"
        component={CartNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <View>
              <Ionicons name="basket" color={color} size={30} />
              <CartIcon />
            </View>
          ),
          headerShown: false,
          tabBarActiveTintColor: "#172A55"
        }}
      />
      
      <Tab.Screen
        name="UserNavigator"
        component={UserNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <View>
              <Ionicons name="person" color={color} size={30} />
            </View>
          ),
          headerShown: false,
          tabBarActiveTintColor: "#172A55"
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;