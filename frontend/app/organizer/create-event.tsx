import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function CreateEvent() {
  const router = useRouter();
  const [link, setLink] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  const handleParseLink = () => {
    if (!link) return;
    setIsParsing(true);
    setTimeout(() => {
      setTitle("Auto-filled Conference 2026");
      setDescription("This is an extracted description from the link. Please adjust as necessary.");
      setDate("2026-08-20");
      setLocation("London, UK");
      setIsParsing(false);
    }, 1500);
  };

  const handleSave = () => {
    router.replace('/organizer');
  };

  return (
    <ScrollView className="flex-1 bg-black p-6">
      <Text className="text-4xl font-black text-white mt-10 mb-8 tracking-tighter">Create Event</Text>

      {/* AI Assist Section */}
      <View className="bg-zinc-950 p-6 rounded-none mb-8 border border-zinc-800">
        <Text className="text-sm font-bold text-white uppercase tracking-widest mb-2">AI-Assisted Form Fill</Text>
        <Text className="text-zinc-500 text-sm mb-4">Paste an event link to auto-extract details.</Text>
        <View className="flex-row items-center">
          <TextInput 
            className="flex-1 bg-black text-white p-4 rounded-none border border-zinc-800 mr-2"
            placeholder="https://example.com/event"
            placeholderTextColor="#52525b"
            value={link}
            onChangeText={setLink}
          />
          <TouchableOpacity 
            className="bg-white px-6 py-4 rounded-none justify-center items-center"
            onPress={handleParseLink}
            disabled={isParsing}
          >
            {isParsing ? <ActivityIndicator color="#000" /> : <Text className="text-black font-bold uppercase tracking-wider text-xs">Extract</Text>}
          </TouchableOpacity>
        </View>
      </View>

      <Text className="text-sm font-bold text-white uppercase tracking-widest mb-4">Event Details</Text>
      
      <TextInput 
        className="bg-zinc-950 text-white p-4 rounded-none border border-zinc-800 mb-4"
        placeholder="Event Title"
        placeholderTextColor="#52525b"
        value={title}
        onChangeText={setTitle}
      />
      
      <TextInput 
        className="bg-zinc-950 text-white p-4 rounded-none border border-zinc-800 mb-4"
        placeholder="Date (e.g. 2026-08-20)"
        placeholderTextColor="#52525b"
        value={date}
        onChangeText={setDate}
      />

      <TextInput 
        className="bg-zinc-950 text-white p-4 rounded-none border border-zinc-800 mb-4"
        placeholder="Location"
        placeholderTextColor="#52525b"
        value={location}
        onChangeText={setLocation}
      />

      <TextInput 
        className="bg-zinc-950 text-white p-4 rounded-none border border-zinc-800 mb-8 h-32"
        placeholder="Description"
        placeholderTextColor="#52525b"
        multiline
        value={description}
        onChangeText={setDescription}
        textAlignVertical="top"
      />

      <TouchableOpacity 
        className="w-full bg-white py-4 rounded-none mb-10 items-center"
        onPress={handleSave}
      >
        <Text className="text-black font-black text-sm uppercase tracking-widest">Save Event</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
