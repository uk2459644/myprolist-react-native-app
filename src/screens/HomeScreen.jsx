import React, { useContext, useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  FlatList,
  ScrollView,
} from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { fetchProducts } from '../api/products';
import { Pressable } from 'react-native';
import { useDebounce } from '../hooks/useDebounce'; 


export default function HomeScreen({ navigation }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400); 

  /**
   * Fetch Products with React Query Infinite Scroll
   */
  const queryClient = useQueryClient();
  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    refetch,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['products', debouncedSearch],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
    onSuccess(data) {
      // data.pages = array of page arrays depending on your fetchProducts shape
      const pages = data?.pages ?? [];
      for (const page of pages) {
        const items = Array.isArray(page) ? page : page.data ?? [];
        items.forEach(item => {
          if (item?.id) {
            queryClient.setQueryData(['product', item.id], item);
          }
        });
      }
    },
  });



  const allProducts = data?.pages.flatMap((page) => page.data) || [];

  /**
   * Memoized search filter for performance
   */
  const filteredProducts = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return allProducts;
    return allProducts.filter((p) => p.title.toLowerCase().includes(q));
  }, [search, allProducts]);

  /**
   * Load more when end reached
   */
  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  /**
   * Refresh control handler
   */
  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  /**
   * Static featured section (same design)
   */
  const featured = [
    {
      title: 'Elevate Your Living Space',
      subtitle: 'Curated collections for a stylish home',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB1X6FllY638dff1hb5Wd5Dq4Y8V9Mu9VQbZZowYjUIfrmViwqpv6thIeEOowE5FcG1DfDIg3Z6g1ZSQSzedtb5mapHkEGJsn0a8UkwhwOXwEp5GpuKY3k7roiqakvR8Uu2PS_Mip1yUV3LTqnrbFnDipJ3JgGeZ9WImNppr3zjFCR0PpaaDrHmdbGmkcKRsolK0a7KFA4xKf_eAsAiv21UbpmxzabrCbOo5R9VWXUMJ6Eoh2_Wn2nRaxMCbOJ0SOzExDO8XA5uW8FY',
    },
    {
      title: 'Dreamy Bedroom Retreat',
      subtitle: 'Transform your bedroom into a sanctuary',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDxRHiqQwp6MGAdnor9atCJ9iicYffJ7JdVzL00js_wOJQE-Rqv0euRSdYulAYUItQ44FAPNiO7dcyVa44VaBVXyb00UtpgeV3vtcnudB1HmqlJpPqRBQqLAj2gsafV95R1ZDyuXfhTM0tX5y39jdaOx98acmFrkW6mFtSZ0c5rj-g0THqUAzwT7Be9g7a5_fcksYdGIchZR_HErAU_AOzUYAxNY2hbhzlS3N0NNA9vhb3XrQnVYi3utPPNpg_yDCdg9N3WA28qk8b-',
    },
  ];

  /**
   * Header for FlatList (Featured section)
   */
  const ListHeader = (
    <View>
      <Text
        style={{
          color: theme.textColor,
          fontSize: theme.fontSizes.lg,
          fontWeight: theme.fontWeights.bold,
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.sm,
        }}
      >
        Featured
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', padding: theme.spacing.lg }}>
          {featured.map((f, idx) => (
            <CategoryCard key={idx} {...f} />
          ))}
        </View>
      </ScrollView>

      <Text
        style={{
          color: theme.textColor,
          fontSize: theme.fontSizes.lg,
          fontWeight: theme.fontWeights.bold,
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.sm,
        }}
      >
        New Arrivals
      </Text>
    </View>
  );

  /**
   * Footer loader when fetching next page
   */
  const ListFooter = isFetchingNextPage ? (
    <ActivityIndicator
      size="small"
      color={theme.primaryButtonBackground}
      style={{ marginVertical: theme.spacing.lg }}
    />
  ) : null;

  /**
   * Render each product card (2-column grid)
   */
  const renderItem = useCallback(
    ({ item }) => (
      <Pressable
        style={{ width: '48%' }}
        onPress={() => navigation.navigate('ProductDetails', { product: item })}
      >
        <ProductCard title={item.title} price={item.price} image={item.image} />
      </Pressable>
    ),
    [theme]
  );

  if (isLoading) {
    return (
      <View style={[styles.center, { backgroundColor: theme.backgroundColor }]}>
        <ActivityIndicator size="large" color={theme.primaryButtonBackground} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Header onThemeToggle={toggleTheme} />
      <SearchBar value={search} onChange={setSearch} />

      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: theme.spacing.lg }}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        ListEmptyComponent={
          <Text
            style={{
              color: theme.textSecondary,
              textAlign: 'center',
              marginVertical: theme.spacing.xl,
              fontSize: theme.fontSizes.md,
            }}
          >
            No products found.
          </Text>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: theme.spacing.xxl }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.4}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
