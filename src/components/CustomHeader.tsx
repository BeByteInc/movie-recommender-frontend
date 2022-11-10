import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { wh, ww } from '../helpers'
import { COLORS, FONTS } from '../styles';

type Props = {
    title:string;
    info:string;
}

const CustomHeader = ({title,info}: Props) => {
  return (
    <View style={styles.headerSection}>
        <View>
          <Text style={{...styles.titleText, color: COLORS.grey}}>
            {title}
          </Text>
          <Text style={styles.titleText}>
            {info}
          </Text>
        </View>
        <View style={styles.circleAvatarContainer}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/3940/3940403.png',
            }}
            style={styles.circleAvatar}
          />
        </View>
      </View>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
    headerSection: {
        height: wh(.1),
        marginTop: 5,
        paddingHorizontal: 10,
        justifyContent: 'center',
      },
      titleText: {
        color: COLORS.white,
        fontSize: ww(0.032),
        marginVertical: 2,
        fontFamily: FONTS.medium,
      },
      circleAvatar: {
        height: wh(0.065),
        width: wh(0.065),
        borderRadius: 50,
      },
      circleAvatarContainer: {
        position: 'absolute',
        borderRadius: 50,
        height: wh(0.065),
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',
        width: wh(0.065),
        right: 10,
        top: 15,
        shadowColor: COLORS.secondary,
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
      },
})