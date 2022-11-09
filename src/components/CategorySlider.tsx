import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {CategorySliderProps} from '../types';
import {genreArray} from '../helpers';
import {COLORS, STYLES} from '../styles';
import { categoryEmoji } from '../helpers/categoryEmoji';

export const CategorySlider = ({genres,selected = [],onPressCategory}: CategorySliderProps) => {
  const categoryArray = genreArray(genres);
  return (
    <View style={{height:"90%"}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categoryArray.map((item,index) => (
          <TouchableOpacity key={item} onPress={() => onPressCategory(item)} style={STYLES.categoryContainer}>
            <Text style={{...STYLES.categoryText,color:selected.includes(item) ? COLORS.secondary : COLORS.grey}}>
              {categoryEmoji(item)} {" "} {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
