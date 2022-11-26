import React from 'react';
import {View, StyleSheet, Animated, Dimensions} from 'react-native';
import {COLORS} from '../styles';
import {Movie} from '../types';

type Props = {
  data: any;
  scrollX: any;
  screenWidth:number;
};

export const Paginator = ({data, scrollX,screenWidth}: Props) => {
  return (
    <View style={{flexDirection: 'row', height: 64, justifyContent: 'center'}}>
      {data.map((_: any, i: number) => {
        const inputRange = [(i - 1) * screenWidth, i * screenWidth, (i + 1) * screenWidth];
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
    borderRadius: 8,
    borderColor: COLORS.softSecondary,
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

