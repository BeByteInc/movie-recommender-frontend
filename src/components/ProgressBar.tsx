import { View, Text, StyleSheet, Animated } from 'react-native'
import React, { FunctionComponent, useEffect } from 'react'
import { ww } from '../helpers'

type Props = {
    fullProgress: number,
    progress: number,
    barColor: string
}

const ProgressBar = ({ fullProgress, progress, barColor }: Props) => {
    const barWidth = React.useRef(new Animated.Value(0)).current;

    const finalWidth = progress <= fullProgress ? ww(.9) * progress / fullProgress : ww(.9);

    useEffect(() => {
        Animated.spring(barWidth, {
            toValue: finalWidth,
            bounciness: 10,
            speed: 2,
            useNativeDriver: false
        }).start();
    }, [finalWidth])

    return (
        <View style={styles.barContainer}>
            <Animated.View style={{ ...styles.progressBar, width: barWidth, backgroundColor: barColor }} />
        </View>

    )
}

export default ProgressBar;


const styles = StyleSheet.create({
    barContainer: {
        flex: 1,
        margin:15,
        marginTop:25,
        justifyContent: 'center',
        alignItems: "center"
    },
    progressBar: {
        height: 12,
        borderRadius: 8,
    },
})