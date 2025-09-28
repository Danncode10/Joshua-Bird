import React, { useState, useRef } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

const GameScreen: React.FC = () => {
  const [isLongPressed, setIsLongPressed] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleLongPress = () => {
    console.log('Long press detected');
    setIsLongPressed(true);
    intervalRef.current = setInterval(() => {
      console.log('Continuous long press detected');
    }, 500);
  };

  const handlePressOut = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsLongPressed(false);
  };

  return (
    <View style={styles.container}>
      <Text>Game Screen</Text>
      <Image
        source={require('../assets/images/joshua_face.png')}
        style={{
          position: 'absolute',
          top: 100,
          left: 50,
          width: 80,
          height: 80,
        }}
      />

      <Pressable
        onPress={() => console.log('Tap detected')}
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
