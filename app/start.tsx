import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { QrCode, Home } from 'lucide-react-native';
import { useGame } from '@/contexts/GameContext';

export default function StartScreen() {
  const router = useRouter();
  const { resetGame } = useGame();

  // Przycisk "Start scanning" przechodzi do ekranu skanowania
  const handleStartScanning = () => {
    router.push('/scanner');
  };

  // Przycisk "Zakończ grę" wraca do menu i resetuje stan
  const handleEndGame = async () => {
    await resetGame();
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Zeskanuj kartę</Text>
      <Text style={styles.subtitle}>Użyj aparatu aby zeskanować kartę i kontynuować historię</Text>
      <TouchableOpacity style={styles.button} onPress={handleStartScanning}>
        <QrCode size={20} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Start scanning</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.endButton]} onPress={handleEndGame}>
        <Home size={20} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Zakończ grę</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    minWidth: 200,
  },
  endButton: {
    backgroundColor: '#FF3B30',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
