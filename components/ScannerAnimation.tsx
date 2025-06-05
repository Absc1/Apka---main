import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Easing } from 'react-native';

interface ScannerAnimationProps {
  scanning: boolean;
}

export default function ScannerAnimation({ scanning }: ScannerAnimationProps) {
  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (scanning) {
      // Reset animation values
      scanLineAnim.setValue(0);
      opacityAnim.setValue(1);
      
      // Start the animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      // Fade out the animation when not scanning
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

    // Clean up animation when component unmounts
    return () => {
      scanLineAnim.stopAnimation();
      opacityAnim.stopAnimation();
    };
  }, [scanning]);

  const translateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 250],
  });

  return (
    <Animated.View style={[styles.container, { opacity: opacityAnim }]}>
      <Animated.View
        style={[
          styles.scanLine,
          {
            transform: [{ translateY }],
          },
        ]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scanLine: {
    height: 2,
    width: '100%',
    backgroundColor: '#007AFF',
  },
});