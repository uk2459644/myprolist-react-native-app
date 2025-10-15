import React, { useContext, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';
import Icon from 'react-native-vector-icons/Feather';

export default function SearchBar({ value, onChange }) {
  const { theme } = useContext(ThemeContext);
  const [focused, setFocused] = useState(false);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.searchBarBackground,
          borderColor: theme.borderColor,
          borderWidth: focused ? 1.5 : 1,
          borderRadius: theme.borderRadius.lg,
          margin: theme.spacing.md
        },
      ]}
    >
      <Icon
        name="search"
        size={20}
        color={theme.textTertiary}
        style={{ marginLeft: theme.spacing.md }}
      />
      <TextInput
        placeholder="Search products"
        placeholderTextColor={theme.textTertiary}
        value={value}
        onChangeText={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[
          styles.input,
          {
            color: theme.textColor,
            fontSize: theme.fontSizes.md,
            paddingHorizontal: theme.spacing.md,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    marginVertical: 8,
  },
  input: { flex: 1 },
});
