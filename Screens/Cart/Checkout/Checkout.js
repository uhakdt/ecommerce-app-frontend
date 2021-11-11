import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import axios from "axios";
import { GetDateAndTimeNow } from '../../../auxillary/DateAndTimeNow';
import { connect } from 'react-redux';
import * as actions from "../../../Redux/Actions/cartActions";
import AuthGlobal from "../../../Context/store/AuthGlobal"

const Checkout = (props) =>  {
  const context = useContext(AuthGlobal)
  const [details, setDetails] = useState(props.route.params?.details);
  const [cartItems, setCartItems] = useState([]);
  const [email, setEmail] = useState(props.route.params?.details.email);
  const [totalPrice, setTotalPrice] = useState(null);
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

  useEffect(() => {
    setDetails(props.route.params?.details);
    let cartItemsTemp = []
    for (let i = 0; i < props.cartItems.length; i++) {
      const e = props.cartItems[i];
      let cartItem = {
        title: e.product.route.params.item.title,
        price: e.product.route.params.item.price,
        quantity: e.quantity
      }
      cartItemsTemp.push(cartItem);
    }
    setCartItems(cartItemsTemp);
    cartItemsTemp = []
  }, [props.route.params?.details]);


  useEffect(() => {
    setPrice()
    return () => {
      setTotalPrice()
    }
  }, [props])

  const setPrice = () => {
    let price = 0;
    props.cartItems.forEach(cartItem => {
      price += parseFloat(cartItem.product.route.params.item.price) * parseInt(cartItem.quantity)
    })
    setTotalPrice(parseInt(price * 100))
  }

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`https://kaientai-stripe.herokuapp.com/create-payment-intent/${totalPrice}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete || !email) {
      Alert.alert("Please enter Complete card details and Email");
      return;
    }
    const billingDetails = {
      email: email,
    };
    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        console.log("Unable to process payment: ", error);
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          alert("Payment Successful");
          var headers = {
            "Content-Type": "application/json",
            "Access-Control-Origin": "*"
         }
          console.log("Payment successful ", paymentIntent);
          axios.post('https://kaientai-app-backend.herokuapp.com/api/v1/order', {
            dateAndTime: GetDateAndTimeNow(),
            statusID: 1,
            supplierID: 1,
            userID: context.stateUser.user.userId,
            totalAmount: totalPrice,
            contactName: details.fullName,
            contactEmail: email,
            contactPhone: details.phone,
            address1: details.address1,
            address2: details.address2,
            city: details.city,
            postcode: details.postcode,
            cartProducts: cartItems,
            deliveryInstructions: details.deliveryInstructions,
            status: "Fulfiling Order"
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          props.clearCart()
          props.navigation.navigate("Cart")
        }
      }
    } catch (e) {
      console.log(e);
    }
    //3.Confirm the payment with the card details
  };

  return (
    <View style={styles.container}>
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={cardDetails => {
          setCardDetails(cardDetails);
        }}
      />
      <Button onPress={handlePayPress} title="Pay" disabled={loading} />
    </View>
  );
}

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  input: {
    backgroundColor: "#efefefef",

    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);