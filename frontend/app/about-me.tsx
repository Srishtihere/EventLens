import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function AboutMe() {
  const router = useRouter();
  const { token, setProfile } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [role, setRole] = useState<'organizer' | 'attendee' | null>(null);

  const handleCompleteProfile = async () => {
    if (!firstName || !lastName || !role) {
      Alert.alert('Error', 'Please fill in your name and select a role.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/user/profile/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          bio: bio,
          role: role
        }),
      });
      const data = await response.json();
      
      if (response.ok) {
        setProfile(data);
        router.push(role === 'organizer' ? '/organizer' : '/attendee');
      } else {
        Alert.alert('Error', 'Could not update profile');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error');
    }
  };

  return (
    <ScrollView className="flex-1 bg-black p-6 pt-16">
      <Text className="text-4xl font-black text-white mb-2 tracking-tighter">
        About Me
      </Text>
      <Text className="text-zinc-500 mb-8">
        Set up your profile to personalize your experience.
      </Text>

      <View className="flex-row mb-4">
        <TextInput
          className="flex-1 bg-zinc-950 text-white px-4 py-4 border border-zinc-800 mr-2"
          placeholder="First Name"
          placeholderTextColor="#71717a"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          className="flex-1 bg-zinc-950 text-white px-4 py-4 border border-zinc-800"
          placeholder="Last Name"
          placeholderTextColor="#71717a"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <TextInput
        className="bg-zinc-950 text-white px-4 py-4 border border-zinc-800 mb-8 h-32"
        placeholder="Bio"
        placeholderTextColor="#71717a"
        value={bio}
        onChangeText={setBio}
        multiline
        textAlignVertical="top"
      />

      <Text className="text-white font-bold mb-4 text-lg">Who are you?</Text>
      
      <View className="flex-row mb-10">
        <TouchableOpacity 
          className={`flex-1 p-6 border ${role === 'organizer' ? 'border-white bg-zinc-900' : 'border-zinc-800 bg-zinc-950'} mr-2 items-center`}
          onPress={() => setRole('organizer')}
        >
          <Text className="text-2xl mb-2">🎙️</Text>
          <Text className={`font-bold ${role === 'organizer' ? 'text-white' : 'text-zinc-500'}`}>Organizer</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className={`flex-1 p-6 border ${role === 'attendee' ? 'border-white bg-zinc-900' : 'border-zinc-800 bg-zinc-950'} items-center`}
          onPress={() => setRole('attendee')}
        >
          <Text className="text-2xl mb-2">🧠</Text>
          <Text className={`font-bold ${role === 'attendee' ? 'text-white' : 'text-zinc-500'}`}>Attendee</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        className="w-full bg-white py-4 rounded-none mb-20"
        onPress={handleCompleteProfile}
      >
        <Text className="text-black text-center font-bold text-lg tracking-wide uppercase">Complete Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
