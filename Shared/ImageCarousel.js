import React, {useState, useCallback, useRef} from 'react';
import {View, Image, FlatList, useWindowDimensions, StyleSheet, Text} from 'react-native';

const ImageCarousel = ({ images, price, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const windowWidth = useWindowDimensions().width;

  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  }, []);
  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  }
  const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }])
  return (
    <View style={styles.root}>
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.imageContainer} key={item.image}>
            <Image
              style={[styles.image, {width: windowWidth - 40}]}
              source={{uri: item}}
            />
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={windowWidth - 20}
        snapToAlignment={'center'}
        decelerationRate={'fast'}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />

      {/* PRICE AND TITLE TEXT */}
      <View style={styles.priceAndTitleTextContainer}>
        <Text style={styles.priceText}>£{price}</Text>
        <Text style={styles.titleText}>{title}</Text>
      </View>

      {/* DOTS */}
      <View style={styles.dots}>
        {images.map((image, index) => (
          <View key={index}
            style={[
              styles.dot,
              {
                backgroundColor: index === activeIndex ? '#c9c9c9' : '#ededed',
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageCarousel;

const styles = StyleSheet.create({
  root: {
  },
  imageContainer: {
    padding: 10,
  },
  image: {
    height: 250,
    width: 250,
    resizeMode: 'contain',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor: '#ededed',
    borderColor: '#c9c9c9',
    margin: 5,
  },
  // PRICE AND TITLE TEXT
  priceAndTitleTextContainer: {
    alignItems: 'center',
  },
  priceText:{
    fontSize: 32,
    fontWeight: 'bold',
    color: '#172A55',
  },
  titleText:{
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 20,
  }
});