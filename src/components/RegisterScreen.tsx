import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import {COLORS, STYLES} from '../styles';
import {ww} from '../helpers';
import {RegisterProps, UserData} from '../types';

export const RegisterScreen = ({
  onPressRegister,
  onPressLogin,
}: RegisterProps) => {
  const [registerData, setRegisterData] = useState<UserData>({
    email: '',
    username: '',
    password: '',
  });

  const passwordRef = useRef<null | TextInput>(null);
  const usernameRef = useRef<null | TextInput>(null);

  const handleChange = (text: string, key: string) => {
    setRegisterData(prev => {
      return {...prev, [key]: text};
    });
  };
  return (
    <>
      <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => {
            usernameRef.current?.focus();
          }}
          placeholderTextColor={COLORS.grey}
          onChangeText={text => handleChange(text, 'email')}
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
          ref={usernameRef}
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
          onChangeText={text => handleChange(text, 'username')}
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
          onChangeText={text => handleChange(text, 'password')}
          secureTextEntry
          onSubmitEditing={() => {
            onPressRegister(registerData);
          }}
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
        <TouchableOpacity
          style={{padding: 6, marginTop: 20}}
          onPress={() => onPressRegister(registerData)}>
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
