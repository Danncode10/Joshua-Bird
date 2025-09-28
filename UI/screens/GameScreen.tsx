import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, Pressable, Animated, StyleSheet, Dimensions } from 'react-native';
import { Audio } from 'expo-av';

const GameScreen: React.FC = () => {
  const [isLongPressed, setIsLongPressed] = useState(false);
  const [currentY, setCurrentY] = useState(300);
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const bottomY = screenHeight - 250;
  const gravity = 0.5;
  const faceY = useRef(new Animated.Value(bottomY)).current;
  const faceX = useRef(new Animated.Value(50)).current;
  const currentX = useRef(50);
  const currentYRef = useRef<number>(bottomY);
  const velocityYRef = useRef<number>(0);
  const physicsRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

    const physicsLoop = () => {
      velocityYRef.current += gravity;
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
    };
    physicsRef.current = setInterval(physicsLoop, 16);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (physicsRef.current) {
        clearInterval(physicsRef.current);
        physicsRef.current = null;
      }
      bounceSound.current?.unloadAsync();
      dashSound.current?.unloadAsync();
    };
  }, []);

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

    dashSound.current?.setIsLoopingAsync(true);
    dashSound.current?.replayAsync();
  };

  const handlePressOut = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsLongPressed(false);

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
