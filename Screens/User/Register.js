import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

var { width } = Dimensions.get("window");

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = () => {
    if (email === "" || name === "" || phone === "" || password === "") {
      setError("Please fill in the form correctly");
    }
    axios.post(`${baseURL}user/register`, {
      name: name,
      email: email,
      password: password,
      phone: phone,
      isAdmin: true,
    })
    .then(function (res) {
      if (res.data.status === "OK") {
        alert("Registration Successful!")
        setTimeout(() => {
          props.navigation.navigate("Login");
        }, 500);
      } else {
        alert("User already exists - please enter a different email.")
      }
    })
    .catch(function (error) {
      console.log(error);
      logoutUser(dispatch)
    });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
      style={styles.root}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={"Enter your full name"}
          name={"name"}
          id={"name"}
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={"Enter email"}
          name={"email"}
          id={"email"}
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={"Enter phone number"}
          name={"phone"}
          id={"phone"}
          value={phone}
          onChangeText={(text) => setPhone(text.toLowerCase())}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={"Enter Password"}
          name={"password"}
          id={"password"}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}
        <Pressable onPress={() => register()} style={styles.registerCotnainer}>
          <View style={styles.registerTextContainer}>
            <Text style={styles.registerText}>Register</Text>
          </View>
        </Pressable>
      </View>
      <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
        <Text style={styles.middleText}>Already have an account?</Text>
        <Pressable onPress={() => props.navigation.navigate("Login")} style={styles.backToLoginContainer}>
          <View style={styles.backToLoginTextContainer}>
            <Text style={styles.backToLoginText}>Back to Login</Text>
          </View>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 50,
    paddingTop: 100,
  },
  inputContainer: {
    marginVertical: 5,
  },
  input: {
    backgroundColor: 'white',
    padding: 5,
    paddingLeft: 15,
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
  buttonGroup: {
    alignItems: "center",
    marginTop: 10,
  },
  middleText: {
    marginBottom: 20,
  },

  // Register Button
  registerContainer: {
    alignSelf: 'center',
  },
  registerTextContainer: {
    width: width * 0.6,
    backgroundColor: '#172A55',
    height: 55,
    justifyContent: 'center',
    borderRadius: 10,
  },
  registerText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Back to login Button
  backToLoginContainer: {
    alignSelf: 'center',
  },
  backToLoginTextContainer: {
    width: width * 0.3,
    backgroundColor: '#e6f3ff',
    height: 55,
    justifyContent: 'center',
    borderRadius: 10,
  },
  backToLoginText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Register;
