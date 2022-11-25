import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import { COLORS } from '../styles'
import { ww } from '../helpers'

type Props = {
    isLiked: boolean;
    onChecked: () => void;
}

const AnimatedLikeButton = ({ isLiked,onChecked }: Props) => {
    return (
        <TouchableOpacity style={{ position: "absolute", right: 0, margin: 12 }} onPress={onChecked}>
            {
                isLiked ?
                    <Icon name='heart' type='fontisto' size={ww(.05)} tvParallaxProperties={false} color={COLORS.secondary} /> :
                    <Icon name='heart-alt' type='fontisto' size={ww(.05)} tvParallaxProperties={false} color={COLORS.secondary} />
            }
        </TouchableOpacity>
    )
}

export default AnimatedLikeButton