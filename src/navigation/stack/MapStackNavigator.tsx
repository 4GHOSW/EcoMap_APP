import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MapHomeScreen from '@/screens/map/MapHomeScreen';
import {mapNavigations} from '@/constants';
import SearchLocationScreen from '@/screens/map/SearchLocationScreen';

export type MapStackParamList = {
  [mapNavigations.MAP_HOME]: undefined;
  [mapNavigations.SEARCH_LOCATION]: undefined;
};

const Stack = createStackNavigator<MapStackParamList>();

function MapStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          shadowColor: 'gray',
          backgroundColor: 'white',
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: 'black',
      }}>
      <Stack.Screen
        name={mapNavigations.MAP_HOME}
        component={MapHomeScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={mapNavigations.SEARCH_LOCATION}
        component={SearchLocationScreen}
        options={{
          presentation: 'modal',
          headerTitle: '경로 검색',
        }}
      />
    </Stack.Navigator>
  );
}

export default MapStackNavigator;
