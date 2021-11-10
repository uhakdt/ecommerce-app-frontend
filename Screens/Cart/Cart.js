import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, Button, TouchableOpacity, Pressable, ScrollView } from 'react-native';

import { connect } from 'react-redux';
import * as actions from "../../Redux/Actions/cartActions";
import Icon from 'react-native-vector-icons/FontAwesome';

var { width } = Dimensions.get("window");

const Cart = (props) => {
  const [productUpdate, setProductUpdate] = useState()
  const [totalPrice, setTotalPrice] = useState()

  useEffect(() => {
    getProducts()
    return () => {
      setProductUpdate()
      setTotalPrice()
    }
  }, [props])

  const getProducts = () => {
    setProductUpdate(props.cartItems)
    let price = 0;
    props.cartItems.forEach(cartItem => {
      price += parseFloat(cartItem.product.route.params.item.price) * parseInt(cartItem.quantity)
    })
    setTotalPrice(price)
  }

  return (
    <View style={styles.root}>
      {props.cartItems && (
        <Pressable style={styles.continueContainer}>
          <View style={styles.continueTextContainer}>
            <Text style={styles.continueText}>Continue</Text>
          </View>
          <View style={styles.continuePriceContainer}>
            {totalPrice > 0 ? (<Text style={styles.continuePrice}>£{totalPrice.toFixed(2)}</Text>) : (<Text></Text>)}
          </View>
        </Pressable>
      )}
      <ScrollView style={styles.listOfBasketItems} showsVerticalScrollIndicator={false}>
        {props.cartItems && props.cartItems.map((cartItem, index) => {
          return (
            <View key={index}>
              <View>
                <View style={styles.orderItemContainer}>

                  {/* Image and Text */}
                  <View style={styles.imageAndTextContainer}>
                    <View style={styles.imageContainer}>
                      <Image source={{ uri: cartItem.product.route.params.item.imageUrl }} style={styles.image} />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.textPrice}>£{cartItem.product.route.params.item.price}</Text>
                      <Text>{cartItem.product.route.params.item.title}</Text>
                    </View>
                  </View>

                  {/* Quantity Selector */}
                  <View>
                    <View style={styles.quantitySelectonContainer}>
                      <Pressable onPress={() => props.takeAwayItemFromCart(cartItem)} style={[styles.button, styles.buttonMinus]}>
                        <Text style={styles.butonText}>-</Text>
                      </Pressable>

                      <View style={styles.quantityContainer}>
                        <Text style={styles.quantity}>{cartItem.quantity}</Text>
                      </View>

                      <Pressable onPress={() => props.addItemToCart(cartItem)} style={[styles.button, styles.buttonPlus]}>
                        <Text style={styles.butonText}>+</Text>
                      </Pressable>
                    </View>
                    <View style={styles.removeCartItemContainer}>
                      <Pressable onPress={() => props.removeFromCart(cartItem)}>
                        <Icon name="trash-o" color={'black'} size={20} />
                      </Pressable>
                    </View>
                  </View>
                </View>

                {/* Line */}
                {cartItem.product.length - 1 !== index ? (
                  <View style={styles.lineContainer}>
                    <View style={styles.line}></View>
                  </View>
                ) : <View style={styles.bottomSpacing}></View>}
              </View>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) => dispatch(actions.addToCart(product)),
    takeAwayItemFromCart: (product) => dispatch(actions.takeAwayFromCart(product)),
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item))
    }
}

const styles = StyleSheet.create({
  root: {
    marginBottom: 28,
  },

  // Continue Container
  continueContainer: {
    marginTop: 10,
    marginHorizontal: 10,
    height: 55,
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  continueTextContainer: {
    width: '70%',
    backgroundColor: '#172A55',
    height: 55,
    justifyContent: 'center',
    borderRadius: 10,
  },
  continueText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  continuePriceContainer: {
    width: '30%',
    backgroundColor: 'white',
    height: 55,
    justifyContent: 'center'
  },
  continuePrice: {
    textAlign: 'center',
    color: '#172A55',
    fontSize: 18,
    fontWeight: 'bold'
  },


  listOfBasketItems: {
    padding: 10,
  },
  orderItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  // Image and Text
  imageAndTextContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageContainer: {

  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 15,
  },
  textContainer: {
    width: 150,
    paddingLeft: 10,
  },
  textPrice: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#172A55',
    paddingBottom: 5,
  },

  // Quantity
  quantityContainer: {
    backgroundColor: '#e6f3ff',
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,

  },
  quantityText: {
    fontSize: 18,
    color: '#172A55',
  },

  // Line
  lineContainer: {
    paddingVertical: 20,
  },
  line: {
    borderBottomWidth: 1,
    width: window.width,
    borderColor: 'lightgrey'
  },
  bottomSpacing: {
    marginBottom: 50,
  },

  // Quantity Selector
  quantitySelectonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgrey',
    height: 40,
    borderRadius: 10,
    alignSelf: 'center',
  },

  // + and - Buttons
  button: {
    width: 35,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    opacity: 1,
  },
  butonText: {
    fontSize: 18,
    color: '#000000',
  },
  buttonMinus: {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  buttonPlus: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  // Number
  quantityContainer: {
    width: 35,
    backgroundColor: '#172A55',
    height: 38,
    justifyContent: 'center',
  },
  quantity: {
    color: 'white',
    textAlign: 'center',
  },

  // Remove Cart Item
  removeCartItemContainer: {
    position: 'absolute',
    bottom: -30,
    right: 10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
