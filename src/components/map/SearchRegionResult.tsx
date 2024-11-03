import {endLocationAddressState} from '@/atoms/address';
import {SearchHistory, searchHistoryState} from '@/atoms/searchHistory';
import {colors, mapNavigations} from '@/constants';
import {RegionInfo} from '@/hooks/useSearchLocation';
import {Navigation} from '@/screens/map/MapHomeScreen';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, Pressable, ScrollView, Text} from 'react-native';
import {StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import {useRecoilState, useSetRecoilState} from 'recoil';

interface SearchRegionResultProps {
  regionInfo: RegionInfo[];
}

function SearchRegionResult({regionInfo}: SearchRegionResultProps) {
  const navigation = useNavigation<Navigation>();
  const setEndLocationAddressState = useSetRecoilState(endLocationAddressState);
  const [searchHistory, setSearchHistory] = useRecoilState(searchHistoryState);

  const handlePressRegionInfo = (info: RegionInfo) => {
    const regionLocation = {
      latitude: Number(info.y),
      longitude: Number(info.x),
    };

    // 새로운 검색 기록 생성
    const newHistory: SearchHistory = {
      id: info.id,
      name: info.place_name,
      address: info.address_name,
      distance: `${(Number(info.distance) / 1000).toFixed(2)}km`,
      path: info.category_name,
      latitude: regionLocation.latitude,
      longitude: regionLocation.longitude,
    };

    // 중복 검색 기록 제거 및 최신 기록을 맨 앞에 추가
    setSearchHistory(prev => {
      const filtered = prev.filter(item => item.id !== info.id);
      return [newHistory, ...filtered].slice(0, 5); // 최대 5개까지만 저장
    });

    setEndLocationAddressState(info.address_name);
    navigation.navigate(mapNavigations.SEARCH_LOCATION);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator
        indicatorStyle="black"
        contentContainerStyle={styles.scrollContainer}>
        {regionInfo.map((info, index) => (
          <Pressable
            key={info.id}
            style={[
              styles.itemBorder,
              index === regionInfo.length - 1 && styles.noItemBorder,
            ]}
            onPress={() => handlePressRegionInfo(info)}>
            <View style={styles.placeNameContainer}>
              <Ionicons name="location" size={20} color={colors.PRIMARY} />
              <Text
                style={styles.placeText}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {info.place_name}
              </Text>
            </View>
            <View style={styles.categoryContainer}>
              <Text style={styles.distanceText}>
                {(Number(info.distance) / 1000).toFixed(2)}km
              </Text>
              <Text style={styles.subInfoText}>{info.category_name}</Text>
            </View>
            <Text style={styles.subInfoText}>{info.road_address_name}</Text>
          </Pressable>
        ))}

        {regionInfo.length === 0 && (
          <View style={styles.noResultContainer}>
            <Text style={styles.noResultText}>검색 결과가 없습니다.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    borderRadius: 5,
    height: Dimensions.get('screen').height / 2,
    marginVertical: 5,
    width: '100%',
  },
  scrollContainer: {
    padding: 10,
  },
  placeNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  placeText: {
    color: colors.BLACK,
    flexShrink: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  categoryContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  distanceText: {
    color: colors.BLACK,
  },
  subInfoText: {
    flexShrink: 1,
    color: colors.GRAY_500,
  },
  itemBorder: {
    marginHorizontal: 5,
    paddingVertical: 10,
    borderBottomColor: colors.GRAY_300,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 3,
  },
  noItemBorder: {
    borderBottomWidth: 0,
  },
  noResultContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  noResultText: {
    color: colors.GRAY_500,
    fontSize: 16,
  },
});

export default SearchRegionResult;
