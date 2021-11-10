import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Image, Pressable, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import baseURL from '../../../assets/common/baseUrl';

var { width } = Dimensions.get("window");

export default function ProductsSetsScreen({ route }) {
  const { categoryName } = route.params;
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getData = () => {
      axios.get(`${baseURL}products/${categoryName}`)
      .then(function (res) {
        console.log(res)
        setProducts(res.data.data.products);
      })
    }
    getData();
  }, [])
  
  const GoToProductPage = (item) => {
    navigation.navigate("SingleProduct", {
      item: item
    })
  }

  const Item = ({ title, imageUrl, price, item }) => (
    <Pressable onPress={() => GoToProductPage(item)} style={styles.productContainer}>
      <View style={styles.imageContainer}>
        <Image source={{uri: imageUrl}} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.price}>£{price}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
  const renderItem = ({ item }) => (
    <Item title={item.title} imageUrl={item.imageUrl} price={item.price} item={item}/>
  );

  return (
    <SafeAreaView style={styles.container}>
      {products && (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={3}
          horizontal={false}
        />)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%'
  },
  productContainer: {
    width: (width / 3 ),
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: -18
  },
  imageContainer: {
    height: 106,
    width: 106,
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 100,
    width: 100,
  },
  textContainer: {
    paddingTop: 10,
  },
  price: {
    color: "#172A55",
    fontWeight: 'bold',
    paddingBottom: 5,
    fontSize: 16,
  },
  title: {
    fontSize: 12,
  },
});