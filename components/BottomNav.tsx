import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Link, usePathname } from 'expo-router'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UserCircle, MessageCircle, Layers, Bell, HeartHandshake } from 'lucide-react-native';
import { useAppStore } from '@/store/useAppStore'; 
// Importăm tipul corect pentru props
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

// Adăugăm (props: BottomTabBarProps) sau deconstruit:
export function BottomNav({ state, descriptors, navigation }: BottomTabBarProps) {
  const setView = useAppStore((s: any) => s.setView); 
  const pathname = usePathname(); 
  const insets = useSafeAreaInsets(); 

  const checkIsActive = (path: string) => {
    // Curățăm pathname-ul pentru comparație (uneori are '/' la final)
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.includes(path)) return true;
    return false;
  };

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      <View style={styles.navRow}>
        
        {/* 1. Donations */}
        <Link href="./donations" asChild>
          <TouchableOpacity style={styles.navItem}>
            <HeartHandshake 
              size={22} 
              color={checkIsActive('donations') ? '#5A2D82' : 'rgba(43,43,43,0.4)'} 
              strokeWidth={checkIsActive('donations') ? 2.5 : 2} 
            />
            <Text style={[styles.navText, checkIsActive('donations') && styles.navTextActive]}>
              Donations
            </Text>
          </TouchableOpacity>
        </Link>


        {/* 3. Swipe - Center Fixed */}
        <Link href="/" asChild onPress={() => setView('swipe')}>
          <TouchableOpacity style={styles.centerItem} activeOpacity={0.9}>
            <View style={[
              styles.centerCircle, 
              checkIsActive('/') ? styles.centerCircleActive : styles.centerCircleInactive
            ]}>
              <Layers 
                size={26} 
                color={checkIsActive('/') ? '#F4C542' : '#FAF7F2'} 
                strokeWidth={checkIsActive('/') ? 2.5 : 2} 
              />
            </View>
            <Text style={[styles.centerText, checkIsActive('/') && styles.centerTextActive]}>
              Swipe
            </Text>
          </TouchableOpacity>
        </Link>

        {/* 5. Profile */}
        <Link href="./profile" asChild>
          <TouchableOpacity style={styles.navItem}>
            <UserCircle 
              size={22} 
              color={checkIsActive('profile') ? '#5A2D82' : 'rgba(43,43,43,0.4)'} 
              strokeWidth={checkIsActive('profile') ? 2.5 : 2} 
            />
            <Text style={[styles.navText, checkIsActive('profile') && styles.navTextActive]}>
              Profile
            </Text>
          </TouchableOpacity>
        </Link>

      </View>
    </View>
  );
}

// ... păstrează restul stilurilor neschimbate
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignSelf: 'center',
    maxWidth: 448, // Păstrăm lățimea maximă pentru tablete/web (max-w-md)
    backgroundColor: '#FAF7F2',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    ...Platform.select({
      web: { boxShadow: '0px -10px 20px rgba(90, 45, 130, 0.1)' } as any,
      default: {
        shadowColor: '#5A2D82',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 20,
      }
    }),
    zIndex: 50,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    gap: 48,
  },
  navItem: {
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  navText: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: 'rgba(43,43,43,0.4)',
    marginTop: 2,
  },
  navTextActive: {
    color: '#5A2D82',
    transform: [{ scale: 1.1 }], // Efect de mărire ușoară când e activ
  },
  centerItem: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'flex-start',
    top: -24, // Îl ridicăm în afara barei (-top-6 din tailwind)
  },
  centerCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: '#FAF7F2',
    ...Platform.select({
      web: { boxShadow: '0px 8px 10px rgba(90, 45, 130, 0.25)' } as any,
      default: {
        shadowColor: '#5A2D82',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
      }
    }),
  },
  centerCircleActive: {
    backgroundColor: '#5A2D82',
  },
  centerCircleInactive: {
    backgroundColor: '#8E44AD',
  },
  centerText: {
    position: 'absolute',
    bottom: -16,
    fontSize: 9,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: 'rgba(43,43,43,0.4)',
  },
  centerTextActive: {
    color: '#5A2D82',
  }
});