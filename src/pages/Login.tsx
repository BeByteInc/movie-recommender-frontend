import {View, Text, TouchableWithoutFeedback, Keyboard} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, STYLES} from '../styles';
import {ww} from '../helpers';
import {UserData} from '../types';
import {LoginScreen, RegisterScreen} from '../components';
import {login, register} from '../services';
import {useLoadingState, useMovieStore, useTokenState, useUserStore} from '../../store';
import axios from 'axios';

export const Login = () => {
  const setToken = useTokenState(state => state.setToken);
  const setLoading = useLoadingState(state => state.setLoading);
  const addFavList = useMovieStore(state => state.addFavList);
  const updateUser = useUserStore(state => state.updateUser);
  const [loginScreen, setLoginScreen] = useState<boolean>(true);



  const handleLogin = async (data: UserData) => {
    setLoading(true);
    try {
      let result = await login(data);
      setToken(result.token);
      addFavList(result.item_list.movie_list);
      updateUser({username:result.username,user_id:result.user_id});
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + result.token;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data: UserData) => {
    setLoading(true);
    try {
      let result = await register(data);
      setToken(result.token);
      addFavList(result.item_list);
      updateUser({username:result.username,user_id:result.user_id});
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + result.token;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
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
          <LoginScreen
            onPressRegister={() => setLoginScreen(false)}
            onPressLogin={handleLogin}
          />
        ) : (
          <RegisterScreen
            onPressLogin={() => setLoginScreen(true)}
            onPressRegister={handleRegister}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
