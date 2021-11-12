import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Dimensions } from 'react-native';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';

var { width } = Dimensions.get("window");

const HomePage = () => {
  const [postcode, setPostcode] = useState()
  const [tempNum, setTempNum] = useState(1);

  const checkPostcode = () => {
    axios.post(`https://kaientai-api.herokuapp.com/api/v1/postcode/check`, {
      supplierID: 1,
      code: postcode
    })
    .then(function (response) {
      if(response.data.local === "yes") {
        setTempNum(2)
      } else {
        setTempNum(3)
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return(
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={"Enter Postcode"}
          name={"postcode"}
          id={"postcode"}
          value={postcode}
          onChangeText={(text) => setPostcode(text)}
        />
        <Pressable onPress={checkPostcode} style={styles.checkPostcodeContainer}>
          <View style={styles.checkPostcodeTextContainer}>
            <Text style={styles.checkPostcodeText}>Submit</Text>
          </View>
        </Pressable>
      </View>
      {tempNum === 1 
      ? ( <View>
            <Text>See if we cover your area.</Text>
          </View>) 
      : tempNum === 2 
      ? ( <View>
            <Text style={{color: 'green'}}>We cover your area!</Text>
          </View>)
      : ( <View>
            <Text style={{color: 'red', textAlign: 'center'}}>We do not cover your area just yet.{'\n'}Send us an email on bauan@kaientai.co.uk to get notified.</Text>
          </View>)
      }
      
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    padding: 20,
    paddingBottom: 20,
    alignItems: 'center'
  },

  inputContainer: {
    marginVertical: 5,
    flexDirection: 'row',
  },
  input: {
    marginRight: 10,
    backgroundColor: 'white',
    padding: 5,
    paddingLeft: 15,
    paddingHorizontal: 40,
    marginVertical: 5,
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

  // Submit Check Postcode Button
  checkPostcodeContainer: {
    alignSelf: 'center',
  },
  checkPostcodeTextContainer: {
    width: width * 0.3,
    backgroundColor: '#e6f3ff',
    height: 40,
    justifyContent: 'center',
    borderRadius: 10,
  },
  checkPostcodeText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
})

export default HomePage;