import React, {Component} from 'react';
import { StyleSheet, Image, Dimensions, Pressable } from 'react-native';
import Carousel from 'react-native-anchor-carousel';

const {width: windowWidth} = Dimensions.get('window');

const images = [
  "https://geospatialmedia.s3.amazonaws.com/wp-content/uploads/2019/07/Apple-maps-app.png",
  "https://geospatialmedia.s3.amazonaws.com/wp-content/uploads/2019/07/Apple-maps-app.png",
  "https://geospatialmedia.s3.amazonaws.com/wp-content/uploads/2019/07/Apple-maps-app.png",
];

export default class NumberCarousel extends Component {
  renderItem = ({item, index}) => {
    return (
      <Pressable
        onPress={() => {
          this.numberCarousel.scrollToIndex(index);
        }}>
          <Image  source={{uri: item}} style={{height: 125, width: windowWidth * 0.95}}/>
      </Pressable>
    );
  };

  render() {
    return (
      <Carousel
        style={styles.carousel}
        data={images}
        renderItem={this.renderItem}
        itemWidth={windowWidth * 0.95}
        separatorWidth={0}
        containerWidth={windowWidth}
        ref={c => {
          this.numberCarousel = c;
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  carousel: {
    flexGrow: 0,
    height: 150,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: -11
  },
  item: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 100,
    fontWeight: 'bold',
  },
});
