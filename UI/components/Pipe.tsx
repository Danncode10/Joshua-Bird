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

export function getPipeRects(
  pipe: { x: number; gapY: number },
  pipeWidth: number,
  gapHeight: number,
  screenHeight: number
) {
  const topPipeHeight = pipe.gapY - gapHeight / 2;
  const bottomPipeTop = pipe.gapY + gapHeight / 2;
  const bottomPipeHeight = screenHeight - bottomPipeTop;

  return {
    top: {
      x: pipe.x,
      y: 0,
      width: pipeWidth,
      height: topPipeHeight,
    },
    bottom: {
      x: pipe.x,
      y: bottomPipeTop,
      width: pipeWidth,
      height: bottomPipeHeight,
    },
  };
}

export default Pipe;
