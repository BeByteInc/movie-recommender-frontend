import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import {COLORS, STYLES} from '../styles';
import {ww} from '../helpers';
import {LoginProps, UserData} from '../types';

export const LoginScreen = ({onPressRegister, onPressLogin}: LoginProps) => {
  const [loginData, setLoginData] = useState<UserData>({
    username: '',
    password: '',
  });
  const passwordRef = useRef<null | TextInput>(null);

  const handleChange = (text: string, key: string) => {
    setLoginData(prev => {
      return {...prev, [key]: text};
    });
  };
  return (
    <>
      <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          placeholder="Username"
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
          onChangeText={text => handleChange(text, 'username')}
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
          ref={passwordRef}
          onSubmitEditing={() => {
            onPressLogin(loginData);
          }}
          onChangeText={text => handleChange(text, 'password')}
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
        <TouchableOpacity
          style={{padding: 6, marginTop: 20}}
          onPress={() => onPressLogin(loginData)}>
          <Text style={{...STYLES.buttonText, color: COLORS.secondary}}>
            Sign In
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={{padding: 6, marginTop: 5}}>
          <Text style={{...STYLES.buttonText, fontSize: ww(0.028)}}>
            Forgot Password
          </Text>
        </TouchableOpacity> */}
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
