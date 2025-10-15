import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ThemeContext } from '../theme/ThemeContext';
import { useContext } from 'react';

export default function RatingStars({ rating = 4.5, size = 18 }) {
  const { theme } = useContext(ThemeContext);
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;

  return (
    <View style={{ flexDirection: 'row' }}>
      {[...Array(5)].map((_, i) => {
        const color = i < fullStars
          ? theme.primaryButtonBackground
          : theme.textTertiary;
        return (
          <Icon
            key={i}
            name="star"
            size={size}
            color={color}
            style={{ marginRight: 2 }}
          />
        );
      })}
    </View>
  );
}
