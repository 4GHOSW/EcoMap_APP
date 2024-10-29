import AuthStackNavigator from '../stack/AuthStackNavigator';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';
import useAuth from '../../hooks/queries/useAuth';

function RootNavigator() {
  // const {isLogin} = useAuth();
  const isLogin = true; // Test용으로 로그인 제거

  return <>{isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}</>;
}

export default RootNavigator;
