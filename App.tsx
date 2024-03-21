import { Home } from './app/pages'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView className='flex flex-1'>
      <Home />
    </GestureHandlerRootView>
  );
}
