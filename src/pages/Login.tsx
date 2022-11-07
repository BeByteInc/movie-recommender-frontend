import {View, Text, TouchableWithoutFeedback, Keyboard} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, STYLES} from '../styles';
import {wh, ww} from '../helpers';
import {UserData} from '../types';
import {LoginScreen, RegisterScreen} from '../components';

type Props = {};

export const Login = (props: Props) => {
  const [userState, setUserState] = useState<UserData>({
    username: '',
    password: '',
  });
  const [loginScreen, setLoginScreen] = useState<boolean>(true);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={STYLES.mainContainer}>
        <View
          style={{
            margin: 10,
            marginTop: 20,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={[
              STYLES.text,
              {
                fontSize: ww(0.038),
                color: COLORS.secondary,
                fontFamily: FONTS.extraBold,
              },
            ]}>
            MovieRec
          </Text>
        </View>
        {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Icon
          name="film"
          type="fontisto"
          size={ww(0.2)}
          color={COLORS.secondary}
          style={{marginTop: 60}}
          tvParallaxProperties={undefined}
        />
      </View> */}
        {loginScreen ? (
          <LoginScreen onPressRegister={() => setLoginScreen(false)} />
        ) : (
          <RegisterScreen onPressLogin={() => setLoginScreen(true)} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
