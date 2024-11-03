import {endLocationAddressState} from '@/atoms/address';
import {colors, mapNavigations} from '@/constants';
import {RegionInfo} from '@/hooks/useSearchLocation';
import {Navigation} from '@/screens/map/MapHomeScreen';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, Pressable, ScrollView, Text} from 'react-native';
import {StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import {useSetRecoilState} from 'recoil';

interface SearchRegionResultProps {
  regionInfo: RegionInfo[];
}

function SearchRegionResult({regionInfo}: SearchRegionResultProps) {
  const navigation = useNavigation<Navigation>();
  const setEndLocationAddressState = useSetRecoilState(endLocationAddressState);

  const handlePressRegionInfo = (
    latitude: string,
    longitude: string,
    address: string,
  ) => {
    const regionLocation = {
      latitude: Number(latitude),
      longitude: Number(longitude),
    };

    console.log(regionLocation, address); // ToDo: x, y 외에 주소를 저장하고 세진이한테 주소 보내기
    setEndLocationAddressState(address);
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
            onPress={() =>
              handlePressRegionInfo(info.y, info.x, info.address_name)
            }>
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
