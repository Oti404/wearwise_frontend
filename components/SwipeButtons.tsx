import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { X, Heart } from 'lucide-react-native';

interface SwipeButtonsProps {
  onLike: () => void;
  onSkip: () => void;
}

const SwipeButtons = ({ onLike, onSkip }: SwipeButtonsProps) => {
  return (
    <View style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity style={[styles.btn, styles.skipBtn]} onPress={onSkip} activeOpacity={0.85}>
        <X size={30} color="#FF4B4B" strokeWidth={3} />
      </TouchableOpacity>

      {/* Want Button */}
      <TouchableOpacity style={[styles.btn, styles.wantBtn]} onPress={onLike} activeOpacity={0.85}>
        <Heart size={30} color="#F4C542" fill="#F4C542" />
      </TouchableOpacity>
    </View>
  );
};

export default SwipeButtons;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
  btn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.18,
        shadowRadius: 18,
      },
      android: { elevation: 8 },
    }),
  },
  skipBtn: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: 'rgba(255, 75, 75, 0.25)',
    shadowColor: '#FF4B4B',
  },
  wantBtn: {
    backgroundColor: '#5A2D82',
    borderWidth: 2,
    borderColor: '#7D3FB5',
    shadowColor: '#5A2D82',
  },
});