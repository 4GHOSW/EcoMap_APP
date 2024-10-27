import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from '../types/navigation';
import WebView from 'react-native-webview';

type HomeScreenProps = {
  navigation: {
    navigate: (screen: keyof RootStackParamList) => void;
  };
};

const HomeScreen = ({navigation}: HomeScreenProps) => {
  return (
    <SafeAreaView className="flex-1">
      <WebView
        source={{
          uri: 'http://partir.cafe24.com:8000/?client_id=o36syaxz8i&client_secret=CUrr1eBBRD899k6CtHTi1bGQE7fsEjy6tRnOj1ne',
          // uri: "https://naver.com",
        }}
      />
      <View className="absolute top-5 left-5 right-5 flex-row bg-white rounded-full shadow-md">
        <TouchableOpacity className="flex-1 py-3 px-5">
          <Text className="text-center text-gray-700">출발:</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 py-3 px-5">
          <Text className="text-center text-gray-700">도착:</Text>
        </TouchableOpacity>
      </View>
      <View className="absolute bottom-0 left-0 right-0 bg-white p-5">
        <Text className="text-center mb-4 text-gray-700">
          절약한 탄소량: 000
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
