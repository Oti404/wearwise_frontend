import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  HeartHandshake,
  Plus,
  MapPin,
  Gift,
  Trash2,
  Sparkles,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '@/store/useAppStore';
import { useClothes, ClothingItem } from '@/hooks/useClothes';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 60) / 2;

export function DonationsView() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  const user = useAppStore((state) => state.user);
  const { fetchUserCloset, loading } = useClothes();

  // Local state for the filtered items
  const [items, setItems] = useState<ClothingItem[]>([]);

  useEffect(() => {
    if (user?.uid) {
      loadDonationBasket();
    }
  }, [user]);

  const loadDonationBasket = async () => {
    if (!user?.uid) return;
    const allItems = await fetchUserCloset(user.uid);
    // Filter only items uploaded as donations
    const donations = allItems.filter(item => item.mode === 'donate');
    setItems(donations);
  };

  const removeFromDonations = (id: string) => {
    // For now we just remove it locally from the view
    // A proper DB 'delete' or 'hide' API call should be here
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
  };

  const donationCenters = [
    { id: 1, name: "Red Cross", distance: "1.2 km", address: "Str. George Coșbuc" },
    { id: 2, name: "Clothing Bank Container", distance: "2.5 km", address: "Mărăști Parking" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* PREMIUM HEADER */}
        <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
          <View style={styles.headerTop}>
            <View>
              <View style={styles.headerTitleRow}>
                <HeartHandshake size={32} color="#F4C542" />
                <Text style={styles.headerTitle}>Donations</Text>
              </View>
              <Text style={styles.headerSubtitle}>
                Turn your wardrobe into a positive change.
              </Text>
            </View>
          </View>

          {/* IMPACT CARD */}
          <View style={styles.impactCard}>
            <View>
              <Text style={styles.impactTag}>YOUR IMPACT</Text>
              <Text style={styles.impactValue}>
                {items.length}
                <Text style={styles.impactUnit}> ITEMS</Text>
              </Text>
            </View>
            <View style={styles.impactIconBox}>
              <Gift size={28} color="#5A2D82" />
            </View>
          </View>
        </View>

        {/* DONATION BASKET */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Donation Basket</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => router.push('/add-item')}
            >
              <Plus size={14} color="#8E44AD" strokeWidth={3} />
              <Text style={styles.addButtonText}>ADD</Text>
            </TouchableOpacity>
          </View>

          {items.length > 0 ? (
            <View style={styles.grid}>
              {items.map((item) => {
                // Rezolvare sursă imagine pentru baza de date (images array)
                const imageUrl = item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/150';
                const imageSource = typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl;

                return (
                  <TouchableOpacity 
                    key={item.id} 
                    style={styles.itemCard}
                    activeOpacity={0.9}
                    onPress={() => item.id && router.push({ pathname: '/item/[id]', params: { id: item.id } })}
                  >
                    <View style={styles.imageContainer}>
                      <Image 
                        source={imageSource} 
                        style={styles.itemImage} 
                        resizeMode="contain"
                      />
                      <TouchableOpacity 
                        style={styles.deleteBtn}
                        onPress={() => item.id && removeFromDonations(item.id)}
                      >
                        <Trash2 size={12} color="#E74C3C" strokeWidth={2.5} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                      <View style={styles.itemMeta}>
                        <Text style={styles.metaText}>{item.category}</Text>
                        <View style={styles.metaDot} />
                        <Text style={styles.metaText}>Mărimea {item.size}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconBox}>
                <Sparkles size={32} color="rgba(142, 68, 173, 0.3)" />
              </View>
              <Text style={styles.emptyText}>
                Your wardrobe is waiting for a kind gesture.
              </Text>
            </View>
          )}

          {/* CONFIRM BUTTON */}
          <TouchableOpacity 
            style={[styles.confirmBtn, items.length === 0 && styles.confirmBtnDisabled]}
            disabled={items.length === 0}
            activeOpacity={0.8}
          >
            <Text style={styles.confirmBtnText}>CONFIRM DONATION</Text>
            <View style={styles.confirmBadge}>
              <Text style={styles.confirmBadgeText}>{items.length}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* DROP-OFF LOCATIONS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Drop-off Locations</Text>
          <View style={styles.centersContainer}>
            {donationCenters.map((center) => (
              <TouchableOpacity key={center.id} style={styles.centerCard} activeOpacity={0.7}>
                <View style={styles.centerIconBox}>
                  <MapPin size={22} color="#5A2D82" />
                </View>
                <View style={styles.centerInfo}>
                  <Text style={styles.centerName}>{center.name}</Text>
                  <Text style={styles.centerAddress}>{center.address}</Text>
                </View>
                <View style={styles.distanceBadge}>
                  <Text style={styles.distanceText}>{center.distance}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF7F2' },
  scrollContent: { paddingBottom: 120 },
  header: {
    backgroundColor: '#5A2D82',
    paddingHorizontal: 24,
    paddingBottom: 40,
    borderBottomLeftRadius: 48,
    borderBottomRightRadius: 48,
  },
  headerTop: { marginBottom: 24 },
  headerTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerTitle: { fontSize: 32, fontWeight: 'bold', color: '#FAF7F2', letterSpacing: -1 },
  headerSubtitle: { color: 'rgba(250, 247, 242, 0.7)', fontSize: 14, marginTop: 8, fontWeight: '500' },
  impactCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 32,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
  },
  impactTag: { color: '#F4C542', fontSize: 10, fontWeight: '900', letterSpacing: 2 },
  impactValue: { color: '#FAF7F2', fontSize: 36, fontWeight: '900', marginTop: 4 },
  impactUnit: { fontSize: 16, color: 'rgba(250, 247, 242, 0.6)', fontWeight: '800' },
  impactIconBox: { backgroundColor: '#F4C542', padding: 14, borderRadius: 22, shadowColor: '#F4C542', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  section: { paddingHorizontal: 24, marginTop: 40 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: '#2B2B2B', letterSpacing: 0.5, textTransform: 'uppercase' },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(90, 45, 130, 0.1)',
  },
  addButtonText: { fontSize: 10, fontWeight: '900', color: '#5A2D82', letterSpacing: 1 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  itemCard: {
    width: (width - 48 - 16) / 2,
    backgroundColor: '#FFF',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  imageContainer: { width: '100%', height: 180, backgroundColor: '#F0EBE3', justifyContent: 'center', alignItems: 'center' },
  itemImage: { width: '100%', height: '100%' },
  deleteBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 8,
    borderRadius: 10,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemInfo: { padding: 12 },
  itemName: { fontSize: 13, fontWeight: '700', color: '#2B2B2B', marginBottom: 2 },
  itemMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { fontSize: 10, color: 'rgba(43, 43, 43, 0.5)', fontWeight: '800' },
  metaDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: 'rgba(90, 45, 130, 0.2)' },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 30,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(90, 45, 130, 0.1)',
  },
  emptyIconBox: { backgroundColor: '#FFF', padding: 20, borderRadius: 24, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(90, 45, 130, 0.05)' },
  emptyText: { color: 'rgba(43, 43, 43, 0.3)', fontSize: 14, textAlign: 'center', fontWeight: '700', paddingHorizontal: 40 },
  confirmBtn: {
    marginTop: 32,
    backgroundColor: '#5A2D82',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 24,
    gap: 12,
    shadowColor: '#5A2D82',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  confirmBtnDisabled: { backgroundColor: '#E5E7EB', shadowOpacity: 0, elevation: 0 },
  confirmBtnText: { color: '#F4C542', fontSize: 14, fontWeight: '900', letterSpacing: 2 },
  confirmBadge: { backgroundColor: '#F4C542', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  confirmBadgeText: { color: '#5A2D82', fontSize: 10, fontWeight: '900' },
  centersContainer: { gap: 12, marginTop: 10 },
  centerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(90, 45, 130, 0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  centerIconBox: { width: 44, height: 44, backgroundColor: '#FAF7F2', borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  centerInfo: { flex: 1, marginLeft: 16 },
  centerName: { fontSize: 15, fontWeight: '800', color: '#2B2B2B', letterSpacing: -0.2 },
  centerAddress: { fontSize: 11, color: 'rgba(43, 43, 43, 0.4)', marginTop: 2, fontWeight: '700' },
  distanceBadge: { backgroundColor: 'rgba(90, 45, 130, 0.05)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(90, 45, 130, 0.05)' },
  distanceText: { fontSize: 10, fontWeight: '900', color: '#5A2D82' },
});