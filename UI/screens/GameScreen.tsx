import React, { useState, useRef } from 'react';
import { View, Text, Image, Pressable, Animated, StyleSheet, Dimensions } from 'react-native';

const GameScreen: React.FC = () => {
  const [isLongPressed, setIsLongPressed] = useState(false);
  const [currentY, setCurrentY] = useState(300);
  const faceY = useRef(new Animated.Value(300)).current;
  const faceX = useRef(new Animated.Value(50)).current;
  const currentX = useRef(50);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { width: screenWidth } = Dimensions.get('window');

  const handleLongPress = () => {
    console.log('Long press detected');
    setIsLongPressed(true);
    intervalRef.current = setInterval(() => {
      currentX.current = Math.min(currentX.current + 10, screenWidth - 80);
      Animated.timing(faceX, {
        toValue: currentX.current,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }, 100);
  };

  const handlePressOut = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsLongPressed(false);
  };

  const handlePress = () => {
    const newY = Math.max(currentY - 50, 0);
    Animated.timing(faceY, {
      toValue: newY,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setCurrentY(newY));
  };

  return (
    <View style={styles.container}>
      <Text>Game Screen</Text>
      <Animated.View style={{ position: 'absolute', top: faceY, left: faceX }}>
        <Image source={require('../assets/images/joshua_face.png')} style={{ width: 80, height: 80, borderRadius: 40 }} />
      </Animated.View>

      <Pressable
        onPress={handlePress}
        delayLongPress={500}
        onLongPress={handleLongPress}
        onPressOut={handlePressOut}
        style={{
          position: 'absolute',
          bottom: 50,
          left: '50%',
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: 'rgba(52, 152, 219, 0.8)',
          transform: [{ translateX: -60 }],
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

export default GameScreen;
