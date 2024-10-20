import React from 'react';
import {View, Text, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigation';

type LoginScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-6">
        <View className="items-center mb-8">
          <Text className="text-3xl font-bold mb-2">탄소가 적은 길을 찾아</Text>
          <Text className="text-3xl font-bold">친환경 길찾기</Text>
        </View>

        <TouchableOpacity className="bg-yellow-400 rounded-md py-4 mb-4 flex-row items-center justify-center">
          <Image
            source={require('../../assets/kakao-icon.png')}
            className="w-6 h-6 mr-2"
          />
          <Text className="text-black font-semibold">카카오 로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-white border border-gray-300 rounded-md py-4 mb-8 flex-row items-center justify-center">
          <Image
            source={require('../../assets/google-icon.png')}
            className="w-6 h-6 mr-2"
          />
          <Text className="text-black font-semibold">Google 로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="self-center"
          onPress={() => navigation.goBack()}>
          <Text className="text-gray-500">뒤로 가기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
