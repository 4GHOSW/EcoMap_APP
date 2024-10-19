import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
// import {NaverMapView} from '@mj-studio/react-native-naver-map';

function App(): React.JSX.Element {
  return (
    <SafeAreaView className="flex-1">
      {/* <NaverMapView
        onInitialized={() => {
          return console.log('initialized!');
        }}
      /> */}
      <View className="absolute top-5 left-5 right-5 flex-row bg-white rounded-full shadow-md">
        <TouchableOpacity className="flex-1 py-3 px-5">
          <Text className="text-center text-gray-700">출발입니다</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 py-3 px-5">
          <Text className="text-center text-gray-700">도착입니다</Text>
        </TouchableOpacity>
      </View>
      <View className="absolute bottom-0 left-0 right-0 bg-white p-5">
        <Text className="text-center mb-4 text-gray-700">
          로그인 시 절약한 탄소만큼 받을 수 있는 혜택이 있어요!
        </Text>
        <View className="flex-row justify-between">
          <TouchableOpacity className="flex-1 py-3 bg-gray-200 rounded-md mr-2">
            <Text className="text-center text-black">회원가입</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 py-3 bg-blue-500 rounded-md ml-2">
            <Text className="text-center text-white">로그인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default App;
