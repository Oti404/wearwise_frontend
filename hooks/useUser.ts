import { useState } from 'react';
import { Platform } from 'react-native';
import { STORAGE } from '@/config/firebase';
import { useAppStore } from '@/store/useAppStore';

const API_URL = 'https://wearwise-api.onrender.com';

export interface User {
  uid: string;
  email: string | null;
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  avatarUrl?: string;
  latitude?: number;
  longitude?: number;
}

export const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const login = useAppStore((state) => state.login);

  /**
   * Uploads a single local image URI to Firebase Storage for the profile avatar.
   * Works universally on Web and Expo Go (Android/iOS).
   */
  const uploadAvatarImage = async (localUri: string, userId: string): Promise<string> => {
    const timestamp = Date.now();
    const path = `avatars/${userId}/avatar_${timestamp}.jpg`;
    console.log(`[useUser] Uploading avatar to storage at: ${path}`);

    try {
      // ABORDARE UNIVERSALĂ: Folosim fetch + blob pentru compatibilitate cu Expo Go și Web
      const response = await fetch(localUri);
      const blob = await response.blob();
      
      const storageRef = STORAGE.ref(path);
      
      // Folosim .put(blob) în loc de .putFile(localUri)
      await storageRef.put(blob);
      
      const downloadUrl = await storageRef.getDownloadURL();
      console.log(`[useUser] Avatar uploaded successfully:`, downloadUrl);
      return downloadUrl;
    } catch (err: any) {
      console.error('[useUser] uploadAvatarImage error:', err.message);
      throw err;
    }
  };

  /**
   * Updates the user profile in the backend and local store.
   */
  const updateProfile = async (uid: string, updates: Partial<User>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/user/${uid}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Eroare la actualizarea profilului.');

      // Update local store
      login(result);
      console.log('[useUser] Profile updated successfully');
      return result;
    } catch (err: any) {
      console.error('[useUser] updateProfile error:', err.message);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Full flow: upload image and then update profile URL.
   */
  const changeAvatar = async (uid: string, localUri: string) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Upload to storage
      const downloadUrl = await uploadAvatarImage(localUri, uid);
      
      // 2. Save URL to database
      return await updateProfile(uid, { avatarUrl: downloadUrl });
    } catch (err: any) {
      console.error('[useUser] changeAvatar error:', err.message);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    updateProfile,
    changeAvatar,
  };
};