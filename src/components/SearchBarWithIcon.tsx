import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import { COLORS } from '../styles'
import { ww } from '../helpers'
import { Icon } from 'react-native-elements'

type Props = {
    onChange: (text: string) => void
}

const SearchBarWithIcon = ({ onChange }: Props) => {
    return (
            <View style={{ backgroundColor: COLORS.grayBg, width: ww(.9), alignSelf: "center", alignItems: "center", flexDirection: "row", borderRadius: 12 }}>
                <Icon color={COLORS.white} name="search" type="font-awesome" tvParallaxProperties={undefined} size={ww(.04)} style={{ paddingHorizontal: 10, marginLeft: 10 }} />
                <TextInput
                    onChangeText={(text: string) => onChange(text)}
                    style={{ flex: 1, color: COLORS.white }}
                />
            </View>
    )
}

export default SearchBarWithIcon