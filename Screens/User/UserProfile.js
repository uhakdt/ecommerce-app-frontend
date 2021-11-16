import React, { useContext, useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, Alert, Linking } from 'react-native';
import { useFocusEffect } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios"
import baseURL from "../../assets/common/baseUrl"

import AuthGlobal from "../../Context/store/AuthGlobal"
import { logoutUser } from "../../Context/actions/Auth.actions"

import { Ionicons } from "react-native-vector-icons";
import { SimpleLineIcons } from "react-native-vector-icons";


const UserProfile = (props) => {
  const context = useContext(AuthGlobal)
  const [userProfile, setUserProfile] = useState()
  const [orders, setOrders] = useState()
  let isAuthenticated = context.stateUser.isAuthenticated === false || context.stateUser.isAuthenticated === null

  const privacyPolicyURL = "https://www.kaientai.co.uk/privacy";

  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return <Button title={children} onPress={handlePress} />;
  };

  useEffect(() => {
    props.navigation.addListener("beforeRemove", (e) => {
       if(isAuthenticated) {
         return ;
        } else {
      e.preventDefault();
     }
    });
}, [props.navigation]);

  useFocusEffect(
    useCallback(() => {
      if (isAuthenticated) {
        props.navigation.navigate("Login")
      }
      AsyncStorage.getItem("jwt")
        .then((res) => {
          axios
            .get(`${baseURL}user/${context.stateUser.user.userId}`, {
              headers: { Authorization: `Bearer ${res}` },
            })
            .then((user) => {
              setUserProfile(user.data.data.user)
            })
        })
        .catch((error) => console.log(error))
      axios
        .get(`${baseURL}orders/${context.stateUser.user.userId}`)
        .then((x) => {
          const data = x.data.data.orders;
          setOrders(data);
        })
        .catch((error) => console.log(error))

      return () => {
        setUserProfile();
        setOrders();
      }

    }, [context.stateUser.isAuthenticated]))

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.subContainer}>
        {/* Main Profile */}
        <View style={styles.main}>
          {/* <View style={[styles.editButtonContainer, styles.shadow]}>
            <Feather name="edit" color="#172A55" size={20} />
          </View> */}
          <View style={styles.profileImageAndNameContainer}>
            <Ionicons style={styles.profileImage} name="person" color="#172A55" size={65} />
            <Text style={styles.name}>{userProfile && userProfile.name}</Text>
          </View>
          <View style={styles.line}></View> 
          <View style={styles.emailContainer}>
            <Ionicons name="md-mail-open" color="#172A55" size={25} />
            <Text style={styles.emailText}>{userProfile && userProfile.email}</Text>
          </View>
          <View style={styles.line}></View> 
          <View style={styles.phoneContainer}>
            <SimpleLineIcons name="screen-smartphone" color="#172A55" size={25} />
            <Text style={styles.phoneText}>{userProfile && userProfile.phone}</Text>
          </View>
        </View>
        
        <View style={styles.order}>
          <Text style={{ fontSize: 20 }}>My Orders</Text>
          <View>
            {orders && orders.map((order, index) => {
              return (
                <View style={[styles.orderContainer, styles.shadow]} key={index}>
                  <View style={styles.iconAndTextContainer}>
                    <View style={[styles.iconContainer, styles.shadow]}>
                      <Ionicons name="home" color="#172A55" size={25} style={styles.icon} />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.textDateAndTime}>{order.dateAndTime.replace("T", " ").replace(".000Z", "")}</Text>
                      <Text>{order.address1}</Text>
                      <Text style={styles.textOrderStatus}>{order.status}</Text>
                    </View>
                  </View>
                  <View style={styles.totalAndArrowContainer}>
                    <View style={[styles.totalContainer, styles.shadow]}>
                      <View style={styles.totalIconContainer}>
                        <Ionicons name="basket" color="#172A55" size={20} />
                      </View>
                      <View style={styles.totalPriceContainer}>
                        <Text style={styles.totalPriceText}>{order.totalAmount}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              )
            })}
          </View>
        </View>
        <View style={styles.contactDetailsContainer}>
          <Text style={styles.contactDetailsText}>You can contact us on:</Text>
          <Text style={styles.contactDetailsText}>bauan@kaientai.co.uk</Text>
        </View>
        <View>
          <OpenURLButton url={privacyPolicyURL}>Go to our Privacy Policy</OpenURLButton>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  subContainer: {
    alignItems: "center",
    marginTop: 60
  },
  order: {
    marginTop: 20,
    alignItems: "center",
  },

  // Main
  main: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },

  editButtonContainer: {
    height: 30,
    width: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    marginTop: -10,
    shadowColor: "#000",
    borderRadius: 5,
  },

  profileImageAndNameContainer: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  profileImage: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "lightgrey",
    borderWidth:1,
  },
  name: {
    alignSelf: 'center',
    paddingLeft: 20,
    fontSize: 18,
    width: 200,
  },

  emailContainer: {
    paddingTop: 10,
    flexDirection: 'row',
  },
  emailText: {
    alignSelf: 'center',
    paddingLeft: 10,
  },

  phoneContainer: {
    paddingTop:10,
    paddingBottom: 15,
    flexDirection: 'row',
  },
  phoneText: {
    alignSelf: 'center',
    paddingLeft: 10,
  },


  // Order Cards
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    
    elevation: 3,
  },

  orderContainer: {
    flexDirection: 'row',
    height: 75,
    padding: 15,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderBottomColor: 'black',
    marginTop: 10, 
  },

  iconAndTextContainer: {
    flexDirection: 'row',
  },
  iconContainer: {
    height: 45, 
    width: 45,
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'center'
  },
  icon: {
    alignSelf: 'center'
  },
  textContainer: {
    paddingLeft: 10,
    justifyContent: 'center'
  },
  textDateAndTime: {
    paddingBottom: 2,
    color: '#172A55'
  },
  textOrderStatus: {
    fontWeight: 'bold',
    color: '#006994'
  },
  totalAndArrowContainer: {
    paddingLeft: '10%',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  totalContainer: {
    backgroundColor: 'pink',
    marginRight: 10,
    height: 30,
    width: 90,
    borderRadius: 5,
    flexDirection: 'row'
  },
  totalIconContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  totalPriceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    backgroundColor: '#e6f3ff'
  },
  totalPriceText: {
    color: '#172A55',
    fontWeight: 'bold'
  },
  arrowContainer: {
    justifyContent: 'center'
  },

  // Line
  line: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    width: window.width,
    paddingVertical: 5,
  },

  // Contact Details
  contactDetailsContainer: {
    marginTop: 50,
    alignItems: 'center'
  },
  contactDetailsText: {
    fontSize: 16,
    paddingVertical: 3,
  },
})

export default UserProfile;