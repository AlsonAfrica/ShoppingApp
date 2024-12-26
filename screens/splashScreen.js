import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

const SplashScreen = ({ onAnimationComplete }) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Wait for a moment (use timing with duration 0 as a delay)
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onAnimationComplete();
    });
  }, [fadeAnim, onAnimationComplete]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image 
        source={require('../assets/iconSplash.png')} 
        style={styles.logo} 
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
