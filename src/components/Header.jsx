import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';
import Icon from 'react-native-vector-icons/Feather'; // install if needed

export default function Header({ title = 'Shop', onSearchPress, onThemeToggle }) {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.headerBackground, padding: theme.spacing.lg },
      ]}
    >
      <TouchableOpacity onPress={onThemeToggle}>
        <Icon name="sun" size={24} color={theme.textColor} />
      </TouchableOpacity>

      <Text
        style={[
          styles.title,
          {
            color: theme.textColor,
            fontSize: theme.fontSizes.lg,
            fontWeight: theme.fontWeights.bold,
          },
        ]}
      >
        {title}
      </Text>

      <TouchableOpacity onPress={onSearchPress}>
        <Icon name="search" size={24} color={theme.textColor} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { textAlign: 'center', flex: 1 },
});
