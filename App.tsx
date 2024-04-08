import { Provider } from 'react-redux';
import { Home } from './app/pages'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import store from './app/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView className='flex flex-1'>
        <Home />
      </GestureHandlerRootView>
    </Provider>
  );
}
