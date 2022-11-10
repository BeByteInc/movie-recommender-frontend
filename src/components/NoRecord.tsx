import {Text, View} from 'react-native';
import React from 'react';
import {STYLES} from '../styles';

type Props = {};

const NoRecord = (props: Props) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={STYLES.text}>Can not find any record 😭</Text>
    </View>
  );
};

export default NoRecord;
