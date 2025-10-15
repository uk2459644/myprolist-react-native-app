import React, { useContext } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';

export default function ProductCard({ title, price, image }) {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={{
        flex: 1,
        marginBottom: theme.spacing.lg,
      }}
    >
      <ImageBackground
        source={{ uri: image }}
        imageStyle={{
          borderRadius: theme.borderRadius.lg,
        }}
        style={{
          width: '100%',
          aspectRatio: 3 / 4,
          backgroundColor: theme.cardBackground,
        }}
      />
      <View style={{ marginTop: theme.spacing.sm }}>
        <Text
          numberOfLines={2}
          style={{
            color: theme.textColor,
            fontSize: theme.fontSizes.base,
            fontWeight: theme.fontWeights.medium,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: theme.textTertiary,
            fontSize: theme.fontSizes.sm,
          }}
        >
          ${price}
        </Text>
      </View>
    </View>
  );
}
