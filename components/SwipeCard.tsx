import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Heart, X, MapPin, ShoppingBag, ArrowRightLeft, Gift, Tag } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { ClothingItem } from "@/hooks/useClothes";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SwipeCardProps {
  item: ClothingItem;
  cardWidth?: number;
  cardHeight?: number;
}

const SwipeCard = ({ item, cardWidth, cardHeight }: SwipeCardProps) => {
  const router = useRouter();

  if (!item) return null;

  const imageUrl = item.images && item.images.length > 0
    ? item.images[0]
    : 'https://via.placeholder.com/400x711';
  const imageSource = typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl;

  const W = cardWidth ?? SCREEN_WIDTH - 32;
  const H = cardHeight ?? W * (16 / 9);

  const isTrade = item.mode === 'trade' || item.mode === 'both';
  const isBuy = item.mode === 'sell' || item.mode === 'both';
  const isDonate = item.mode === 'donate';

  return (
    <TouchableOpacity
      activeOpacity={0.97}
      onPress={() => item.id && router.push({ pathname: '/item/[id]', params: { id: item.id } })}
      style={[styles.cardTouchable, { width: W, height: H }]}
    >
      <View style={[styles.card, { width: W, height: H }]}>
        {/* ── Main Image ── */}
        <Image
          source={imageSource}
          style={StyleSheet.absoluteFillObject}
          resizeMode="cover"
        />

        {/* ── Gradient Overlay (simulated) ── */}
        <View style={styles.gradientTop} />
        <View style={styles.gradientBottom} />

        {/* ── Mode Badges (top-left) ── */}
        <View style={styles.badgesContainer}>
          {isTrade && (
            <View style={[styles.badge, styles.tradeBadge]}>
              <ArrowRightLeft size={9} color="#FAF7F2" />
              <Text style={styles.badgeText}>TRADE</Text>
            </View>
          )}
          {isBuy && (
            <View style={[styles.badge, styles.buyBadge]}>
              <ShoppingBag size={9} color="#5A2D82" />
              <Text style={[styles.badgeText, { color: '#5A2D82' }]}>BUY</Text>
            </View>
          )}
          {isDonate && (
            <View style={[styles.badge, styles.donateBadge]}>
              <Gift size={9} color="#FAF7F2" />
              <Text style={styles.badgeText}>DONAȚIE</Text>
            </View>
          )}
        </View>

        {/* ── Info Overlay (bottom) ── */}
        <View style={styles.infoOverlay}>
          <View style={styles.infoContent}>
            {/* Size tag */}
            {item.size ? (
              <View style={styles.sizeTag}>
                <Tag size={10} color="#F4C542" />
                <Text style={styles.sizeText}>{item.size.toUpperCase()}</Text>
              </View>
            ) : null}

            {/* Item name */}
            <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>

            {/* Price + Distance row */}
            <View style={styles.priceRow}>
              <Text style={styles.priceText}>
                {(item.price !== null && item.price !== undefined && item.price > 0)
                  ? `${item.price} RON`
                  : item.mode === 'donate' ? 'DONAȚIE' : 'TRADE'}
              </Text>

              {item.distance !== undefined && (
                <View style={styles.distancePill}>
                  <MapPin size={11} color="#F4C542" />
                  <Text style={styles.distanceText}>{item.distance.toFixed(1)} km</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SwipeCard;

const styles = StyleSheet.create({
  cardTouchable: {
    alignSelf: 'center',
  },
  card: {
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: '#1A1A2E',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.22,
    shadowRadius: 28,
    elevation: 12,
  },

  // ── Gradient Simulation ─────────────────────────────────────────
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '30%',
    backgroundColor: 'rgba(0,0,0,0.28)',
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '55%',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },

  // ── Badges ─────────────────────────────────────────────────────
  badgesContainer: {
    position: 'absolute',
    top: 18,
    left: 18,
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 5,
  },
  tradeBadge: {
    backgroundColor: '#5A2D82',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  buyBadge: {
    backgroundColor: '#F4C542',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  donateBadge: {
    backgroundColor: '#E74C3C',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#FAF7F2',
    letterSpacing: 1,
  },

  // ── Info Overlay ────────────────────────────────────────────────
  infoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 22,
    paddingTop: 16,
  },
  infoContent: {
    gap: 6,
  },
  sizeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 2,
  },
  sizeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#F4C542',
    letterSpacing: 1.5,
  },
  itemName: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: -0.3,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  priceText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#F4C542',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  distancePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  distanceText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: 0.3,
  },
});