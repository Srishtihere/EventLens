import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const MOCK_EVENTS = [
  { _id: '1', title: 'React Conf 2026', date: '2026-06-10', location: 'Virtual' }
];

export default function AttendeeDashboard() {
  const router = useRouter();
  const { profile } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = MOCK_EVENTS.filter(e => e.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <View className="flex-1 bg-black p-6">
      {/* Navbar Placeholder */}
      <View className="flex-row justify-between items-center py-4 border-b border-zinc-800 mb-6">
        <Text className="text-white font-black text-xl tracking-tighter">EventLens</Text>
        <Text className="text-zinc-500 font-medium">Attendee</Text>
      </View>

      <View className="mb-10">
        <Text className="text-zinc-500 text-lg uppercase tracking-widest font-bold">Welcome back,</Text>
        <Text className="text-5xl font-black text-white tracking-tighter">{profile?.first_name || 'Attendee'}</Text>
      </View>
      <View className="mb-8">
        <Text className="text-4xl font-black text-white tracking-tighter mb-4">Discover Events</Text>
        <TextInput 
          className="bg-zinc-900 text-white p-4 rounded-none border border-zinc-700"
          placeholder="Search events or talks..."
          placeholderTextColor="#71717a"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView className="flex-1">
        {filteredEvents.map(event => (
          <TouchableOpacity 
            key={event._id}
            className="bg-zinc-950 p-6 rounded-none mb-4 border border-zinc-800"
            onPress={() => router.push(`/attendee/event/${event._id}`)}
          >
            <Text className="text-2xl font-bold text-white mb-2">{event.title}</Text>
            <Text className="text-zinc-400">{event.date} • {event.location}</Text>
          </TouchableOpacity>
        ))}
        {filteredEvents.length === 0 && (
          <Text className="text-zinc-500 text-center mt-10">No events found.</Text>
        )}
      </ScrollView>
    </View>
  );
}
