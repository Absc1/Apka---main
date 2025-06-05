// app/_layout.tsx
import { Stack } from 'expo-router';
import { GameProvider } from '@/contexts/GameContext';

const { sessionId } = useGame();

return (
  <GameProvider>
    <Stack key={sessionId} screenOptions={{ headerShown: false }} />
  </GameProvider>
);