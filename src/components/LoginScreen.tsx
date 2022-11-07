import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, STYLES} from '../styles';
import {ww} from '../helpers';

type Props = {
  onPressRegister: () => void;
};

export const LoginScreen = ({onPressRegister}: Props) => {
  return (
    <>
      <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          placeholder="Username"
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
          placeholder="Password"
          placeholderTextColor={COLORS.grey}
          secureTextEntry
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
            Sign In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 6, marginTop: 5}}>
          <Text style={{...STYLES.buttonText, fontSize: ww(0.028)}}>
            Forgot Password
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
          You don't have account?{' '}
        </Text>
        <TouchableOpacity onPress={onPressRegister}>
          <Text
            style={{
              ...STYLES.buttonText,
              fontSize: ww(0.03),
              color: COLORS.secondary,
            }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
