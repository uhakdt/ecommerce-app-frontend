import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, Button, TextInput, Pressable, Dimensions } from "react-native";
import Error from "../../Shared/Error";

// Context
import AuthGlobal from "../../Context/store/AuthGlobal";
import { loginUser } from "../../Context/actions/Auth.actions";

var { width } = Dimensions.get("window");


const Login = (props) => {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.navigate("User Profile", {
        email: email
      });
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = {
      email,
      password,
    };

    if (email === "" || password === "") {
      setError("Please fill in your credentials");
    } else {
      loginUser(user, context.dispatch);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={"Enter Email"}
          name={"email"}
          id={"email"}
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
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
        <Pressable onPress={() => handleSubmit()} style={styles.loginCotnainer}>
          <View style={styles.loginTextContainer}>
            <Text style={styles.loginText}>Login</Text>
          </View>
        </Pressable>
      </View>
      <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
        <Text style={styles.middleText}>Don't have an account yet?</Text>
        <Pressable onPress={() => props.navigation.navigate("Register")} style={styles.registerContainer}>
          <View style={styles.registerTextContainer}>
            <Text style={styles.registerText}>Register</Text>
          </View>
        </Pressable>
      </View>
    </View>
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

  // Login Button
  loginContainer: {
    alignSelf: 'center',
  },
  loginTextContainer: {
    width: width * 0.6,
    backgroundColor: '#172A55',
    height: 55,
    justifyContent: 'center',
    borderRadius: 10,
  },
  loginText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Register Button
  registerContainer: {
    alignSelf: 'center',
  },
  registerTextContainer: {
    width: width * 0.3,
    backgroundColor: '#e6f3ff',
    height: 55,
    justifyContent: 'center',
    borderRadius: 10,
  },
  registerText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Login;