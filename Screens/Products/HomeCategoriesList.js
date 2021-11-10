import React, { useEffect } from 'react';
import { StyleSheet, Image, View, Text, Pressable, Dimensions, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

var { width } = Dimensions.get('window');

let categories = [
  {
    title: "All Products",
    imageUrl: "https://kaientai-app.s3.eu-west-2.amazonaws.com/categories/all_products.jpg",
    pageName: "ProductsScreen"
  },
  {
    title: "Bathroom",
    imageUrl: "https://kaientai-app.s3.eu-west-2.amazonaws.com/categories/bathroom.jpg",
    pageName: "ProductsBathroomScreen"
  },
  {
    title: "Kitchen",
    imageUrl: "https://kaientai-app.s3.eu-west-2.amazonaws.com/categories/kitchen.jpg",
    pageName: "ProductsKitchenScreen"
  },
  {
    title: "Sets",
    imageUrl: "https://kaientai-app.s3.eu-west-2.amazonaws.com/categories/sets.jpg",
    pageName: "ProductsSetsScreen"
  },
  {
    title: "Beauty",
    imageUrl: "https://kaientai-app.s3.eu-west-2.amazonaws.com/categories/beauty.jpg",
    pageName: "ProductsBeautyScreen"
  },
  {
    title: "Outdoors",
    imageUrl: "https://kaientai-app.s3.eu-west-2.amazonaws.com/categories/outdoors.jpg",
    pageName: "ProductsOutdoorsScreen"
  },
  {
    title: "Soap Bars",
    imageUrl: "https://kaientai-app.s3.eu-west-2.amazonaws.com/categories/soap_bars.jpg",
    pageName: "ProductsSoapBarsScreen"
  },
]


export default function HomeCategoriesList() {
  const navigation = useNavigation();

  const GoToProductsPage = (pageName) => {
    navigation.navigate(pageName, {
      categoryName: pageName.replace('Products', '').replace('Screen', '')
    })
  }

  return (
    <ScrollView style={styles.root}>
      {/* CATEGORIES */}
      <View style={[{flexDirection: 'row'}, styles.row]}>
        <Pressable onPress={() => {GoToProductsPage(categories[0].pageName)}} style={styles.item}>
          <Image source={{uri: categories[0].imageUrl}} style={styles.image} />
          <Text style={styles.text}>{categories[0].title}</Text>
        </Pressable>
        <Pressable onPress={() => {GoToProductsPage(categories[1].pageName)}} style={styles.item}>
          <Image source={{uri: categories[1].imageUrl}} style={styles.image} />
          <Text style={styles.text}>{categories[1].title}</Text>
        </Pressable>
        <Pressable onPress={() => {GoToProductsPage(categories[2].pageName)}} style={styles.item}>
          <Image source={{uri: categories[2].imageUrl}} style={styles.image} />
          <Text style={styles.text}>{categories[2].title}</Text>
        </Pressable>
      </View>
      <View style={[{flexDirection: 'row'}, styles.row]}>
        <Pressable onPress={() => {GoToProductsPage(categories[3].pageName)}} style={styles.item}>
          <Image source={{uri: categories[3].imageUrl}} style={styles.image} />
          <Text style={styles.text}>{categories[3].title}</Text>
        </Pressable>
        <Pressable onPress={() => {GoToProductsPage(categories[4].pageName)}} style={styles.item}>
          <Image source={{uri: categories[4].imageUrl}} style={styles.image} />
          <Text style={styles.text}>{categories[4].title}</Text>
        </Pressable>
        <Pressable onPress={() => {GoToProductsPage(categories[5].pageName)}} style={styles.item}>
          <Image source={{uri: categories[5].imageUrl}} style={styles.image} />
          <Text style={styles.text}>{categories[5].title}</Text>
        </Pressable>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Pressable onPress={() => {GoToProductsPage(categories[6].pageName)}} style={styles.item}>
          <Image source={{uri: categories[6].imageUrl}} style={styles.image} />
          <Text style={styles.text}>{categories[6].title}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  row: {
    justifyContent:'space-between',
  },

  item: {
    padding: 10,
    alignItems:'center'
  },
  image: {
    width: width / 4,
    height: width / 4,
    borderRadius: 10,
  },
  text: {
    paddingTop: 3,
    fontSize: 16,
  },
});