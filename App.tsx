import React, { useEffect } from 'react';
import Router from './Router';
import { useMovieStore } from './store';


const App = () => {
  const getFavorites = useMovieStore((state => state.getFavorites))
  useEffect(() => {
    getFavorites();
    }, [])

    
  return (
    <Router />
  );
};


export default App;
