import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';

export default function PrimaryButton({
  title,
  onPress,
  variant = 'primary', // or 'secondary'
}) {
  const { theme } = useContext(ThemeContext);
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: isPrimary
            ? theme.primaryButtonBackground
            : theme.cardBackground,
          borderRadius: theme.borderRadius.lg,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: isPrimary
              ? theme.primaryButtonText
              : theme.textColor,
            fontWeight: theme.fontWeights.bold,
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});
