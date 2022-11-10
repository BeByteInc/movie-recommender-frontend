import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Movie, FavoriteState, LoadingState, TokenState, UserState, UserType } from './src/types';


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
      addFavList: (favList: Movie[]) => {
        set(state => {
          return {
            ...state,
            favorites: [...state.favorites, ...favList],
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

export const useLoadingState = create<LoadingState>(
  set => ({
    loading: true,
    setLoading: (loading:boolean) => set(() => ({ loading })),

  }
  )
);

export const useTokenState = create<TokenState>(
  // @ts-ignore
  persist(
    set => ({
      token: "",
      setToken: (token:string) => set(() => ({token})),
      getToken: () => {
        AsyncStorage.getItem('token-storage').then(t => {
          if (t) {
            let newToken = JSON.parse(t);
            set(() => (newToken.state.state.token));
          }
        });
      },
      }),
    {
      name: 'token-storage',
      getStorage: () => AsyncStorage,
    },
  ),
);

export const useUserStore = create<UserState>(
  // @ts-ignore
  persist(
    set => ({
      user: {
        username:"",
        user_id:0
      },
      getUser: () => {
        AsyncStorage.getItem('user-storage').then(u => {
          if (u) {
            set((state) => ({
              user: {
                username:JSON.parse(u).state.username,
                user_id:JSON.parse(u).state.user_id,
              }
            }))
          }
        });
      },
      updateUser: (user: UserType)=>
      set((state) => ({
        user: {
          username:user.username,
          user_id:user.user_id
        }
      })),
    }),
    {
      name: 'user-storage',
      getStorage: () => AsyncStorage,
    },
  ),
);