import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { GameProvider } from '@/contexts/GameContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <GameProvider>
      <Stack screenOptions={{ 
        headerShown: false,
        animation: 'none',
      }}>
        <Stack.Screen 
          name="index"
          options={{
            animation: 'none',
          }}
        />
        <Stack.Screen 
          name="(tabs)"
          options={{
            animation: 'none',
            gestureEnabled: false,
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </GameProvider>
  );
}