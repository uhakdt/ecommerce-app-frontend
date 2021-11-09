import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';

// Components
import ProductList from './ProductList';

const data = require('../../dummyData/products.json');

const ProductContainer = () => {
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
              key={item.id}
              item={item}
            />
          }
          keyExtractor={item => item.title}
        />
      </View>
    </View>
  )
}

export default ProductContainer;