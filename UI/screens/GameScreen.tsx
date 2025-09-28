import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#f0f0f0',
  },
});

const GameScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Game Screen</Text>
      <Image
        source={require('../../assets/images/joshua_face.png')}
        style={{
          position: 'absolute',
          top: 100,
          left: 50,
          width: 100,
          height: 100,
        }}
      />
    </View>
  );
};

export default GameScreen;
