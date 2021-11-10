import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { connect } from "react-redux";

const CartIcon = (props) => {
  return (
    <>
      {props.cartItems.length ? (
        <View style={styles.badge}>
          <Text style={styles.text}>{props.cartItems.length}</Text>
        </View>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const styles = StyleSheet.create({
  badge: {
    width: 25,
    borderRadius: 12.5,
    backgroundColor: '#C02F1D',
    position: "absolute",
    top: -2,
    right: -15,
  },
  text: {
    fontSize: 16,
    width: 100,
    fontWeight: "bold",
    marginLeft: 7,
    color: 'white'
  },
});

export default connect(mapStateToProps)(CartIcon);
