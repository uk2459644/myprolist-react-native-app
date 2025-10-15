import React, { useContext, useEffect } from 'react';
import { StatusBar, AppState, Platform } from 'react-native';
import {
  QueryClient,
  QueryClientProvider,
  onlineManager,
} from '@tanstack/react-query';
import {
  PersistQueryClientProvider, // Use the Provider component
} from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, ThemeContext } from './src/theme/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';
import { FavoritesProvider } from './src/context/FavoritesContext';

// Create QueryClient with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Ensure gcTime is long enough to cover your maxAge, as cacheTime is deprecated
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnReconnect: true,
      retry: 1,
    },
    mutations: {
      retry: 3, // Retry failed mutations
      onError: (error) => {
        console.log('Mutation error:', error);
      },
      // TanStack Query handles offline mutations automatically when onlineManager is set
    },
  },
});

// Create the persister using AsyncStorage
const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

// Set up online status management for React Native
onlineManager.setEventListener((setOnline) => {
  const unsubscribe = NetInfo.addEventListener((state) => {
    // state.isConnected can be null; set to `true` to avoid blocking
    setOnline(!!state.isConnected);
  });
  return unsubscribe;
});

// Set up focus management for React Native
function onAppStateChange(status) {
  if (Platform.OS !== 'web') {
    onlineManager.setOnline(status === 'active');
  }
}

// App component using PersistQueryClientProvider
function App() {
  
  useEffect(() => {
    // Listen for app state changes to handle refetching on focus
    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => subscription.remove();
  }, []);

  return (
    <ThemeProvider>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: asyncStoragePersister, maxAge: 1000 * 60 * 60 * 24 }}
        onSuccess={() => {
          // This ensures any mutations that failed while offline are resumed
          queryClient.resumePausedMutations();
        }}
      >
        <FavoritesProvider>
          <SafeAreaProvider>
            <MainApp />
          </SafeAreaProvider>
        </FavoritesProvider>
      </PersistQueryClientProvider>
    </ThemeProvider>
  );
}

function MainApp() {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <StatusBar
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.backgroundColor}
      />
      <AppNavigator />
    </>
  );
}

export default App;
