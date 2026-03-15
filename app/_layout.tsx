import { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';
import { AUTH } from '@/config/firebase';
import { useAppStore } from '@/store/useAppStore';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

// URL-ul tău oficial de backend pe Render
const API_URL = 'https://wearwise-api.onrender.com';

// Loading screen shown while Firebase resolves session
function AuthLoadingScreen() {
  return (
    <View style={loadingStyles.container}>
      <Text style={loadingStyles.brand}>
        <Text style={loadingStyles.brandAccent}>W</Text>ear<Text style={loadingStyles.brandAccent}>W</Text>ise
      </Text>
      <ActivityIndicator size="large" color="#5A2D82" style={{ marginTop: 24 }} />
      <Text style={loadingStyles.subtitle}>Se verifică sesiunea...</Text>
    </View>
  );
}

const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    fontSize: 42,
    fontWeight: '900',
    color: '#2B2B2B',
    letterSpacing: -1.5,
  },
  brandAccent: {
    color: '#8E44AD',
  },
  subtitle: {
    marginTop: 12,
    fontSize: 14,
    color: 'rgba(43, 43, 43, 0.4)',
    fontWeight: '600',
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { isLoggedIn, login, logout, _hasHydrated } = useAppStore();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  const [isLayoutMounted, setIsLayoutMounted] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthLoading) {
        console.warn('[Layout] Safety timeout: forcing loading to false.');
        setIsAuthLoading(false);
      }
    }, 10000); 
    return () => clearTimeout(timer);
  }, [isAuthLoading]);

  useEffect(() => {
    setIsLayoutMounted(true);
  }, []);

  useEffect(() => {
    console.log('[Layout] Setting up onAuthStateChanged listener...');
    const unsubscribe = AUTH.onAuthStateChanged(async (user: any) => {
      console.log('[Layout] onAuthStateChanged fired. User UID:', user?.uid ?? 'null (logged out)');

      if (user) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); 

        try {
          console.log('[Layout] Fetching profile from backend for UID:', user.uid);
          
          // ✅ CORECTAT: Schimbat din localhost în URL-ul de Render
          const response = await fetch(`${API_URL}/user/${user.uid}`, { 
            signal: controller.signal 
          });
          
          clearTimeout(timeoutId);
          console.log('[Layout] Backend profile response status:', response.status);
          const profileData = await response.json();

          if (response.ok) {
            console.log('[Layout] Profile loaded successfully:', profileData?.firstName);
            login(profileData);
          } else {
            console.warn('[Layout] Backend returned error, using Firebase fallback');
            login({
              uid: user.uid,
              email: user.email,
              firstName: user.displayName?.split(' ')[0] || '',
              lastName: user.displayName?.split(' ')[1] || '',
              phone: '', country: '', city: '', address: '',
            });
          }
        } catch (error: any) {
          clearTimeout(timeoutId);
          console.error('[Layout] Network error fetching profile:', error.message);
          login({
            uid: user.uid,
            email: user.email,
            firstName: '', lastName: '', phone: '', country: '', city: '', address: '',
          });
        }
      } else {
        console.log('[Layout] No Firebase user - logging out.');
        logout();
      }
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isAuthLoading || !isLayoutMounted || !navigationState?.key || !_hasHydrated) {
      return;
    }

    const inAuthGroup = segments[0] === 'login' || segments[0] === 'register';
    
    if (!isLoggedIn && !inAuthGroup) {
      router.replace('/login');
    } else if (isLoggedIn && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [isLoggedIn, isAuthLoading, segments, navigationState?.key, isLayoutMounted, _hasHydrated]);

  if (isAuthLoading || !_hasHydrated) {
    return (
      <SafeAreaProvider>
        <AuthLoadingScreen />
        <StatusBar style="auto" />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="add-item" />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal', headerShown: true }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}