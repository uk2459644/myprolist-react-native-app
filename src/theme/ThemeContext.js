import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';

/**
 * SPACING SYSTEM
 */
const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

/**
 * FONT SIZES
 */
const fontSizes = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
  display: 32,
};

/**
 * FONT WEIGHTS
 */
const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
};

/**
 * BORDER RADIUS
 */
const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

/**
 * LIGHT THEME 
 */
const lightTheme = {
  mode: 'light',
  // Colors
  backgroundColor: '#ffffff',
  textColor: '#333333',
  textSecondary: '#666666',
  textTertiary: '#92b2c9',
  primaryButtonBackground: '#007bff',
  primaryButtonText: '#ffffff',
  cardBackground: '#f8f8f8',
  borderColor: '#dddddd',
  headerBackground: '#f1f1f1',
  searchBarBackground: '#eeeeee',
  // Spacing
  spacing,
  // Typography
  fontSizes,
  fontWeights,
  // Border Radius
  borderRadius,
};

/**
 * DARK THEME 
 */
const darkTheme = {
  mode: 'dark',
  // Colors
  backgroundColor: '#111b22',
  textColor: '#e0e0e0',
  textSecondary: '#b0b0b0',
  textTertiary: '#92b2c9',
  primaryButtonBackground: '#88B0E8',
  primaryButtonText: '#ffffff',
  cardBackground: '#233948',
  borderColor: '#333333',
  headerBackground: '#111b22',
  searchBarBackground: '#233948',
  bottomNavBackground: '#192833',
  bottomNavBorder: '#233948',
  // Spacing
  spacing,
  // Typography
  fontSizes,
  fontWeights,
  // Border Radius
  borderRadius,
};

/**
 * CONTEXT
 */
export const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
});

/**
 * PROVIDER
 */
export const ThemeProvider = ({ children }) => {
  const systemScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(systemScheme === 'dark' ? darkTheme : lightTheme);

  // Automatically update if system theme changes
  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
    });
    return () => listener.remove();
  }, []);

  // Manual toggle
  const toggleTheme = () => setTheme((prev) => (prev.mode === 'light' ? darkTheme : lightTheme));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};