import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, Pressable, Animated, Easing, StyleSheet, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import Pipe from '../components/Pipe';

const GameScreen: React.FC = () => {
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const faceSize = 80;
const bottomY = screenHeight - 140; // Adjusted to prevent bottom clipping (faceSize + 40px margin)
const gravity = 0.5;
const pipeWidth = 80;
const gapHeight = 250;
const basePipeSpeed = 5 / 3;
const fastPipeSpeed = 5;
const currentPipeSpeed = useRef(basePipeSpeed);

  const [pipes, setPipes] = useState<{id: number; x: number; gapY: number}[]>([]);

  const faceY = useRef(new Animated.Value(bottomY)).current;
  const faceX = useRef(new Animated.Value(50)).current;
  const currentYRef = useRef<number>(bottomY);
  const velocityYRef = useRef<number>(0);
const isLongPressingRef = useRef<boolean>(false);
const animationRef = useRef<number | null>(null);

  const bounceSound = useRef<Audio.Sound | null>(null);
  const dashSound = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newId = Date.now();
      const gapY = 150 + Math.random() * (400 - 150);
      setPipes(prev => [...prev, { id: newId, x: screenWidth, gapY }]);
    }, 4500);

    return () => clearInterval(interval);
  }, [screenWidth]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPipes(prev =>
        prev
          .map(pipe => ({ ...pipe, x: pipe.x - currentPipeSpeed.current }))
          .filter(pipe => pipe.x >= -pipeWidth)
      );
    }, 30);

    return () => clearInterval(interval);
  }, [pipeWidth]);

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
      Animated.timing(faceY, {
        toValue: newY,
        duration: 16,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();

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
  faceY.stopAnimation((value) => {
    currentYRef.current = value;
    velocityYRef.current = 0;
  });
  isLongPressingRef.current = true;
  currentPipeSpeed.current = fastPipeSpeed;

  dashSound.current?.setIsLoopingAsync(true);
  dashSound.current?.replayAsync();
};

const handlePressOut = () => {
  isLongPressingRef.current = false;
  currentPipeSpeed.current = basePipeSpeed;

  dashSound.current?.stopAsync();
};

  const handlePress = () => {
    velocityYRef.current = -8;
    bounceSound.current?.replayAsync();
  };

  return (
    <View style={styles.container}>
      <Text>Game Screen</Text>
      <Animated.View style={{ position: 'absolute', top: faceY, left: faceX }}>
        <Image source={require('../assets/images/joshua_face.png')} style={{ width: 80, height: 80, borderRadius: 40 }} />
      </Animated.View>

      {pipes.map(pipe => (
        <Pipe
          key={pipe.id}
          x={pipe.x}
          gapY={pipe.gapY}
          gapHeight={gapHeight}
          pipeWidth={pipeWidth}
        />
      ))}

      <Pressable
        onPress={handlePress}
        // Adjust the long press duration here (in milliseconds)
        delayLongPress={100}
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
