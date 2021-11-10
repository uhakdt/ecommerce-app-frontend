import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import ProductCard from './ProductCard';

var { width } = Dimensions.get("window");

const ProductList = (props) => {
  const { item } = props;

  return (
    <TouchableOpacity 
      style={{width: '50%'}}
      onPress={() => 
        props.navigation.navigate("SingleProduct", { item: item})
      }
    >
      <View style={{width: width/2,backfaceVisibility: 'gainsboro'}}>
        <ProductCard {...item} /> 
      </View>
    </TouchableOpacity>
  )
}

export default ProductList;