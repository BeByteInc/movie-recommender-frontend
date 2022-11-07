import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, STYLES} from '../styles';
import {ww} from '../helpers';

type Props = {
  onPressLogin: () => void;
};

export const RegisterScreen = ({onPressLogin}: Props) => {
  return (
    <>
      <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor={COLORS.grey}
          style={{
            width: ww(0.75),
            padding: 10,
            borderRadius: 4,
            backgroundColor: COLORS.grayBg,
            color: COLORS.white,
          }}
        />
        <TextInput
          placeholder="Username"
          placeholderTextColor={COLORS.grey}
          style={{
            width: ww(0.75),
            padding: 10,
            marginTop: 20,
            borderRadius: 4,
            backgroundColor: COLORS.grayBg,
            color: COLORS.white,
          }}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          placeholderTextColor={COLORS.grey}
          style={{
            width: ww(0.75),
            marginTop: 20,
            padding: 10,
            borderRadius: 4,
            backgroundColor: COLORS.grayBg,
            color: COLORS.white,
          }}
        />
        <TouchableOpacity style={{padding: 6, marginTop: 20}}>
          <Text style={{...STYLES.buttonText, color: COLORS.secondary}}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          padding: 6,
          marginBottom: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{...STYLES.buttonText, fontSize: ww(0.028)}}>
          Already have account?{' '}
        </Text>
        <TouchableOpacity onPress={onPressLogin}>
          <Text
            style={{
              ...STYLES.buttonText,
              fontSize: ww(0.03),
              color: COLORS.secondary,
            }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
