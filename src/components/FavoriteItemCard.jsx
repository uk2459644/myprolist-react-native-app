import React, { useContext } from 'react';
import { View, Text, ImageBackground, StyleSheet,Pressable } from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';
import Icon from 'react-native-vector-icons/Feather';

export default function FavoriteItemCard({ title, price, image,onRemove }) {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.backgroundColor,
          borderBottomColor: theme.borderColor,
        },
      ]}
    >
      <ImageBackground
        source={{ uri: image }}
        style={styles.image}
        imageStyle={{
          borderRadius: theme.borderRadius.md,
        }}
      />
      <View style={{ flex: 1, justifyContent: 'center' }}>
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
          ${price}
        </Text>
      </View>

       {/* Remove Button */}
      <Pressable onPress={onRemove} hitSlop={10}>
        <Icon name="x" size={20} color={theme.textSecondary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    minHeight: 72,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: '#ddd',
  },
});
