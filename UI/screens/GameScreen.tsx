import React from 'react';
import { View, Text, Image } from 'react-native';

const GameScreen: React.FC = () => {
  return (
    <View style={{ position: 'relative' }}>
      <Text>Game Screen</Text>
      <Image
        source={require('../../assets/joshua_face.png')}
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
