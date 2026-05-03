import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth, storage } from '../context/AuthContext';

export default function AuthWall() {
  const router = useRouter();
  const { setToken, setProfile } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchProfile = async (token: string) => {
    try {
      const response = await fetch('http://localhost:8000/api/user/profile/', {
        headers: { 'Authorization': `Token ${token}` },
      });
      const profileData = await response.json();
      setProfile(profileData);
      
      if (!profileData.role) {
        router.push('/about-me');
      } else {
        router.push(profileData.role === 'organizer' ? '/organizer' : '/attendee');
      }
    } catch (e) {
      console.error("Profile fetch error", e);
      router.push('/about-me');
    }
  };

  const handleAuth = async () => {
    if (!isLogin && password !== passwordConfirm) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    const endpoint = isLogin ? 'login/' : 'registration/';
    const body = isLogin 
      ? { email, password } 
      : { email, password1: password, password2: passwordConfirm };

    try {
      const response = await fetch(`http://localhost:8000/api/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      
      if (response.ok) {
        const token = data.access_token || data.access || data.key;
        await storage.setItem('token', token);
        setToken(token);
        await fetchProfile(token);
      } else {
        Alert.alert('Error', JSON.stringify(data));
      }
    } catch (error) {
      Alert.alert('Error', 'Network error connecting to backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-black p-6">
      <View className="bg-zinc-950 p-10 rounded-none w-full max-w-md items-center border border-zinc-800 shadow-xl shadow-white/5">
        <Text className="text-5xl font-black text-white mb-2 tracking-tighter">
          EventLens
        </Text>
        <Text className="text-zinc-500 text-center mb-10 text-base">
          {isLogin ? 'Sign in to continue' : 'Create your account'}
        </Text>

        <View className="w-full">
          <TextInput
            className="w-full bg-black text-white px-4 py-4 border border-zinc-800 mb-4 rounded-none"
            placeholder="Email address"
            placeholderTextColor="#71717a"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            className="w-full bg-black text-white px-4 py-4 border border-zinc-800 mb-4 rounded-none"
            placeholder="Password"
            placeholderTextColor="#71717a"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {!isLogin && (
            <TextInput
              className="w-full bg-black text-white px-4 py-4 border border-zinc-800 mb-6 rounded-none"
              placeholder="Confirm Password"
              placeholderTextColor="#71717a"
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
              secureTextEntry
            />
          )}

          <TouchableOpacity 
            className="w-full bg-white py-4 rounded-none mb-6"
            onPress={handleAuth}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="black" />
            ) : (
              <Text className="text-black text-center font-bold text-lg tracking-wide uppercase">
                {isLogin ? 'Sign In' : 'Register'}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center">
          <Text className="text-zinc-500">{isLogin ? "Don't have an account? " : "Already have an account? "}</Text>
          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text className="text-white font-bold">{isLogin ? 'Register' : 'Sign In'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
