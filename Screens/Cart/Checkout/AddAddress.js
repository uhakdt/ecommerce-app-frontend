import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const AddAddress = (props) => {
  const [fullName, setFullName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  const checkout = () => {
    props.navigation.navigate("Checkout", {
      details: {
        fullName: fullName,
        address1: address1,
        address2: address2,
        city: city,
        postcode: postcode,
        phone: phone,
        email: email,
        deliveryInstructions: deliveryInstructions
      }
    })
  }

  return(
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <ScrollView style={styles.root}>
        <Text style={styles.title}>Enter a delivery address</Text>

        {/* FULL NAME */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name..."
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        {/* ADDRESS 1 */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Address Line 1</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your first line of address..."
            value={address1}
            onChangeText={setAddress1}
          />
        </View>

        {/* ADDRESS 2 */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Address Line 2</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={address2}
            onChangeText={setAddress2}
          />
        </View>

        {/* CITY */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Town/City</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your city..."
            value={city}
            onChangeText={setCity}
          />
        </View>

        {/* POSTCODE */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Postcode</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your area postcode..."
            value={postcode}
            onChangeText={setPostcode}
          />
        </View>

        {/* PHONE */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Phone number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number..."
            value={phone}
            onChangeText={setPhone}
            keyboardType={'phone-pad'}
          />
        </View>

        {/* EMAIL */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address..."
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* DELIVERY INSTRUCTIONS */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Delivery Instructions</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your delivery instructions..."
            value={deliveryInstructions}
            onChangeText={setDeliveryInstructions}
          />
        </View>

        {/* BUTTON */}
        <Pressable onPress={checkout} style={styles.goToCheckout}>
          <Text style={styles.goToCheckoutText}>Go to Checkout</Text>
        </Pressable>
        
        <Text>{'\n'}</Text>
      </ScrollView>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  inputContainer: {
    marginVertical: 5,
  },
  inputTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: -10,
  },
  input: {
    backgroundColor: 'white',
    padding: 5,
    paddingLeft: 15,
    marginVertical: 15,
    height: 40,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,  
    elevation: 5,
  },

  // ADD DELIVERY INSTRUCTIONS
  deliveryInstructionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FAFAFA',
    borderColor: 'lightgrey',
    borderRadius: 5,
    marginBottom: 20,
  },
  deliveryInstructionsText: {
    alignSelf: 'center',
    fontSize: 16,
  },

  // BUTTON
  goToCheckout: {
    backgroundColor: '#98FFC8',
    height: 45,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  goToCheckoutText: {
      fontSize: 18,
  },
})

export default AddAddress;