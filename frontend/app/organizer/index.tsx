import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const MOCK_EVENTS = [
  { _id: '1', title: 'React Conf 2026', date: '2026-06-10', location: 'Virtual' }
];

export default function OrganizerDashboard() {
  const router = useRouter();
  const { profile } = useAuth();
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [loading, setLoading] = useState(false);

  return (
    <View className="flex-1 bg-black p-6">
      {/* Navbar Placeholder */}
      <View className="flex-row justify-between items-center py-4 border-b border-zinc-800 mb-6">
        <Text className="text-white font-black text-xl tracking-tighter">EventLens</Text>
        <Text className="text-zinc-500 font-medium">Organizer</Text>
      </View>

      <View className="mb-8">
        <Text className="text-zinc-500 text-lg uppercase tracking-widest font-bold">Welcome back,</Text>
        <Text className="text-5xl font-black text-white tracking-tighter">{profile?.first_name || 'Organizer'}</Text>
      </View>

      <View className="flex-row justify-between items-center mb-10">
        <Text className="text-3xl font-black text-zinc-500 tracking-tighter">Events</Text>
        <TouchableOpacity 
          className="bg-white px-5 py-3 rounded-none"
          onPress={() => router.push('/organizer/create-event')}
        >
          <Text className="text-black font-bold uppercase tracking-wider text-xs">+ New Event</Text>
        </TouchableOpacity>
      </View>

      {/* Global Attendee Tracking Summary */}
      <View className="bg-zinc-950 p-6 rounded-none border border-zinc-800 mb-8">
        <Text className="text-xl font-black text-white mb-4 uppercase tracking-wider">Audience Tracking</Text>
        <View className="flex-row justify-between">
          <View className="items-center">
            <Text className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Total Attendees</Text>
            <Text className="text-3xl font-black text-white">1,204</Text>
          </View>
          <View className="items-center">
            <Text className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Sessions Watched</Text>
            <Text className="text-3xl font-black text-white">4,892</Text>
          </View>
          <View className="items-center">
            <Text className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Avg per User</Text>
            <Text className="text-3xl font-black text-white">4.1</Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1">
        {events.map(event => (
          <TouchableOpacity 
            key={event._id}
            className="bg-zinc-900 p-6 rounded-none mb-4 border border-zinc-800"
            onPress={() => router.push(`/organizer/event/${event._id}`)}
          >
            <Text className="text-2xl font-bold text-white mb-2">{event.title}</Text>
            <Text className="text-zinc-400">{event.date} • {event.location}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
