import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, Pressable, Animated, StyleSheet, Dimensions } from 'react-native';
import { Audio } from 'expo-av';

const GameScreen: React.FC = () => {
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const faceSize = 80;
const bottomY = screenHeight - 140; // Adjusted to prevent bottom clipping (faceSize + 40px margin)
const gravity = 0.5;
const velocityX = 2;
  const faceY = useRef(new Animated.Value(bottomY)).current;
  const faceX = useRef(new Animated.Value(50)).current;
  const currentX = useRef(50);
  const currentYRef = useRef<number>(bottomY);
  const velocityYRef = useRef<number>(0);
const isDashingRef = useRef<boolean>(false);
const isLongPressingRef = useRef<boolean>(false);
const animationRef = useRef<number | null>(null);

  const bounceSound = useRef<Audio.Sound | null>(null);
  const dashSound = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    const loadSounds = async () => {
      const [{ sound: bounce }, { sound: dash }] = await Promise.all([
        Audio.Sound.createAsync(
          require('../assets/audio/bounce.mp3'),
          { shouldPlay: false }
        ),
        Audio.Sound.createAsync(
          require('../assets/audio/dash.mp3'),
          { shouldPlay: false }
        )
      ]);
      bounceSound.current = bounce;
      dashSound.current = dash;
    };

    loadSounds();

    const gameLoop = () => {
      // Vertical screen boundary clamping
      // Edit bottomY or top (0) here to adjust vertical limits (bottomY adjusted for margin)
      velocityYRef.current += isLongPressingRef.current ? gravity / 50 : gravity;
      let newY = currentYRef.current + velocityYRef.current;
      if (newY > bottomY) {
        newY = bottomY;
        velocityYRef.current = 0;
      }
      if (newY < 0) {
        newY = 0;
        velocityYRef.current = 0;
      }
      currentYRef.current = newY;
      faceY.setValue(newY);

      // Horizontal screen boundary clamping (during dash)
      // Edit screenWidth - faceSize or left (0) here to adjust horizontal limits
      if (isDashingRef.current) {
        let newX = currentX.current + velocityX;
        currentX.current = Math.max(0, Math.min(newX, screenWidth - faceSize));
        faceX.setValue(currentX.current);
      }

      animationRef.current = requestAnimationFrame(gameLoop);
    };
    animationRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      bounceSound.current?.unloadAsync();
      dashSound.current?.unloadAsync();
    };
  }, []);

const handleLongPress = () => {
  console.log('Long press detected');
  isDashingRef.current = true;
  isLongPressingRef.current = true;

  dashSound.current?.setIsLoopingAsync(true);
  dashSound.current?.replayAsync();
};

const handlePressOut = () => {
  isDashingRef.current = false;
  isLongPressingRef.current = false;

  dashSound.current?.stopAsync();
};

  const handlePress = () => {
    velocityYRef.current = -10;
    bounceSound.current?.replayAsync();
  };

  return (
    <View style={styles.container}>
      <Text>Game Screen</Text>
      <Animated.View style={{ position: 'absolute', top: faceY, left: faceX }}>
        <Image source={require('../assets/images/joshua_face.png')} style={{ width: 80, height: 80, borderRadius: 40 }} />
      </Animated.View>

      <Pressable
        onPress={handlePress}
        // Adjust the long press duration here (in milliseconds)
        delayLongPress={150}
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
