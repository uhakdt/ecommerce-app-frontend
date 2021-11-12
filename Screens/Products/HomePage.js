import React from 'react';
import { View } from 'react-native';

// Components
import HomeCategoriesList from './HomeCategoriesList';
import CheckPostcode from './CheckPostcode';

const HomePage = () => {
  return(
    <View>
      <CheckPostcode />
      <HomeCategoriesList />
    </View>
  )
}

export default HomePage;