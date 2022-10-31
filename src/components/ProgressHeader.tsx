import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import ProgressBar from './ProgressBar'
import { COLORS, FONTS, STYLES } from '../styles'
import { ww } from '../helpers'

type Props = {
    selectedFav: number,
    next: () => void
}

const ProgressHeader = ({ selectedFav,next }: Props) => {
    return (
        <View style={{ margin: 10,marginTop:20, position: "relative" }}>
            <Text style={STYLES.text}>{selectedFav} Movie Selected</Text>
            <TouchableOpacity style={{ position: "absolute", right: 3 }} disabled={selectedFav < 5} onPress={next}>
                <Text style={{ color: selectedFav >= 5 ? COLORS.white : COLORS.disabledColor,fontFamily:FONTS.regular }}>Continue</Text>
            </TouchableOpacity>
            <ProgressBar fullProgress={5} progress={selectedFav} barColor={COLORS.secondary} />
        </View>
    )
}

export default ProgressHeader