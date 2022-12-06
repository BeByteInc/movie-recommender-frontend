import {
  ActivityIndicator,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import Reanimated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

type Props = {
  source: string;
  style: StyleProp<ImageStyle> | any;
  onLoad?: any;
};

export const FastImages = ({style, source, onLoad}: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity:withTiming(!loading ? 1 : 0, {duration:1000}),
      transform: [
        { scale: withTiming(!loading ? 1 : 0.7, {duration:1000})}
      ]
    }
  })
  return (
    <>
      <AnimatedFastImage
        style={[...(Array.isArray(style)) ? style : [style],animatedStyle]}
        onLoad={evt => {
          onLoad?.(evt);
          setLoading(false);
        }}
        source={{
          uri: source,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      {loading && (
        <View style={[StyleSheet.absoluteFill,{justifyContent:"center",alignItems:"center"}]}>
          <ActivityIndicator />
        </View>
      )}
    </>
  );
};

const AnimatedFastImage = Reanimated.createAnimatedComponent(FastImage as React.FC<FastImageProps>)
