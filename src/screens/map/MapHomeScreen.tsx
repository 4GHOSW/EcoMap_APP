import React, {useEffect, useRef, useState} from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
} from 'react-native';
// import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import useAuth from '@/hooks/queries/useAuth';
import {
  colors,
  GOOGLE_MAP_API_KEY,
  mapNavigations,
  NAVER_CLIENT_ID,
  NAVER_CLIENT_SECRET,
} from '@/constants';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MapStackParamList} from '@/navigation/stack/MapStackNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/navigation/drawer/MainDrawerNavigator';
// import useUserLocation from '@/hooks/useUserLocation';
import WebView from 'react-native-webview';
import Geocoding from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import {useSetRecoilState} from 'recoil';
import {currentAddressState} from '@/atoms/address';
import {Image} from 'react-native';

export type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

Geocoding.init(GOOGLE_MAP_API_KEY);

function MapHomeScreen() {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();
  // location state
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const setCurrentAddress = useSetRecoilState(currentAddressState);

  // 위치 권한 요청
  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        const auth = await Geolocation.requestAuthorization('whenInUse');
        if (auth === 'granted') {
          getCurrentLocation();
        }
      }

      if (Platform.OS === 'android') {
        //
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // 네이버 Reverse Geocoding 사용
  const getAddressFromCoords = async (latitude: number, longitude: number) => {
    try {
      const response = await axios.get(
        'https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc',
        {
          params: {
            coords: `${longitude},${latitude}`,
            output: 'json',
            orders: 'addr,roadaddr', // 주소 및 도로명 주소
          },
          headers: {
            'X-NCP-APIGW-API-KEY-ID': NAVER_CLIENT_ID,
            'X-NCP-APIGW-API-KEY': NAVER_CLIENT_SECRET,
            Accept: 'application/json',
          },
        },
      );

      console.log('API Response: ', response.data); // 응답 확인용

      // 응답 처리
      if (
        response.data.status.code === 0 &&
        response.data.results &&
        response.data.results.length > 0
      ) {
        const result = response.data.results[0];
        let address = '';

        if (result.region) {
          address = `${result.region.area1.name} ${result.region.area2.name} ${result.region.area3.name}`;
        }

        setCurrentAddress(address);
        console.log('address: ', address);
      } else {
        console.log('No results found:', response.data);
        setCurrentAddress('주소를 가져올 수 없습니다.');
      }
    } catch (error) {
      console.error('Reverse Geocoding error:', error);
      setCurrentAddress('주소를 가져올 수 없습니다.');
    }
  };

  // 현재 위치 가져오기
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});
        getAddressFromCoords(latitude, longitude);
        console.log(latitude, longitude);
      },
      error => {
        console.log(error.code, error.message);
        setCurrentAddress('위치를 가져올 수 없습니다.');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const handlePressSearch = () => {
    navigation.navigate(mapNavigations.SEARCH_LOCATION);
  };

  // 반원 그리기
  const totalCarbon = 36800; // Kg
  const progress = 0.7; // 70% progress for the semi-circle

  // Semi-circle progress calculation
  const generateSemiCircle = (progress: any) => {
    const windowWidth = Dimensions.get('window').width;
    const size = windowWidth - 80;
    const center = size / 2;
    const radius = size / 2;
    const angleOffset = Math.PI;
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + Math.PI * progress;

    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);

    const largeArcFlag = progress > 0.5 ? 1 : 0;

    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Navigation Icon */}
      <View style={styles.navigationIcon}>
        {/* Replace with your mascot image */}
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('../../assets/images/logo(final).png')}
        />
      </View>

      {/* Carbon Status Card */}
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.progressContainer}>
            {/* Background Arc */}
            <View style={styles.progressBackground} />
            <View style={styles.progressForeground} />
            <View style={styles.carbonInfo}>
              <Text style={styles.carbonLabel}>총 누적 탄소량</Text>
              <Text style={styles.carbonValue}>
                {totalCarbon.toLocaleString()}Kg
              </Text>
            </View>
          </View>
          <Pressable style={styles.recordButton}>
            <Text style={styles.recordButtonText}>기록보기</Text>
          </Pressable>
        </View>
      </View>

      {/* Ranking Section */}
      <View style={styles.rankingContainer}>
        <View style={styles.rankingHeader}>
          <View style={styles.crownIcon}>
            <Text style={styles.crownText}>👑</Text>
          </View>
          <Text style={styles.rankingTitle}>누적 최고 순위</Text>
        </View>
        <View style={styles.rankingContent}>
          {/* Add your ranking content here */}
          <View style={styles.rankingPlaceholder} />
        </View>
      </View>

      {/* Navigation Button */}
      <Pressable style={styles.navigateButton} onPress={handlePressSearch}>
        <Text style={styles.navigateButtonText}>길찾기 GO!</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F6FF',
  },
  navigationIcon: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cardContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  progressContainer: {
    alignItems: 'center',
    height: 200,
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  progressWrapper: {
    width: 200,
    height: 100,
    position: 'relative',
  },
  progressBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderWidth: 15,
    borderColor: '#E8F0FE',
    borderBottomWidth: 0,
  },
  progressForeground: {
    position: 'absolute',
    width: '100%',
    height: '70%',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderWidth: 15,
    borderColor: '#007AFF',
    borderBottomWidth: 0,
    // 프로그레스 정도에 따라 분할
    // clipPath 속성을 사용할 수 있다면 더 정교한 제어 가능
    // height: '70%',
  },
  carbonInfo: {
    marginTop: 30,
    alignItems: 'center',
  },
  carbonLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  carbonValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  recordButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  recordButtonText: {
    fontSize: 14,
    color: '#666',
  },
  rankingContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  rankingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  crownIcon: {
    marginRight: 8,
  },
  crownText: {
    fontSize: 20,
  },
  rankingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  rankingContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    height: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rankingPlaceholder: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  navigateButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#007AFF',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  navigateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MapHomeScreen;
