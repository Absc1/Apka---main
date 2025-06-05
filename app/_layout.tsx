// app/_layout.tsx
import { Stack } from 'expo-router';
import { GameProvider, useGame } from '@/contexts/GameContext';

/** -------------------------------------------------
 *  Wewnętrzny navigator – tu możemy użyć useGame()
 *  -------------------------------------------------
 */
function InnerNavigator() {
  const { sessionId } = useGame();          // ↙ klucz sesji
  return <Stack key={sessionId} screenOptions={{ headerShown: false }} />;
}

/** -------------------------------------------------
 *  Główny layout aplikacji – otacza wszystko GameProviderem
 *  -------------------------------------------------
 */
export default function RootLayout() {
  return (
    <GameProvider>
      <InnerNavigator />
    </GameProvider>
  );
}
