import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { View } from 'react-native';
import BottomTab from './components/BottomTab';

const App = () => {
  return (
    <View className="flex-1 justify-center p-0">
      <NavigationContainer>
        <BottomTab/>
      </NavigationContainer>
    </View>
  );
};

export default App;