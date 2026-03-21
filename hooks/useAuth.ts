import { useState } from 'react';
import { AUTH } from '@/config/firebase';
import { useAppStore } from '@/store/useAppStore';

const API_URL = 'https://wearwise-api.onrender.com';

const ERROR_MESSAGES: Record<string, string> = {
  'auth/email-already-in-use': 'This email address is already in use.',
  'auth/invalid-email': 'The email address is invalid.',
  'auth/operation-not-allowed': 'Email/password authentication is not enabled.',
  'auth/weak-password': 'Password should be at least 6 characters.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'The password entered is incorrect.',
  'auth/invalid-credential': 'Invalid credentials.',
  'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
  'auth/network-request-failed': 'Network problem. Check your internet connection.',
};

const getErrorMessage = (err: any) => {
  if (err.code && ERROR_MESSAGES[err.code]) {
    return ERROR_MESSAGES[err.code];
  }
  return err.message || 'An unexpected error occurred.';
};

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loginAppStore = useAppStore((state) => state.login);
  const logoutAppStore = useAppStore((state) => state.logout);

  const signUp = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    parola: string;
    tara: string;
    localitate: string;
    adresa: string;
    phone: string;
    latitude?: number;
    longitude?: number;
  }) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Create user in Firebase Auth (Client Side)
      const userCredential = await AUTH.createUserWithEmailAndPassword(data.email, data.parola);
      const user = userCredential.user;
      if (!user) throw new Error('Error creating account.');

      console.log('[useAuth] Calling backend /register...');
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: user.uid,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          country: data.tara,
          city: data.localitate,
          address: data.adresa,
          latitude: data.latitude,
          longitude: data.longitude,
        }),
      });

      const result = await response.json();
      console.log('[useAuth] Backend /register response:', response.status, result);
      
      if (!response.ok) {
        throw new Error(result.error || 'Error registering profile.');
      }

      // 3. Update app store
      loginAppStore(result.userData);
      return result.userData;
    } catch (err: any) {
      console.error('[useAuth] signUp error - code:', err?.code, '| message:', err?.message);
      const msg = getErrorMessage(err);
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (identifier: string, parola: string) => {
    console.log('[useAuth] signIn started for:', identifier);
    setLoading(true);
    setError(null);
    try {
      let email = identifier;

      if (!identifier.includes('@')) {
        console.log('[useAuth] Identifier is phone, resolving email...');
        const response = await fetch(`${API_URL}/user/${identifier}`);
        const result = await response.json();
        console.log('[useAuth] Phone resolve response:', response.status);
        if (!response.ok) throw new Error(result.error || 'Phone number not found.');
        email = result.email;
      }

      console.log('[useAuth] Signing in with Firebase Auth...');
      const userCredential = await AUTH.signInWithEmailAndPassword(email, parola);
      const user = userCredential.user;

      if (!user) throw new Error('Authentication error.');

      console.log('[useAuth] Fetching profile from backend /user/' + user.uid);
      const profileResponse = await fetch(`${API_URL}/user/${user.uid}`);
      const profileData = await profileResponse.json();
      console.log('[useAuth] Profile response:', profileResponse.status);
      
      if (profileResponse.ok) {
        loginAppStore(profileData);
        return profileData;
      } else {
        throw new Error('User data not found.');
      }
    } catch (err: any) {
      console.error('[useAuth] signIn error - code:', err?.code, '| message:', err?.message);
      const msg = getErrorMessage(err);
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await AUTH.signOut();
      logoutAppStore();
    } catch (err: any) {
      setError(getErrorMessage(err));
    }
  };

  return { signUp, signIn, signOut, loading, error };
};
