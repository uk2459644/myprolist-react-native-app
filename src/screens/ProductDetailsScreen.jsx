import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ImageBackground, ScrollView, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ThemeContext } from '../theme/ThemeContext';
import { FavoritesContext } from '../context/FavoritesContext';
import RatingStars from '../components/RatingStars';
import ProgressBar from '../components/ProgressBar';
import PrimaryButton from '../components/PrimaryButton';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchProductById } from '../api/products';
import { getCachedProductById } from '../lib/cacheUtils';

export default function ProductDetailsScreen({ route, navigation }) {
  const { theme } = useContext(ThemeContext);
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const queryClient = useQueryClient();

  // accept either full product param or productId param
  const productParam = route.params?.product;
  const productId = productParam?.id ?? route.params?.productId;

  const initial = getCachedProductById(queryClient, productId) ?? productParam;

  const { data: queriedProduct } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
    enabled: !!productId,
    staleTime: 1000 * 60 * 5,
    initialData: initial,
  });

  const displayedProduct = queriedProduct ?? productParam;

  if (!displayedProduct) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: theme.backgroundColor, alignItems: 'center', justifyContent: 'center' },
        ]}
      >
        <Text style={{ color: theme.textColor }}>No product data available</Text>
      </View>
    );
  }

  const rating = displayedProduct.rating?.rate || 4.5;
  const totalReviews = displayedProduct.rating?.count || 120;
  const ratingBreakdown = [40, 30, 15, 10, 5];

  const handleFavoriteToggle = () => {
    toggleFavorite(displayedProduct);
  };

  const favorite = isFavorite(displayedProduct.id);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.backgroundColor }]}>
        <Icon name="arrow-left" size={24} color={theme.textColor} onPress={() => navigation.goBack()} />
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
          Product Details
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{ uri: displayedProduct.image }}
          style={styles.image}
          imageStyle={{ resizeMode: 'cover' }}
        />

        <Text
          style={{
            color: theme.textColor,
            fontSize: 22,
            fontWeight: theme.fontWeights.bold,
            paddingHorizontal: theme.spacing.lg,
            marginTop: theme.spacing.lg,
          }}
        >
          {displayedProduct.title}
        </Text>

        <Text
          style={{
            color: theme.textColor,
            fontSize: theme.fontSizes.lg,
            fontWeight: theme.fontWeights.bold,
            paddingHorizontal: theme.spacing.lg,
            marginTop: theme.spacing.lg,
          }}
        >
          ${displayedProduct.price}
        </Text>
        
        <Text
          style={{
            color: theme.textColor,
            fontSize: theme.fontSizes.md,
            paddingHorizontal: theme.spacing.lg,
            marginTop: theme.spacing.sm,
            lineHeight: 22,
          }}
        >
          {displayedProduct.description}
        </Text>

        {/* Ratings Section */}
        <Text
          style={{
            color: theme.textColor,
            fontSize: theme.fontSizes.lg,
            fontWeight: theme.fontWeights.bold,
            paddingHorizontal: theme.spacing.lg,
            marginTop: theme.spacing.lg,
          }}
        >
          Rating
        </Text>

        <View style={styles.ratingSection}>
          <View>
            <Text
              style={{
                color: theme.textColor,
                fontSize: 36,
                fontWeight: theme.fontWeights.extrabold,
              }}
            >
              {rating}
            </Text>
            <RatingStars rating={rating} />
            <Text
              style={{
                color: theme.textColor,
                marginTop: 4,
                fontSize: theme.fontSizes.sm,
              }}
            >
              {totalReviews} reviews
            </Text>
          </View>

          <View style={{ flex: 1, marginLeft: theme.spacing.lg }}>
            {ratingBreakdown.map((val, i) => (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: theme.spacing.sm,
                }}
              >
                <Text
                  style={{
                    width: 20,
                    color: theme.textColor,
                    fontSize: theme.fontSizes.sm,
                  }}
                >
                  {5 - i}
                </Text>
                <View style={{ flex: 1, marginHorizontal: theme.spacing.sm }}>
                  <ProgressBar percentage={val} />
                </View>
                <Text
                  style={{
                    width: 40,
                    textAlign: 'right',
                    color: theme.textTertiary,
                    fontSize: theme.fontSizes.sm,
                  }}
                >
                  {val}%
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={{ flexDirection: 'row', padding: theme.spacing.lg, justifyContent: 'space-between' }}>
        <PrimaryButton title="Add to Cart" onPress={() => console.log('Added to cart', displayedProduct)} />

        <PrimaryButton
          title={favorite ? 'Remove from Favorites' : 'Add to Favorites'}
          variant="secondary"
          onPress={handleFavoriteToggle}
        />
      </View>
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
  image: {
    width: '100%',
    height: 220,
  },
  ratingSection: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'flex-start',
  },
});
