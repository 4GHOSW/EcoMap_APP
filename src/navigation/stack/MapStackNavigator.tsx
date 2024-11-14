import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MapHomeScreen from '@/screens/map/MapHomeScreen';
import {mapNavigations} from '@/constants';
import SearchLocationScreen from '@/screens/map/SearchLocationScreen';
import LocationStartScreen from '@/screens/map/LocationStartScreen';
import LocationEndScreen from '@/screens/map/LocationEndScreen';
import RouteResultScreen from '@/screens/map/RouteResultScreen';
import MapResultScreen from '@/screens/map/MapResultScreen';

export type MapStackParamList = {
  [mapNavigations.MAP_HOME]: undefined;
  [mapNavigations.SEARCH_LOCATION]: undefined;
  [mapNavigations.LOCATION_START]: undefined;
  [mapNavigations.LOCATION_END]: undefined;
  [mapNavigations.ROUTE_RESULT]: undefined;
  [mapNavigations.MAP_RESULT]: undefined;
};

const Stack = createStackNavigator<MapStackParamList>();

function MapStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
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
          headerTitle: 'HOME',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={mapNavigations.SEARCH_LOCATION}
        component={SearchLocationScreen}
        options={{
          headerTitle: '경로 검색',
        }}
      />
      <Stack.Screen
        name={mapNavigations.LOCATION_START}
        component={LocationStartScreen}
        options={{
          presentation: 'modal',
          headerTitle: '시작점 검색',
        }}
      />
      <Stack.Screen
        name={mapNavigations.LOCATION_END}
        component={LocationEndScreen}
        options={{
          presentation: 'modal',
          headerTitle: '종점 검색',
        }}
      />
      <Stack.Screen
        name={mapNavigations.ROUTE_RESULT}
        component={RouteResultScreen}
        options={{
          // presentation: 'modal',
          headerTitle: '경로별 탄소',
        }}
      />
      <Stack.Screen
        name={mapNavigations.MAP_RESULT}
        component={MapResultScreen}
        options={{
          // presentation: 'modal',
          headerTitle: '맵',
        }}
      />
    </Stack.Navigator>
  );
}

export default MapStackNavigator;
