// app/_layout.tsx
import { Stack } from 'expo-router';
import { GameProvider, useGame } from '@/contexts/GameContext';

function InnerNavigator() {
  const { sessionId } = useGame();
  return <Stack key={sessionId} screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <GameProvider>
      <InnerNavigator /> {/* <- tu działa useGame, bo jest w Providerze */}
    </GameProvider>
  );
}
