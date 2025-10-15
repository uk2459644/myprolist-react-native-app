import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import { ThemeContext } from '../theme/ThemeContext';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { theme } = useContext(ThemeContext);

  const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarStyle: {
      backgroundColor: theme.backgroundColor,
      borderTopColor: theme.borderColor,
      height: 60,
    },
    tabBarLabelStyle: {
      fontSize: theme.fontSizes.sm,
      fontWeight: theme.fontWeights.medium,
    },
    tabBarActiveTintColor: theme.textColor,
    tabBarInactiveTintColor: theme.textTertiary,
    tabBarIcon: ({ color, size }) => {
      let iconName;
      switch (route.name) {
        case 'Home':
          iconName = 'home';
          break;
        case 'Favorites':
          iconName = 'heart';
          break;
        default:
          iconName = 'circle';
      }
      return <Icon name={iconName} size={20} color={color} />;
    },
  });

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
}
