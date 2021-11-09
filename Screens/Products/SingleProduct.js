import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ImageCarousel from '../../Shared/ImageCarousel';

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState(null);


  return (
    <View style={styles.root}>
      <View style={styles.addToBasketContainer}>
        <Pressable style={styles.addToBasketButton}>
          <Text style={styles.addToBasketButtonText}>Add to Basket</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageCarousel images={item.imagesUrl} price={item.price} title={item.title} />

        {/* Quantity Selector */}
        <View style={styles.quantitySelectorContainer}>
          <Pressable style={styles.minusPlusButton}>
            <Text style={styles.minusPlusButtonText}>-</Text>
          </Pressable>

          <Text style={styles.quantity}>{item.quantity}</Text>

          <Pressable style={styles.minusPlusButton}>
            <Text style={styles.minusPlusButtonText}>+</Text>
          </Pressable>
        </View>

        {/* Details */}
        <View style={styles.detailsContainer}>
          <Text>{item.description}</Text>
          {/* {itemDescriptions.map(desc => (
            <View>
              <Text>
                {desc}
              </Text>
            </View>
          ))} */}
        </View>
      </ScrollView>
     
    </View>
  );
}

export default SingleProduct;

const styles = StyleSheet.create({
  root: {
    padding: 10
  },

  detailsContainer: {
    paddingTop: 30,
    paddingHorizontal: 10,
    paddingBottom: 50,
  },
  addToBasketContainer: {
    marginBottom: -10,
  },
  addToBasketButton: {
    backgroundColor: '#006994',
    marginVertical: 10,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  addToBasketButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },

  quantitySelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    width: 125,
    borderRadius: 5,
    marginLeft: '33%',
    marginTop: 10
  },
  minusPlusButton: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6f3ff',
    opacity: 1,
  },
  minusPlusButtonText: {
    fontSize: 18,
    color: '#000000',
  },
  quantity: {
    color: '#172A55',
  },
})