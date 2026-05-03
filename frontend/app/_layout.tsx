import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import './global.css';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="organizer" options={{ headerShown: false }} />
        <Stack.Screen name="attendee" options={{ headerShown: false }} />
        <Stack.Screen name="about-me" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
