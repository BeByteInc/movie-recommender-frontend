import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Movie, FavoriteState } from './src/types';


export const useMovieStore = create<FavoriteState>(
  // @ts-ignore
  persist(
    set => ({
      favorites: [],
      getFavorites: () => {
        AsyncStorage.getItem('favorite-storage').then(movies => {
          if (movies) {
            set(state => ({ ...state, movies: JSON.parse(movies) }));
          }
        });
      },
      addFavorite: (favorite: Movie) => {
      set(state => {
        return {
          ...state,
          favorites: [...state.favorites, favorite],
          };
        });
      },
      removeFavorite: (id: number) => {
        set(state => ({
          ...state,
          movies: state.favorites.filter(movie => movie.id !== id),
        }));
      },
    }),
    {
      name: 'favorite-storage',
      getStorage: () => AsyncStorage,  
    },
  ),
);