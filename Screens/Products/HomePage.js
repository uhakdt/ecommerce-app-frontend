import React from 'react';
import { View } from 'react-native';

// Components
import HomeCategoriesList from './HomeCategoriesList';
import HomeBanner from './HomeBanner';

const HomePage = () => {
  return(
    <View>
      <HomeBanner />
      <HomeCategoriesList />
    </View>
  )
}

export default HomePage;