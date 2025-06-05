// app/(tabs)/index.tsx
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';          // ⬅️   useRouter, nie useNavigation
import { useGame } from '@/contexts/GameContext';
import { QrCode, X } from 'lucide-react-native';

export default function StartScreen() {
  const router     = useRouter();
  const { resetGame } = useGame();

  /** ------------------ Scan QR ------------------ **/
  const goToScanner = () => router.push('/(tabs)/scanner');

  /** ------------------ End game ----------------- **/
  const endGame = async () => {
    console.log('--- KLIK: End game');
    await resetGame();                    // zeruj flagi, visited, storage
    console.log('--- PO resetGame, nawiguję ▶ MENU');
    // odroczone o 0 ms, żeby React dokończył render
    setTimeout(() => router.replace('/'), 0);
  };

  return (
    <View style={styles.container}>
      {/* Scan */}
      <TouchableOpacity
        style={[styles.button, styles.primary]}
        onPress={goToScanner}
      >
        <QrCode size={24} color="#fff" style={styles.icon} />
        <Text style={styles.text}>Scan QR code</Text>
      </TouchableOpacity>

      {/* End game */}
      <TouchableOpacity
        style={[styles.button, styles.danger]}
        onPress={endGame}
      >
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
  danger:  { backgroundColor: '#FF3B30' },
  text:    { color: '#fff', fontSize: 18, fontWeight: '600' },
  icon:    { marginRight: 8 },
});
