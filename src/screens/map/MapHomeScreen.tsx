import React, {useEffect, useRef, useState} from 'react';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
// import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

export type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

Geocoding.init(GOOGLE_MAP_API_KEY);

function MapHomeScreen() {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();
  // location state
  // ToDo: Recoil에 현재 위치 저장 필요
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

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <>
      <WebView
        source={{
          uri: 'https://www.google.co.kr/maps/place/%EB%8F%84%EC%BF%84+%EB%94%94%EC%A6%88%EB%8B%88%EC%94%A8/@35.6267151,139.882503,17z/data=!3m1!4b1!4m6!3m5!1s0x60187d03114737b3:0x41471d704ab72d25!8m2!3d35.6267108!4d139.8850779!16zL20vMDRjN3R0?hl=ko&entry=ttu&g_ep=EgoyMDI0MTAyNy4wIKXMDSoASAFQAw%3D%3D',
        }}
      />

      {/* 검색 영역 */}
      <View style={[styles.searchContainer, {top: inset.top || 20}]}>
        <View style={styles.searchInput}>
          <Pressable
            style={styles.menuButton}
            onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu" color={colors.BLACK} size={25} />
          </Pressable>
          <Pressable style={styles.inputPressable} onPress={handlePressSearch}>
            <Text style={styles.searchPlaceholder}>
              탄소가 적은 길안내를 시작해보세요!
            </Text>
          </Pressable>
        </View>
        <Pressable style={styles.searchButton} onPress={handlePressSearch}>
          <View style={styles.searchButtonInner}>
            <Ionicons name="navigate" color={colors.WHITE} size={20} />
            <Text style={styles.searchButtonText}>길찾기</Text>
          </View>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    left: 15,
    right: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    backgroundColor: colors.WHITE,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    elevation: 2,
  },
  menuButton: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputPressable: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  searchPlaceholder: {
    color: colors.GRAY_500,
    fontSize: 14,
  },
  searchButton: {
    backgroundColor: colors.PRIMARY,
    height: 48,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: 'center',
    shadowColor: colors.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    elevation: 2,
  },
  searchButtonInner: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
  },
  searchButtonText: {
    color: colors.WHITE,
    fontSize: 13,
    fontWeight: '600',
  },
});

export default MapHomeScreen;
