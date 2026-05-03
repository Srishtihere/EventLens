import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';

export default function AttendeeEventView() {
  const { event_id } = useLocalSearchParams();
  const router = useRouter();

  // Mock talks
  const [talks] = useState([
    {
      _id: 't1',
      title: 'Mastering React Context',
      speaker: 'Jane Doe',
    }
  ]);

  return (
    <View className="flex-1 bg-black p-6">
      <View className="mb-8 mt-10">
        <Text className="text-3xl font-extrabold text-white">Event Talks</Text>
        <Text className="text-zinc-400 mt-1">Select a talk to view the transcript and personalized learning resources.</Text>
      </View>

      <ScrollView className="flex-1">
        {talks.map(talk => (
          <TouchableOpacity 
            key={talk._id}
            className="bg-zinc-950 p-6 rounded-none mb-4 border border-zinc-800 shadow-md"
            onPress={() => router.push(`/attendee/talk/${talk._id}`)}
          >
            <Text className="text-xl font-bold text-white mb-2">{talk.title}</Text>
            <Text className="text-zinc-400">Speaker: {talk.speaker}</Text>
            <View className="mt-4 flex-row">
              <View className="bg-zinc-900 px-3 py-1 rounded-none border border-zinc-700 mr-2">
                <Text className="text-zinc-300 text-xs uppercase font-bold tracking-widest">AI Smart Notes</Text>
              </View>
              <View className="bg-zinc-900 px-3 py-1 rounded-none border border-zinc-700">
                <Text className="text-zinc-300 text-xs uppercase font-bold tracking-widest">Projects</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
