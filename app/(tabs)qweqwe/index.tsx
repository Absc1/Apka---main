import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { QrCode, Chrome as Home } from 'lucide-react-native';
import { useGame } from '@/contexts/GameContext';

export default function GameScreen() {
  const router = useRouter();
  const { resetGame } = useGame();

  const handleEndGame = async () => {
    console.log('=== End Game Sequence Started ===');
    console.log('1. End Game button pressed');
    
    try {
      console.log('2. Starting game reset process');
      await resetGame();
      console.log('3. Game reset completed successfully');
      
      console.log('4. Attempting navigation to /');
      await router.replace('/');
      console.log('5. Navigation command executed');
      
      console.log('=== End Game Sequence Completed ===');
    } catch (error) {
      console.error('!!! Error in End Game Sequence !!!');
      console.error('Error details:', error);
      console.error('Error stack:', error?.stack);
      console.error('=== End Game Sequence Failed ===');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Zeskanuj kartę</Text>
        <Text style={styles.subtitle}>
          Użyj aparatu aby zeskanować kartę i kontynuować historię
        </Text>
      </View>

      <View style={styles.featureContainer}>
        <View style={styles.feature}>
          <QrCode size={40} color="#007AFF" />
          <Text style={styles.featureTitle}>Instant Scanning</Text>
          <Text style={styles.featureDescription}>
            Quickly scan any QR code and view the content immediately
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/scanner')}>
          <QrCode size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Start Scanning</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.endButton]}
          onPress={handleEndGame}>
          <Home size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>End Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    maxWidth: '80%',
  },
  featureContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  feature: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 40,
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
  endButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIcon: {
    marginRight: 8,
  },
});