import React from 'react';
import { View, Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;

interface PipeProps {
  x: number;
  gapY: number;
  gapHeight: number;
  pipeWidth: number;
}

const Pipe: React.FC<PipeProps> = ({ x, gapY, gapHeight, pipeWidth }) => {
  const topPipeHeight = gapY - gapHeight / 2;
  const bottomPipeTop = gapY + gapHeight / 2;
  const bottomPipeHeight = screenHeight - bottomPipeTop;

  return (
    <>
      <View
        style={{
          position: 'absolute',
          left: x,
          top: 0,
          width: pipeWidth,
          height: topPipeHeight,
          backgroundColor: 'green',
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: x,
          top: bottomPipeTop,
          width: pipeWidth,
          height: bottomPipeHeight,
          backgroundColor: 'green',
        }}
      />
    </>
  );
};

export default Pipe;
