// --- ÎNCEPUT PETIC PENTRU SWIPER PE WEB ---
import '../patch-console';
import { AUTH } from '@/config/firebase';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAppStore } from '@/store/useAppStore';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import * as ReactNative from 'react-native';
import { View, ActivityIndicator, Text, StyleSheet, Platform, LogBox } from 'react-native';

import { useFonts, Quicksand_400Regular, Quicksand_500Medium, Quicksand_700Bold } from '@expo-google-fonts/quicksand';
import { Mali_400Regular, Mali_500Medium, Mali_600SemiBold, Mali_700Bold } from '@expo-google-fonts/mali';
import { Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold } from '@expo-google-fonts/manrope';
import { Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold, Outfit_700Bold } from '@expo-google-fonts/outfit';
import { PlayfairDisplay_700Bold, PlayfairDisplay_900Black } from '@expo-google-fonts/playfair-display';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync().catch(() => {});

// 1. Petic pentru ViewPropTypes (eroarea de Web) fără dependențe externe
Object.defineProperty(ReactNative, 'ViewPropTypes', {
  get() {
    return {}; // Dummy object to bypass the crash on web
  },
});

// 2. Petic pentru React.PropTypes (eroarea cu "array")
// @ts-ignore
if (!React.PropTypes) {
  // @ts-ignore
  React.PropTypes = PropTypes;
}

LogBox.ignoreLogs([
  '"shadow*" style props are deprecated',
  'Animated: `useNativeDriver` is not supported',
  'props.pointerEvents is deprecated'
]);

if (typeof console !== 'undefined') {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (typeof args[0] === 'string' && (
      args[0].includes('"shadow*" style props are deprecated') ||
      args[0].includes('Animated: `useNativeDriver` is not supported') ||
      args[0].includes('props.pointerEvents is deprecated')
    )) {
      return;
    }
    originalWarn(...args);
  };
}

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

  // === FIX PENTRU WARNING-UL `aria-hidden` NATIV DIN BROWSER ===
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const activeEl = document.activeElement as HTMLElement | null;
      if (activeEl && typeof activeEl.blur === 'function') {
        activeEl.blur();
      }
    }
  }, [segments]);
  // =============================================================

  const [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_700Bold,
    Mali_400Regular,
    Mali_500Medium,
    Mali_600SemiBold,
    Mali_700Bold,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
    PlayfairDisplay_700Bold,
    PlayfairDisplay_900Black,
  });

  const [isLayoutMounted, setIsLayoutMounted] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

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

  if (!fontsLoaded) {
    return null;
  }

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
        {Platform.OS === 'web' && (
          <style type="text/css">{`
            html, body, #root {
              height: 100dvh !important;
            }
          `}</style>
        )}
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