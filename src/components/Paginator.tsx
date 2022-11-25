import React from 'react';
import {View, StyleSheet, Animated, Dimensions} from 'react-native';
import {COLORS} from '../styles';
import {Movie} from '../types';
const {width, height} = Dimensions.get('screen');

type Props = {
  data: any;
  scrollX: any;
};

export const Paginator = ({data, scrollX}: Props) => {
  return (
    <View style={{flexDirection: 'row', height: 64, justifyContent: 'center'}}>
      {data.map((_: any, i: number) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [12, 24, 12],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            style={[styles.dot, {width: dotWidth}]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    borderColor: '#fefefe',
    marginHorizontal: 8,
    borderWidth: 1,
    backgroundColor: COLORS.main,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20,
  },
});

