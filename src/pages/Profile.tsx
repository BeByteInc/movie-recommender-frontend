import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CustomHeader from '../components/CustomHeader';
import {COLORS, STYLES} from '../styles';
import {Icon, Input} from 'react-native-elements';
import {
  useLoadingState,
  useMovieStore,
  useTokenState,
  useUserStore,
} from '../../store';

type Props = {};

const Profile = (props: Props) => {
  const user = useUserStore(state => state.user);
  const [password, setPassword] = useState<string>('');
  const setToken = useTokenState(state => state.setToken);
  const setLoading = useLoadingState(state => state.setLoading);
  const updateUser = useUserStore(state => state.updateUser);
  const addFavList = useMovieStore(state => state.addFavList);

  const changePassword = async () => {};

  const logout = () => {
    setLoading(true);

    setTimeout(() => {
      setToken('');
      updateUser({username: '', user_favorites: [], user_id: 0});
      addFavList([]);
      setLoading(false);
    }, 200);
  };

  return (
    <View style={STYLES.mainContainer}>
      <CustomHeader title={'Profile'} info="Here you can edit your profile" />

      <View style={styles.container}>
        <Input
          placeholder="Email"
          placeholderTextColor={COLORS.grey}
          disabled
          leftIcon={
            <Icon
              name={user.email || 'email'}
              size={24}
              style={{marginRight: 5}}
              color="white"
              tvParallaxProperties={undefined}
            />
          }
          autoCompleteType={undefined}
        />
        <Input
          placeholder={user.username || 'Username'}
          placeholderTextColor={COLORS.grey}
          disabled
          leftIcon={
            <Icon
              name="person"
              size={24}
              color="white"
              style={{marginRight: 5}}
              tvParallaxProperties={undefined}
            />
          }
          autoCompleteType={undefined}
        />

        <Input
          placeholder="*******"
          secureTextEntry
          placeholderTextColor={COLORS.grey}
          style={{color: COLORS.white}}
          value={password}
          onChangeText={setPassword}
          leftIcon={
            <Icon
              name="lock"
              size={24}
              color="white"
              style={{marginRight: 5}}
              tvParallaxProperties={undefined}
            />
          }
          rightIcon={
            <>
              {password.length > 5 ? (
                <Icon
                  name="check"
                  type="evilicons"
                  onPress={changePassword}
                  size={24}
                  color="white"
                  tvParallaxProperties={undefined}
                />
              ) : (
                <></>
              )}
            </>
          }
          autoCompleteType={undefined}
        />

        <TouchableOpacity onPress={logout}>
          <Text style={STYLES.text}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
