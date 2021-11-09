import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';

// Components
import ProductList from './ProductList';

const data = require('../../dummyData/products.json');

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(data);

    return () => {
      setProducts([])
    }
  }, [])

  return(
    <View>
      <Text></Text>
      <View>
        <FlatList
          horizontal
          data={products}
          renderItem={({item}) => 
            <ProductList 
              navigation={props.navigation}
              key={item.id}
              item={item}
            />
          }
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  )
}

export default ProductContainer;