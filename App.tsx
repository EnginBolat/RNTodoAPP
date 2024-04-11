import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ForgotPassword, Home, SignIn, VerifyCodeOTP } from './app/pages';
import { Provider } from 'react-redux';
import store from './app/redux/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthStack } from './app/stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView className='flex flex-1'>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='AuthStack'>
            <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;