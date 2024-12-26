import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ShoppingListScreen from './screens/ShoppingListScreen';
import SplashScreen from './screens/splashScreen';

export default function App() {
  return (
    <Provider store={store}>
      <ShoppingListScreen />
    </Provider>
  );
}
