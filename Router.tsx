import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
import {wh, ww} from './src/helpers';
import {COLORS} from './src/styles';
import {Loader} from './src/components';
import {Home} from './src/pages/Home';
import {useLoadingState, useMovieStore, useTokenState, useUserStore} from './store';
import {ChooseFav} from './src/pages/ChooseFav';
import {Login} from './src/pages/Login';
import {Explore} from './src/pages/Explore';
import FavoriteScreen from './src/pages/FavoriteScreen';
import Profile from './src/pages/Profile';
import {Movie} from './src/types';
import MovieDetail from './src/pages/MovieDetail';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Router = () => {
  const user = useUserStore(state => state.user);
  const setLoading = useLoadingState(state => state.setLoading);
  const loading = useLoadingState(state => state.loading);
  const token = useTokenState(state => state.token);

  console.log(user);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 250);
  }, []);


  const TabStack = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: COLORS.main,
            height: wh(0.08),
            shadowColor: '#000',
            shadowOpacity: 0.06,
            shadowOffset: {
              width: 10,
              height: 10,
            },
            borderWidth: 1,
            paddingHorizontal: 20,
          },
        }}
        initialRouteName={'Home'}>
        <Tab.Screen
          name={'Home'}
          component={Home}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name={'home'}
                type={'font-awesome-5'}
                size={ww(0.045)}
                color={!focused ? COLORS.grey : COLORS.secondary}
                tvParallaxProperties={undefined}
              />
            ),
          }}
        />
        <Tab.Screen
          name={'Explore'}
          component={Explore}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name={'compass'}
                size={ww(0.045)}
                type={'font-awesome-5'}
                color={!focused ? COLORS.grey : COLORS.secondary}
                tvParallaxProperties={undefined}
              />
            ),
          }}
        />
        <Tab.Screen
          name={'Favorite'}
          component={FavoriteScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name={'heart'}
                size={ww(0.045)}
                type={'font-awesome-5'}
                color={!focused ? COLORS.grey : COLORS.secondary}
                tvParallaxProperties={undefined}
              />
            ),
          }}
        />
        <Tab.Screen
          name={'Profile'}
          component={Profile}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name={'user-circle'}
                size={ww(0.045)}
                type={'font-awesome-5'}
                color={!focused ? COLORS.grey : COLORS.secondary}
                tvParallaxProperties={undefined}
              />
            ),
          }}
        />
        {/* <Tab.Screen
          name={'Explore'}
          component={Explore}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name={'home'}
                type={'material-community'}
                color={!focused ? COLORS.main : COLORS.secondary}
                tvParallaxProperties={undefined}
              />
            ),
          }}
        /> */}
      </Tab.Navigator>
    );
  };

  const StepperStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Login'} component={Login} />
      </Stack.Navigator>
    );
  };
  return (
    <NavigationContainer>
      {loading ? (
        <Loader />
      ) : (
        <>
          {token === '' ? (
            <StepperStack />
          ) : token ? (
            <Stack.Navigator screenOptions={{headerShown: false}}>
              {!user.user_favorites.length && <Stack.Screen name={'ChooseFav'} component={ChooseFav} />}
              <Stack.Screen name={'TabStack'} component={TabStack} />
              <Stack.Screen name={'MovieDetail'} component={MovieDetail} />
            </Stack.Navigator>
          ) : (
            <></>
          )}
        </>
      )}
    </NavigationContainer>
  );
};

export default Router;
