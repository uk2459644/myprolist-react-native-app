import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ThemeContext } from '../theme/ThemeContext';

export default function BottomNav({ active = 'home' }) {
  const { theme } = useContext(ThemeContext);

  const tabs = [
    { key: 'home', icon: 'home', label: 'Home' },
    { key: 'favorites', icon: 'heart', label: 'Favorites' },
    { key: 'cart', icon: 'shopping-cart', label: 'Cart' },
    { key: 'profile', icon: 'user', label: 'Profile' },
  ];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.bottomNavBackground || theme.headerBackground,
          borderTopColor: theme.bottomNavBorder || theme.borderColor,
        },
      ]}
    >
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={styles.tab}
          activeOpacity={0.7}
        >
          <Icon
            name={tab.icon}
            size={22}
            color={active === tab.key ? theme.textColor : theme.textTertiary}
          />
          <Text
            style={{
              fontSize: theme.fontSizes.sm,
              color: active === tab.key ? theme.textColor : theme.textTertiary,
              fontWeight: theme.fontWeights.medium,
            }}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    paddingVertical: 8,
  },
  tab: { alignItems: 'center', justifyContent: 'center', gap: 2 },
});
