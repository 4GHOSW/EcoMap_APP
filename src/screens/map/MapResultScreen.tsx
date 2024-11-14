import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';

// Stack parameter list type definition
type MapRouteStackParamList = {
  MapRoute: undefined;
};

type MapRouteScreenNavigationProp = StackNavigationProp<
  MapRouteStackParamList,
  'MapRoute'
>;

// Props interface
interface MapRouteScreenProps {
  navigation: MapRouteScreenNavigationProp;
}

const MapResultScreen: React.FC<MapRouteScreenProps> = () => {
  const navigation = useNavigation<MapRouteScreenNavigationProp>();

  return (
    <View style={styles.container}>
      {/* WebView for Map */}
      <WebView
        source={{
          uri: 'https://ec0map.store/?client_id=o36syaxz8i&client_secret=CUrr1eBBRD899k6CtHTi1bGQE7fsEjy6tRnOj1ne&skt_apikey=I2slsBzzSW2LtdLUdubJyaKKBjrYqgMh4aLusrFZ&start=%ED%85%8C%ED%97%A4%EB%9E%80%EB%A1%9C5%EA%B8%B8%207&end=%EA%B9%80%ED%8F%AC%ED%95%9C%EA%B0%952%EB%A1%9C%20168',
        }}
        style={styles.webview}
      />

      {/* Overlay Content */}
      <View style={styles.overlay}>
        {/* Carbon Emission Badge */}
        <View style={styles.emissionBadge}>
          <Text style={styles.emissionText}>
            총 탄소 배출량: <Text style={styles.emissionValue}>900mg</Text>
          </Text>
        </View>

        {/* Bottom Button */}
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => {
            // Handle route selection
            console.log('Route selected');
          }}>
          <Text style={styles.bottomButtonText}>이 경로 최종 선택</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  webview: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'box-none',
  },
  emissionBadge: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 80 : 40,
    left: '47%',
    transform: [{translateX: -75}],
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  emissionText: {
    fontSize: 14,
    color: '#333',
  },
  emissionValue: {
    color: '#FF0000',
    fontWeight: 'bold',
  },
  bottomButton: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  bottomButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MapResultScreen;
