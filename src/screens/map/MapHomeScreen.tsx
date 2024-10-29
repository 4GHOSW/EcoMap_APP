import React, {useRef} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
// import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import useAuth from '@/hooks/queries/useAuth';
import {colors, mapNavigations} from '@/constants';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MapStackParamList} from '@/navigation/stack/MapStackNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/navigation/drawer/MainDrawerNavigator';
// import useUserLocation from '@/hooks/useUserLocation';
import WebView from 'react-native-webview';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function MapHomeScreen() {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();

  const handlePressSearch = () => {
    navigation.navigate(mapNavigations.SEARCH_LOCATION);
  };

  return (
    <>
      <WebView
        source={{
          uri: 'https://naver.com',
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
