// app/index.tsx
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Play } from 'lucide-react-native';
import { useGame } from '@/contexts/GameContext';

export default function MenuScreen() {
  const router = useRouter();
  const { resetGame } = useGame();

  const handleStartNewGame = async () => {
    await resetGame();               // pełen reset flag
    router.replace('/(tabs)');       // przejście do zakładek
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MENU</Text>

      <TouchableOpacity style={styles.button} onPress={handleStartNewGame}>
        <Play size={24} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Start new game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 32, fontWeight: '700', marginBottom: 32 },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
