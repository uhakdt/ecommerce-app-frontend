import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ImageCarousel from '../../Shared/ImageCarousel';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState(null);

  const itemDescriptions = item.description.split("%-%");

  return (
    <View style={styles.root}>
      <View style={styles.addToBasketContainer}>
        <Pressable 
          onPress={() => { props.addItemToCart(props) }} 
          style={styles.addToBasketButton}>
          <Text style={styles.addToBasketButtonText}>Add to Basket</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageCarousel images={item.imagesUrl} price={item.price} title={item.title} />

        {/* Details */}
        <View style={styles.detailsContainer}>
          {itemDescriptions.map(desc => (
            <View key={desc}>
              <Text>
                {desc}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
     
    </View>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
      addItemToCart: (product) => 
          dispatch(actions.addToCart({quantity: 1, product}))
  }
}

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

export default connect(null, mapDispatchToProps)(SingleProduct);