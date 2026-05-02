import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function UploadTalk() {
  const router = useRouter();
  const { event_id } = useLocalSearchParams();
  const [title, setTitle] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [fileSelected, setFileSelected] = useState(false);

  const handleUpload = () => {
    router.back();
  };

  return (
    <ScrollView className="flex-1 bg-black p-6">
      <Text className="text-4xl font-black text-white mt-10 mb-8 tracking-tighter">Upload Talk</Text>

      <View className="bg-zinc-900 p-4 border-l-4 border-white mb-8">
        <Text className="text-white font-bold mb-1 uppercase tracking-wider text-xs">Audio Quality Warning</Text>
        <Text className="text-zinc-400 text-sm">
          Bad audio leads to bad transcriptions. Please upload a clean, noise-free audio file rather than recording directly from a noisy room.
        </Text>
      </View>

      <TextInput 
        className="bg-zinc-950 text-white p-4 rounded-none border border-zinc-800 mb-4"
        placeholder="Talk Title"
        placeholderTextColor="#52525b"
        value={title}
        onChangeText={setTitle}
      />
      
      <TextInput 
        className="bg-zinc-950 text-white p-4 rounded-none border border-zinc-800 mb-6"
        placeholder="Speaker Name"
        placeholderTextColor="#52525b"
        value={speaker}
        onChangeText={setSpeaker}
      />

      <TouchableOpacity 
        className={`w-full py-12 border-2 border-dashed mb-8 items-center justify-center ${
          fileSelected ? 'border-white bg-zinc-900' : 'border-zinc-800 bg-zinc-950'
        }`}
        onPress={() => setFileSelected(true)}
      >
        <Text className="text-4xl mb-4">🎤</Text>
        <Text className={`font-bold tracking-widest uppercase text-xs ${fileSelected ? 'text-white' : 'text-zinc-500'}`}>
          {fileSelected ? 'audio_recording.mp3 selected' : 'Tap to select audio file'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        className={`w-full py-4 items-center ${
          fileSelected && title && speaker ? 'bg-white' : 'bg-zinc-900 border border-zinc-800'
        }`}
        onPress={handleUpload}
        disabled={!fileSelected || !title || !speaker}
      >
        <Text className={`font-black uppercase tracking-widest text-sm ${fileSelected && title && speaker ? 'text-black' : 'text-zinc-500'}`}>
          Upload & Process AI
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
