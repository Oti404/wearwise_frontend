import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Dimensions,
  Platform,
} from 'react-native';
import { X, MapPin, ShoppingBag, ArrowRightLeft, Star, Info, ShieldCheck } from "lucide-react-native";
import { ClothingItem } from "@/data/clothes";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height } = Dimensions.get('window');

export const ProductDetails = ({ 
  item, 
  onClose, 
  onAction,
  visible 
}: { 
  item: ClothingItem; 
  onClose: () => void; 
  onAction: () => void;
  visible: boolean;
}) => {
  const insets = useSafeAreaInsets();

  // Rezolvare sursă imagine pentru Web/Mobile
  const imageSource = typeof item.image === 'string' ? { uri: item.image } : item.image;

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={[styles.container, { paddingTop: 0 }]}>
        
        {/* Image Header */}
        <View style={styles.imageHeader}>
          <Image 
            source={imageSource} 
            style={styles.mainImage} 
            resizeMode="cover"
          />
          
          {/* Close Button */}
          <TouchableOpacity 
            onPress={onClose} 
            style={[styles.closeButton, { top: insets.top + 10 }]}
          >
            <X size={24} color="white" />
          </TouchableOpacity>

          {/* Category Badge */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>

        {/* Content Section */}
        <ScrollView 
          style={styles.contentScroll}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 120 }]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.titleRow}>
            <View style={styles.titleInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <View style={styles.subInfoRow}>
                <MapPin size={14} color="#8E44AD" />
                <Text style={styles.subInfoText}>{item.distance} km • Size {item.size}</Text>
              </View>
            </View>
            <Text style={styles.priceText}>
              {item.price > 0 ? `${item.price} RON` : "TRADE"}
            </Text>
          </View>

          {/* Seller Card */}
          <View style={styles.sellerCard}>
            <View style={styles.sellerTopRow}>
              <View style={styles.sellerInfo}>
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarInitial}>{item.seller.charAt(0)}</Text>
                </View>
                <View>
                  <Text style={styles.sellerName}>@{item.seller}</Text>
                  <View style={styles.starsRow}>
                    <Star size={12} color="#F4C542" fill="#F4C542" />
                    <Star size={12} color="#F4C542" fill="#F4C542" />
                    <Star size={12} color="#F4C542" fill="#F4C542" />
                    <Star size={12} color="#F4C542" fill="#F4C542" />
                    <Star size={12} color="#F4C542" fill="#F4C542" style={{ opacity: 0.3 }} />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.verifiedBadge}>
              <ShieldCheck size={14} color="#8E44AD" />
              <Text style={styles.verifiedText}>WearWise Verified Seller</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <View style={styles.sectionHeader}>
              <Info size={14} color="rgba(43, 43, 43, 0.4)" />
              <Text style={styles.sectionTitle}>Description</Text>
            </View>
            <Text style={styles.descriptionText}>
              "This item is in pristine condition. I'm interested in swaps for similar items in size {item.size} or a direct sale."
            </Text>
          </View>
        </ScrollView>

        {/* Action Button Footer */}
        <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
          <TouchableOpacity 
            onPress={onAction} 
            style={styles.mainActionButton}
            activeOpacity={0.9}
          >
            {item.listing === 'trade' ? <ArrowRightLeft size={20} color="#F4C542" /> : <ShoppingBag size={20} color="#F4C542" />}
            <Text style={styles.mainActionText}>
              {item.listing === 'trade' ? 'Propose Trade' : 'Add to Cart'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F2',
  },
  imageHeader: {
    height: height * 0.45,
    width: '100%',
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    zIndex: 10,
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    backgroundColor: '#F4C542',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  categoryText: {
    color: '#5A2D82',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  contentScroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  titleInfo: {
    maxWidth: '70%',
  },
  itemName: {
    fontSize: 28,
    fontWeight: '900',
    color: '#2B2B2B',
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  subInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 6,
  },
  subInfoText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8E44AD',
    textTransform: 'uppercase',
  },
  priceText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#5A2D82',
    letterSpacing: -1,
  },
  sellerCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(90, 45, 130, 0.05)',
    ...Platform.select({
      ios: { shadowColor: '#5A2D82', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10 },
      android: { elevation: 3 }
    })
  },
  sellerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#5A2D82',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    color: '#F4C542',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sellerName: {
    fontSize: 14,
    fontWeight: '900',
    color: '#2B2B2B',
    textTransform: 'uppercase',
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
    marginTop: 2,
  },
  chatButton: {
    padding: 12,
    backgroundColor: '#FAF7F2',
    borderRadius: 16,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(142, 68, 173, 0.05)',
    padding: 10,
    borderRadius: 12,
  },
  verifiedText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#8E44AD',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  descriptionSection: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '900',
    color: 'rgba(43, 43, 43, 0.4)',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  descriptionText: {
    fontSize: 14,
    color: 'rgba(43, 43, 43, 0.6)',
    lineHeight: 22,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 20,
    backgroundColor: '#FAF7F2',
  },
  mainActionButton: {
    height: 64,
    backgroundColor: '#5A2D82',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#5A2D82',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
  mainActionText: {
    color: '#F4C542',
    fontSize: 14,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
  }
});