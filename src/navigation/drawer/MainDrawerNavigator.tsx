import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {NavigatorScreenParams} from '@react-navigation/native';

import FindHomeScreen from '@/screens/find/FindHomeScreen';
import MapStackNavigator, {MapStackParamList} from '../stack/MapStackNavigator';
import {mainNavigations, queryKeys, storageKeys} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import {Button, StyleSheet, View} from 'react-native';
import {removeEncryptStorage, removeHeader} from '@/utils';
import queryClient from '@/api/queryClient';

export type MainDrawerParamList = {
  [mainNavigations.HOME]: NavigatorScreenParams<MapStackParamList>;
  [mainNavigations.FIND]: undefined;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const {logoutMutation} = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate(null);
    // 테스트용
    // removeHeader('Authorization');
    // removeEncryptStorage(storageKeys.REFRESH_TOKEN);
    // queryClient.invalidateQueries({queryKey: [queryKeys.AUTH]});
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.logoutContainer}>
        <Button title="로그아웃" onPress={handleLogout} />
      </View>
    </View>
  );
}

function MainDrawerNavigator() {
  return (
    <>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: 'front',
        }}>
        <Drawer.Screen
          name={mainNavigations.HOME}
          component={MapStackNavigator}
          options={{
            title: '홈',
          }}
        />
        <Drawer.Screen
          name={mainNavigations.FIND}
          component={FindHomeScreen}
          options={{
            title: '경로',
          }}
        />
      </Drawer.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // 전체 공간을 차지하도록
    justifyContent: 'space-between', // 컨텐츠와 로그아웃 버튼 사이 공간 분배
  },
  logoutContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    // 스크롤과 관계없이 항상 하단에 고정
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
  },
});

export default MainDrawerNavigator;
