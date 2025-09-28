import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const GameScreen: React.FC = () => {
  return (
    <LinearGradient
      colors={['#0ea5e9', '#ffffff']}
      style={styles.container}
    >
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

export default GameScreen;
