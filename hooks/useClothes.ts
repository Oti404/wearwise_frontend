import { useState } from 'react';
import { Platform } from 'react-native';
import { useAppStore } from '@/store/useAppStore';
import { STORAGE } from '@/config/firebase';

const API_URL = 'https://wearwise-api.onrender.com';

export interface ClothingItem {
  id?: string;
  userId: string;
  name: string;
  description: string;
  images: string[];
  category: string;
  size: string;
  condition: string;
  mode: 'trade' | 'sell' | 'both' | 'donate';
  price: number | null;
  status: 'active' | 'hidden' | 'sold' | 'deleted';
  buyerId?: string;
  createdAt?: any;
  distance?: number;
  latitude?: number;
  longitude?: number;
  owner?: {
    firstName: string;
    lastName: string;
    avatarUrl?: string;
  };
}

/**
 * Uploads a single local image URI to Firebase Storage.
 * Works universally on Web and Expo Go (Android/iOS).
 */
const uploadSingleImage = async (
  localUri: string,
  userId: string,
  index: number
): Promise<string> => {
  const timestamp = Date.now();
  const path = `clothes/${userId}/${timestamp}_${index}.jpg`;
  console.log(`[useClothes] Uploading image ${index + 1} to storage at: ${path}`);

  // ABORDARE UNIVERSALĂ: Transformăm URI-ul local în Blob pentru Firebase Web SDK
  // Funcționează atât pe Web cât și pe Android/iOS în Expo Go
  const response = await fetch(localUri);
  const blob = await response.blob();
  
  const storageRef = STORAGE.ref(path);
  
  // Folosim .put(blob) în loc de .putFile(localUri)
  await storageRef.put(blob);
  
  const downloadUrl = await storageRef.getDownloadURL();
  console.log(`[useClothes] Image ${index + 1} uploaded:`, downloadUrl);
  return downloadUrl;
};

/**
 * Calculates distance between two points (lat/lng) in km using Haversine formula.
 */
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const useClothes = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number } | null>(null);
  const user = useAppStore((state) => state.user);

  /**
   * Uploads multiple local image URIs to Firebase Storage.
   * Returns array of public download URLs.
   */
  const uploadImages = async (localUris: string[], userId: string): Promise<string[]> => {
    const downloadUrls: string[] = [];
    setUploadProgress({ current: 0, total: localUris.length });

    for (let i = 0; i < localUris.length; i++) {
      const uri = localUris[i];
      // Skip if it's already a remote URL (not a local file)
      if (uri.startsWith('http://') || uri.startsWith('https://')) {
        downloadUrls.push(uri);
      } else {
        const url = await uploadSingleImage(uri, userId, i);
        downloadUrls.push(url);
      }
      setUploadProgress({ current: i + 1, total: localUris.length });
    }

    setUploadProgress(null);
    return downloadUrls;
  };

  const addClothes = async (data: Omit<ClothingItem, 'id' | 'userId' | 'status' | 'createdAt'>) => {
    if (!user) {
      setError('Trebuie să fii autentificat pentru a adăuga haine.');
      return null;
    }

    setLoading(true);
    setError(null);
    try {
      // Step 1: Upload images to Firebase Storage
      console.log('[useClothes] Starting image upload. Count:', data.images.length);
      const imageUrls = await uploadImages(data.images, user.uid);
      console.log('[useClothes] All images uploaded. URLs:', imageUrls);

      // Step 2: Save item to backend/Firestore with real download URLs
      const response = await fetch(`${API_URL}/clothes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.uid,
          ...data,
          images: imageUrls, // Always use the uploaded URLs
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Eroare la salvarea hainei.');

      console.log('[useClothes] Clothing item saved successfully:', result.id);
      return result;
    } catch (err: any) {
      console.error('[useClothes] addClothes error:', err?.message);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
      setUploadProgress(null);
    }
  };

  const fetchExploreFeed = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/clothes?excludeUser=${user?.uid || ''}`);
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Eroare la încărcarea feed-ului.');
      
      let clothes = result as ClothingItem[];

      // Calculate distances if user has location set
      if (user?.latitude && user?.longitude) {
        clothes = clothes.map(item => {
          if (item.latitude && item.longitude) {
            return {
              ...item,
              distance: calculateDistance(user.latitude!, user.longitude!, item.latitude, item.longitude)
            };
          }
          return item;
        });
      }

      return clothes;
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchUserCloset = async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/user-closet/${userId}`);
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Eroare la încărcarea garderobei.');
      return result as ClothingItem[];
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchItemDetails = async (id: string): Promise<ClothingItem | null> => {
    try {
      setLoading(true);
      setError(null);
      const url = `${API_URL}/clothes/${id}`;
      console.log(`[useClothes] Fetching item details from: ${url}`);
      const response = await fetch(url);
      
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error('Nu s-a putut descărca detaliile hainei.');
      }
      
      const item: ClothingItem = await response.json();
      return item;
    } catch (err: any) {
      console.error('Fetch item details error:', err);
      setError(err.message || 'A apărut o eroare necunoscută.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const checkout = async (userId: string, items: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, items }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Eroare la procesarea comenzii.');
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reList = async (userId: string, itemId: string, updates?: Partial<ClothingItem>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/re-list`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, itemId, updates }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Eroare la re-listarea articolului.');
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async (userId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/notifications/${userId}`);
      if (!response.ok) throw new Error('Nu am putut încărca notificările.');
      return await response.json();
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const submitRating = async (ratingData: {
    raterId: string;
    targetUserId: string;
    itemId?: string;
    rating: number;
    comment?: string;
    notificationId?: string;
  }) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/ratings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ratingData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRatings = async (userId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/user-ratings/${userId}`);
      if (!response.ok) throw new Error('Nu am putut încărca rating-urile.');
      return await response.json();
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    uploadProgress,
    addClothes,
    fetchExploreFeed,
    fetchUserCloset,
    fetchItemDetails,
    checkout,
    reList,
    fetchNotifications,
    submitRating,
    fetchUserRatings,
  };
};