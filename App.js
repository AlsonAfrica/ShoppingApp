import React, { useEffect, useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import ShoppingListScreen from './screens/ShoppingListScreen';
import SplashScreen from './screens/splashScreen';
import { SafeAreaView, StyleSheet } from 'react-native';



const App = () => {
  const [splashComplete, setSplashComplete] = useState(false);

  const handleSplashComplete = () => {
    setSplashComplete(true);
  };

  // If splash screen hasn't completed, show the SplashScreen
  if (!splashComplete) {
    return <SplashScreen onAnimationComplete={handleSplashComplete} />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.container}>
          <ShoppingListScreen />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  }
});

export default App;