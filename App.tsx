import React from 'react';
import {QueryClientProvider} from '@tanstack/react-query';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigation/root/RootNavigator';
import queryClient from './src/api/queryClient';
import Toast from 'react-native-toast-message';
import {RecoilRoot} from 'recoil';

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <NavigationContainer>
          <RootNavigator />
          <Toast />
        </NavigationContainer>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
