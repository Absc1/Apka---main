// app/_layout.tsx
import { Stack } from 'expo-router';
import { GameProvider } from '@/contexts/GameContext';

export default function RootLayout() {
  return (
    <GameProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </GameProvider>
  );
}