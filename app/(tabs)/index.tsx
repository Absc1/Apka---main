// app/(tabs)/index.tsx
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useGame } from '@/contexts/GameContext';
import { QrCode, X } from 'lucide-react-native';

export default function StartScreen() {
  const router = useRouter();
  const { resetGame, flags } = useGame();

  /* ---------- PRZYCISK SCAN ---------- */
  const goToScanner = () => router.push('/(tabs)/scanner');

  /* ---------- PRZYCISK END GAME ---------- */
  const endGame = async () => {
    console.log('End Game clicked - current flags:', [...flags]);
    console.log('Starting game reset...');
    
    await resetGame();
    console.log('Game reset completed - flags should be empty now');
    
    console.log('Navigating to main menu...');
    router.replace('/');
    console.log('Navigation completed');
  };

  return (
    <View style={styles.container}>
      {/* ---- Scan QR ---- */}
      <TouchableOpacity style={[styles.button, styles.primary]} onPress={goToScanner}>
        <QrCode size={24} color="#fff" style={styles.icon} />
        <Text style={styles.text}>Scan QR code</Text>
      </TouchableOpacity>

      {/* ---- End game ---- */}
      <TouchableOpacity style={[styles.button, styles.danger]} onPress={endGame}>
        <X size={24} color="#fff" style={styles.icon} />
        <Text style={styles.text}>End game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginVertical: 10,
  },
  primary: { backgroundColor: '#34C759' },
  danger: { backgroundColor: '#FF3B30' },
  text: { color: '#fff', fontSize: 18, fontWeight: '600' },
  icon: { marginRight: 8 },
});