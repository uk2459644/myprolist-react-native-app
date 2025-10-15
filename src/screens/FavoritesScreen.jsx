import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ThemeContext } from '../theme/ThemeContext';
import { FavoritesContext } from '../context/FavoritesContext';
import FavoriteItemCard from '../components/FavoriteItemCard';

export default function FavoritesScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const [localFavorites, setLocalFavorites] = useState([]);

  // Sync favorites whenever they change
  useEffect(() => {
    setLocalFavorites(favorites);
  }, [favorites]);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          { backgroundColor: theme.backgroundColor },
        ]}
      >
        <Icon
          name="arrow-left"
          size={24}
          color={theme.textColor}
          onPress={() => navigation.goBack && navigation.goBack()}
        />
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            color: theme.textColor,
            fontSize: theme.fontSizes.lg,
            fontWeight: theme.fontWeights.bold,
            marginRight: theme.spacing.xxl,
          }}
        >
          Favorites
        </Text>
      </View>

      {/* Favorites List */}
      {localFavorites.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: theme.textSecondary,
              fontSize: theme.fontSizes.md,
            }}
          >
            No favorites yet.
          </Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {localFavorites.map((item, idx) => (
            <FavoriteItemCard
              key={idx}
              {...item}
              onRemove={() => toggleFavorite(item)} // <-- Remove item
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
});
