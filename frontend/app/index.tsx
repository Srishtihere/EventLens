import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-black p-6">
      <View className="bg-zinc-950 p-10 rounded-none w-full max-w-md items-center border border-zinc-800 shadow-xl shadow-white/5">
        <Text className="text-5xl font-black text-white mb-2 tracking-tighter">
          DevSupport
        </Text>
        <Text className="text-zinc-500 text-center mb-10 text-base">
          Post-event intelligence and learning platform.
        </Text>

        <TouchableOpacity 
          className="w-full bg-white py-4 rounded-none mb-4"
          onPress={() => router.push('/organizer')}
        >
          <Text className="text-black text-center font-bold text-lg tracking-wide uppercase">Organizer Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="w-full bg-zinc-900 py-4 rounded-none border border-zinc-700 mb-8"
          onPress={() => router.push('/attendee')}
        >
          <Text className="text-white text-center font-bold text-lg tracking-wide uppercase">Attendee Portal</Text>
        </TouchableOpacity>

        <View className="w-full h-px bg-zinc-800 mb-8" />

        <TouchableOpacity 
          className="w-full py-3 items-center"
          onPress={() => console.log('Auth disabled in MVP scaffold')}
        >
          <Text className="text-zinc-400 font-medium">Sign in to your account</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="w-full py-3 items-center mt-2"
          onPress={() => console.log('Auth disabled in MVP scaffold')}
        >
          <Text className="text-zinc-500 text-sm">Create an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
