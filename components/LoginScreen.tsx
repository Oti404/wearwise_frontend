import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Sparkles } from 'lucide-react-native';
import { AuthInput, AuthButton } from './AuthUI';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { signIn, loading } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [identifierError, setIdentifierError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = async () => {
    console.log('[LoginScreen] handleLogin clicked');
    setIdentifierError('');
    setPasswordError('');

    if (!identifier) {
      setIdentifierError('Introdu email-ul sau numărul de telefon.');
      return;
    }
    if (!password) {
      setPasswordError('Introdu parola.');
      return;
    }

    try {
      await signIn(identifier, password);
    } catch (err: any) {
      const msg = err.message;
      if (msg.includes('email') || msg.includes('cont') || msg.includes('identificare')) {
        setIdentifierError(msg);
      } else if (msg.includes('parolă') || msg.includes('parola')) {
        setPasswordError(msg);
      } else {
        Alert.alert('Eroare la autentificare', msg);
      }
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 60 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Sparkles size={42} color="#F4C542" />
          </View>
          <Text style={styles.brandTitle}>
            <Text style={styles.brandAccent}>W</Text>ear<Text style={styles.brandAccent}>W</Text>ise
          </Text>
          <Text style={styles.subtitle}>
            Conectează-te pentru a descoperi moda sustenabilă.
          </Text>
        </View>

        <View style={styles.form}>
          <AuthInput 
            label="Email sau Telefon" 
            placeholder="email@exemplu.com sau 07xxxxxxxx" 
            autoCapitalize="none"
            value={identifier}
            error={identifierError}
            onChangeText={(v) => { setIdentifier(v); setIdentifierError(''); }}
          />

          <AuthInput 
            label="Parolă" 
            placeholder="••••••••" 
            secureTextEntry
            value={password}
            error={passwordError}
            onChangeText={(v) => { setPassword(v); setPasswordError(''); }}
          />

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Ai uitat parola?</Text>
          </TouchableOpacity>

          <AuthButton 
            title="Autentificare" 
            onPress={handleLogin} 
            loading={loading}
          />

          <View style={styles.registerLinkContainer}>
            <TouchableOpacity onPress={() => router.push('/register')}>
              <Text style={styles.registerLinkText}>
                Nu ai cont? <Text style={styles.registerLinkBold}>Înregistrează-te</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F2',
  },
  scrollContent: {
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 88,
    height: 88,
    backgroundColor: '#5A2D82',
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#5A2D82',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  brandTitle: {
    fontSize: 42,
    fontWeight: '900',
    color: '#2B2B2B',
    letterSpacing: -1.5,
    marginBottom: 8,
  },
  brandAccent: {
    color: '#8E44AD',
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(43, 43, 43, 0.5)',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    width: '100%',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#8E44AD',
    fontSize: 14,
    fontWeight: '700',
  },
  registerLinkContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  registerLinkText: {
    fontSize: 15,
    color: 'rgba(43, 43, 43, 0.6)',
    fontWeight: '500',
  },
  registerLinkBold: {
    color: '#8E44AD',
    fontWeight: '800',
  }
});

export default LoginScreen;