import { Provider } from 'react-redux';
import { Home, SignIn } from './app/pages'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import store from './app/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView className='flex flex-1'>
        <SignIn />
      </GestureHandlerRootView>
    </Provider>
  );
}
