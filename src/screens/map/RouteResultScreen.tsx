import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Navigation} from './MapHomeScreen';
import {mapNavigations} from '@/constants';

const RouteResultScreen = () => {
  const currentLocation = '서울특별시 중구 태평로1가';
  const destination = '서울 강서구 마곡동 760-3';

  const navigation = useNavigation<Navigation>();

  const routes = [
    {
      id: '541',
      type: 'bus',
      startStation: '장기역',
      endStation: '강남역',
      carbonEmission: '30mg',
    },
    {
      id: '3',
      type: 'subway',
      startStation: '가산디지털단지역',
      endStation: '잠실역',
      carbonEmission: '30mg',
    },
  ];

  const totalEmission = '900mg';
  const estimatedTime = '50분';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.locationContainer}>
        <View style={styles.locationItem}>
          <Text style={styles.locationLabel}>출발지:</Text>
          <Text style={styles.locationText}>{currentLocation}</Text>
        </View>
        <View style={styles.locationItem}>
          <Text style={styles.locationLabel}>도착지:</Text>
          <Text style={styles.locationText}>{destination}</Text>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={styles.activeTabText}>최소 탄소량</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.inactiveTabText}>최고 탄소량</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.routeContainer}>
        {routes.map((route, index) => (
          <View key={route.id} style={styles.routeItem}>
            <View style={styles.routeHeader}>
              <View style={styles.routeIconContainer}>
                {/* 실제 아이콘으로 교체 필요 */}
                <Text style={styles.routeIcon}>
                  {route.type === 'bus' ? '🚌' : '🚇'}
                </Text>
                <Text style={styles.routeNumber}>
                  {route.type === 'bus' ? route.id : `${route.id}호선`}
                </Text>
              </View>
              <View style={styles.emissionContainer}>
                <Text style={styles.emissionLabel}>탄소배출량:</Text>
                <Text style={styles.emissionValue}>{route.carbonEmission}</Text>
              </View>
            </View>
            <View style={styles.stationContainer}>
              <View style={styles.stationLine} />
              <View style={styles.stationTextContainer}>
                <Text style={styles.stationName}>{route.startStation}</Text>
                <Text style={styles.stationName}>{route.endStation}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>총 탄소 배출량:</Text>
          <Text style={styles.summaryValue}>{totalEmission}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>도착 시간:</Text>
          <Text style={styles.summaryValue}>{estimatedTime}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.routeButton}
          onPress={() => navigation.navigate(mapNavigations.MAP_RESULT)}>
          <Text style={styles.routeButtonText}>경로 보기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginRight: 40,
  },
  locationContainer: {
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  locationItem: {
    marginBottom: 8,
  },
  locationLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 16,
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  inactiveTabText: {
    color: '#666',
  },
  routeContainer: {
    flex: 1,
    padding: 16,
  },
  routeItem: {
    marginBottom: 24,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  routeNumber: {
    fontSize: 18,
    fontWeight: '600',
  },
  emissionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emissionLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
  emissionValue: {
    fontSize: 14,
    color: '#333',
  },
  stationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  stationTextContainer: {
    flexDirection: 'column',
    gap: 30,
  },
  stationLine: {
    width: 2,
    height: 60,
    backgroundColor: '#007AFF',
    marginRight: 12,
  },
  stationName: {
    fontSize: 15,
    color: '#666',
  },
  summaryContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#333',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
  routeButton: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  routeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RouteResultScreen;
