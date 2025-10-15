import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import { ThemeContext } from '../theme/ThemeContext';
import { useContext } from 'react';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { theme } = useContext(ThemeContext);

  const navTheme = {
    colors: {
      background: theme.backgroundColor,
    },
  };

  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={BottomTabs} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
