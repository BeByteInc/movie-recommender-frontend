import axios from 'axios';
import React, {useEffect} from 'react';
import { StatusBar } from 'react-native';
import Router from './Router';
import {useMovieStore, useTokenState} from './store';

const App = () => {
  const getFavorites = useMovieStore(state => state.getFavorites);
  const getToken = useTokenState(state => state.getToken);
  const token = useTokenState(state => state.token);

  useEffect(() => {
    getFavorites();
    getToken();
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
  }, [token]);

  return (
    <>
      <StatusBar hidden />

      <Router />
    </>
  );
};

export default App;
