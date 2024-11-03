import {colors, mapNavigations} from '@/constants';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Navigation} from './MapHomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useRecoilValue} from 'recoil';
import {currentAddressState, endLocationAddressState} from '@/atoms/address';

// 최근 검색 기록 더미 데이터
const recentSearches = [
  {
    id: 1,
    name: '스타벅스 영등포 신길점',
    address: '서울시 영등포구 신길동 000-000',
    distance: '2.0km',
    path: '음식점 > 카페 > 커피전문점 > 스타벅스',
  },
  {
    id: 2,
    name: '스타벅스 영등포 신길점',
    address: '서울시 영등포구 신길동 000-000',
    distance: '2.0km',
    path: '음식점 > 카페 > 커피전문점 > 스타벅스',
  },
  {
    id: 3,
    name: '스타벅스 영등포 신길점',
    address: '서울시 영등포구 신길동 000-000',
    distance: '2.0km',
    path: '음식점 > 카페 > 커피전문점 > 스타벅스',
  },
];

function SearchLocationScreen() {
  const currentAddress = useRecoilValue(currentAddressState);
  const endLocationAddress = useRecoilValue(endLocationAddressState);
  const navigation = useNavigation<Navigation>();

  const handlePressStartLocationSearch = () => {
    // 시작지 선택 개발 보류
    // navigation.navigate(mapNavigations.LOCATION_START);
  };

  const handlePressEndLocationSearch = () => {
    navigation.navigate(mapNavigations.LOCATION_END);
  };

  const handlePressSearch = () => {
    // navigation.navigate(mapNavigations.ROUTE_SEARCH);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.searchBox}>
          <View style={styles.iconContainer}>
            <View style={styles.startIcon} />
            <View style={styles.verticalLine} />
            <View style={styles.endIcon} />
          </View>
          <View style={styles.inputsContainer}>
            <Pressable
              style={styles.inputPressable}
              onPress={handlePressStartLocationSearch}>
              <Text
                style={[
                  styles.searchPlaceholder,
                  currentAddress !== '현재 위치 가져오는 중...' &&
                    styles.activeText,
                ]}>
                {currentAddress !== '현재 위치 가져오는 중...'
                  ? '내 위치: ' + currentAddress
                  : '시작지를 검색하세요'}
              </Text>
            </Pressable>
            <View style={styles.horizontalLine} />
            <Pressable
              style={styles.inputPressable}
              onPress={handlePressEndLocationSearch}>
              <Text
                style={[
                  styles.searchPlaceholder,
                  endLocationAddress !== '' && styles.activeText,
                ]}>
                {endLocationAddress || '도착지를 검색하세요'}
              </Text>
            </Pressable>
          </View>
          <Pressable
            style={({pressed}) => [
              pressed ? styles.searchButtonPressed : styles.searchButton,
            ]}
            onPress={handlePressSearch}>
            <Ionicons name="navigate" color={colors.WHITE} size={20} />
            <Text style={styles.searchButtonText}>길찾기</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.recentSearchContainer}>
        <Text style={styles.recentSearchTitle}>최근 검색어</Text>
        <ScrollView>
          {recentSearches.map(item => (
            <Pressable key={item.id} style={styles.searchItem}>
              <Ionicons name="location" size={20} color={colors.PRIMARY} />
              <View style={styles.searchItemContent}>
                <Text style={styles.searchItemTitle}>{item.name}</Text>
                <Text style={styles.searchItemPath}>{item.path}</Text>
                <Text style={styles.searchItemDistance}>
                  {item.distance} · {item.address}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY_200,
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.GRAY_300,
  },
  iconContainer: {
    width: 40,
    paddingVertical: 12,
    alignItems: 'center',
  },
  startIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.BLUE_500,
  },
  endIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.RED_500,
  },
  verticalLine: {
    width: 1,
    height: 28,
    backgroundColor: colors.GRAY_300,
    marginVertical: 4,
  },
  inputsContainer: {
    flex: 1,
    marginRight: 12,
  },
  inputPressable: {
    height: 40,
    justifyContent: 'center',
  },
  horizontalLine: {
    height: 1,
    backgroundColor: colors.GRAY_300,
  },
  searchPlaceholder: {
    color: colors.GRAY_500,
    fontSize: 14,
  },
  activeText: {
    color: colors.BLACK,
  },
  searchButton: {
    backgroundColor: colors.BLUE_500,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    marginRight: -1,
    gap: 4,
  },
  searchButtonPressed: {
    backgroundColor: colors.BLUE_400,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    marginRight: -1,
    gap: 4,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  recentSearchContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  recentSearchTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20,
    paddingBottom: 10,
  },
  searchItem: {
    flexDirection: 'row',
    padding: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY_200,
  },
  searchItemContent: {
    marginLeft: 12,
    flex: 1,
  },
  searchItemTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  searchItemPath: {
    fontSize: 13,
    color: colors.GRAY_700,
    marginBottom: 4,
  },
  searchItemDistance: {
    fontSize: 13,
    color: colors.GRAY_500,
  },
});

export default SearchLocationScreen;
