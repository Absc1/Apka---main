import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useGame } from '@/contexts/GameContext';
import { Play } from 'lucide-react-native';
import { useEffect } from 'react';

export default function MenuScreen() {
  const router = useRouter();
  const { resetGame } = useGame();

  useEffect(() => {
    console.log('💡 MenuScreen MOUNTED (app/index.tsx)');
  }, []);

  const handleStartNewGame = async () => {
    console.log('Starting new game...');
    await resetGame();
    console.log('Game reset complete, navigating to game screen...');
    router.push('/start');
  };

  return (
    <View style={[styles.container, { backgroundColor: '#FFEB3B' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: '#000' }]}>MENU!</Text>
        <Text style={styles.subtitle}>
          Explore the world through QR codes
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleStartNewGame}>
        <Play size={24} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Start New Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    maxWidth: '80%',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});