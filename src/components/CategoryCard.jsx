import React, { useContext } from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';

const screenWidth = Dimensions.get('window').width;

export default function CategoryCard({ title, subtitle, image }) {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.card,
        {
          borderRadius: theme.borderRadius.lg,
          marginRight: theme.spacing.md,
        },
      ]}
    >
      <ImageBackground
        source={{ uri: image }}
        imageStyle={{
          borderRadius: theme.borderRadius.lg,
        }}
        style={[
          styles.image,
          {
            backgroundColor: theme.cardBackground,
          },
        ]}
      />

      <View style={{ paddingTop: theme.spacing.sm }}>
        <Text
          numberOfLines={1}
          style={{
            color: theme.textColor,
            fontSize: theme.fontSizes.md,
            fontWeight: theme.fontWeights.medium,
          }}
        >
          {title}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            color: theme.textTertiary,
            fontSize: theme.fontSizes.sm,
            marginTop: 2,
          }}
        >
          {subtitle}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: screenWidth * 0.6, // about 40% of the screen width
  },
  image: {
    width: '100%',
    aspectRatio: 16/9, // same ratio as ProductCard
    backgroundColor: '#ccc',
  },
});
