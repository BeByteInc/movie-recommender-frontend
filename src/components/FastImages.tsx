import { ImageStyle, StyleProp, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';

type Props = {
    source: string;
    style: StyleProp<ImageStyle> | any;
}

export const FastImages = ({style,source}: Props) => {
  return (
    <FastImage
        style={style}
        source={{
            uri: source,
            priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
    />
  )
}

