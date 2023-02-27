import React from 'react';
import {scale} from 'react-native-size-matters';
import {Svg, Rect, Ellipse, SvgProps} from 'react-native-svg';
import {ColorValue} from 'react-native/types';
import {View, PixelRatio, StyleSheet} from 'react-native';
import PointerOfTheClock from './PointerOfTheClock';

interface ClockFaceProps extends SvgProps {
  colorOfLines?: ColorValue;
  size?: number;
  isRunning: boolean;
  timer: number;
}

function ClockFace(props: ClockFaceProps) {
  const {colorOfLines = '#F7FAF3', size = 280} = props;

  return (
    <View>
      <Svg
        width={scale(size)}
        height={scale(size)}
        viewBox="0 0 280 280"
        fill="none"
        {...props}>
        <Rect
          opacity="0.6"
          x="139.143"
          width="2"
          height="30"
          rx="1"
          fill={colorOfLines}
        />
        <Rect
          opacity="0.6"
          x="171.788"
          y="18.0347"
          width="2"
          height="12"
          rx="1"
          transform="rotate(15 171.788 18.0347)"
          fill={colorOfLines}
        />
        <Rect
          opacity="0.6"
          x="109.672"
          y="249.857"
          width="2"
          height="12"
          rx="1"
          transform="rotate(15 109.672 249.857)"
          fill={colorOfLines}
        />
        <Rect
          opacity="0.6"
          x="202.277"
          y="30.3809"
          width="2"
          height="12"
          rx="1"
          transform="rotate(30 202.277 30.3809)"
          fill={colorOfLines}
        />
        <Rect
          opacity="0.6"
          x="82.2769"
          y="238.227"
          width="2"
          height="12"
          rx="1"
          transform="rotate(30 82.2769 238.227)"
          fill={colorOfLines}
        />
        <Rect
          opacity="0.6"
          x="248.762"
          y="76.1338"
          width="2"
          height="12"
          rx="1"
          transform="rotate(60 248.762 76.1338)"
          fill={colorOfLines}
        />
        <Rect
          opacity="0.6"
          x="40.916"
          y="196.134"
          width="2"
          height="12"
          rx="1"
          transform="rotate(60 40.916 196.134)"
          fill={colorOfLines}
        />
        <Rect
          opacity="0.6"
          x="261.591"
          y="106.423"
          width="2"
          height="12"
          rx="1"
          transform="rotate(75 261.591 106.423)"
          fill={colorOfLines}
        />
        <Rect
          opacity="0.6"
          x="29.7686"
          y="168.54"
          width="2"
          height="12"
          rx="1"
          transform="rotate(75 29.7686 168.54)"
          fill={colorOfLines}
        />
        <Rect
          opacity="0.6"
          x="262.108"
          y="171.646"
          width="2"
          height="12"
          rx="1"
          transform="rotate(105 262.108 171.646)"
          fill={colorOfLines}
        />
        <Rect
          opacity="0.6"
          x="30.2863"
          y="109.529"
          width="2"
          height="12"
          rx="1"
          transform="rotate(105 30.2863 109.529)"
          fill={colorOfLines}
        />
        <Rect
          opacity="0.6"
          x="249.762"
          y="202.134"
          width="2"
          height="12"
          rx="1"
          transform="rotate(120 249.762 202.134)"
          fill={colorOfLines}
        />
        <Rect
          opacity="0.6"
          x="41.9161"
          y="82.1338"
          width="2"
          height="12"
          rx="1"
          transform="rotate(120 41.9161 82.1338)"
          fill={colorOfLines}
        />
        <Rect
          opacity="0.6"
          x="204.009"
          y="248.619"
          width="2"
          height="12"
          rx="1"
          transform="rotate(150 204.009 248.619)"
          fill={colorOfLines}
        />
        <Rect
          opacity="0.6"
          x="84.009"
          y="40.7734"
          width="2"
          height="12"
          rx="1"
          transform="rotate(150 84.009 40.7734)"
          fill={colorOfLines}
        />
        <Rect
          opacity="0.6"
          x="173.72"
          y="261.448"
          width="2"
          height="12"
          rx="1"
          transform="rotate(165 173.72 261.448)"
          fill={colorOfLines}
        />
        <Rect
          opacity="0.6"
          x="111.604"
          y="29.626"
          width="2"
          height="12"
          rx="1"
          transform="rotate(165 111.604 29.626)"
          fill={colorOfLines}
        />
        <Rect
          opacity="0.6"
          x="139.143"
          y="250"
          width="2"
          height="30"
          rx="1"
          fill={colorOfLines}
        />
        <Rect
          opacity="0.6"
          x="280"
          y="139.143"
          width="2"
          height="30"
          rx="1"
          transform="rotate(90 280 139.143)"
          fill={colorOfLines}
        />
        <Rect
          opacity="0.6"
          x="30"
          y="139.143"
          width="2"
          height="30"
          rx="1"
          transform="rotate(90 30 139.143)"
          fill={colorOfLines}
        />
        <Rect
          opacity="0.6"
          x="239.601"
          y="238.389"
          width="2"
          height="30"
          rx="1"
          transform="rotate(135 239.601 238.389)"
          fill={colorOfLines}
        />
        <Rect
          opacity="0.6"
          x="62.8243"
          y="61.6123"
          width="2"
          height="30"
          rx="1"
          transform="rotate(135 62.8243 61.6123)"
          fill={colorOfLines}
        />
        <Rect
          opacity="0.6"
          x="238.389"
          y="40.3989"
          width="2"
          height="30"
          rx="1"
          transform="rotate(45 238.389 40.3989)"
          fill={colorOfLines}
        />
        <Rect
          opacity="0.6"
          x="61.6122"
          y="217.176"
          width="2"
          height="30"
          rx="1"
          transform="rotate(45 61.6122 217.176)"
          fill={colorOfLines}
        />
        <Ellipse
          opacity="0.05"
          cx="140"
          cy="140"
          rx="120"
          ry="120"
          transform="rotate(-90 140 140)"
          fill="white"
        />
      </Svg>
      <View style={styles.pointerOfTheClockContainer}>
        <View style={styles.pointerOfTheClockInner}>
          <View style={styles.timer}>{props.children}</View>
          <PointerOfTheClock
            isRunning={props.isRunning}
            timer={props.timer}
            radius={radius * 1}
          />
        </View>
      </View>
    </View>
  );
}

const radius = PixelRatio.roundToNearestPixel(110);

const styles = StyleSheet.create({
  pointerOfTheClockContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointerOfTheClockInner: {
    width: radius * 2,
    height: radius * 2,
  },
  timer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ClockFace;
