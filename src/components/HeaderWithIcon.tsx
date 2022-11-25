import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {Header, HeaderProps, Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { wh, ww } from '../helpers';
import {COLORS, STYLES} from '../styles';

type Props = {
  title: string | undefined;
  onPressLeft: () => void;
};

export const HeaderWithIcon = ({title,onPressLeft}: Props) => {
  return (
    <SafeAreaProvider>
      <Header
      containerStyle={styles.header}
        backgroundColor={COLORS.main}
        leftComponent={{
          icon: 'arrow-back-ios',
          onPress:onPressLeft,
          type: 'material-icon',
          color: '#fff',
          
        }}
        style={styles.header}
        centerComponent={{text: title, style: {...STYLES.text,color:COLORS.white}}}
      />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
    header: {
        paddingVertical:wh(.03),
        paddingHorizontal:ww(.05)
    }
});
