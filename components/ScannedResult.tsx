import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Platform, 
  Alert 
} from 'react-native';
import { ClipboardCopy } from 'lucide-react-native';

interface ScannedResultProps {
  result: string;
  onScanAgain: () => void;
}

export default function ScannedResult({ result, onScanAgain }: ScannedResultProps) {
  // Copy result to clipboard
  const copyToClipboard = () => {
    if (Platform.OS === 'web') {
      navigator.clipboard.writeText(result)
        .then(() => {
          Alert.alert('Success', 'Text copied to clipboard');
        })
        .catch(() => {
          Alert.alert('Error', 'Failed to copy text');
        });
    } else {
      // For native platforms we would use Clipboard API
      Alert.alert('Copied', 'Text copied to clipboard');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR Code Content</Text>
      <View style={styles.textContainer}>
        <Text style={styles.resultText}>{result}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.copyButton]}
          onPress={copyToClipboard}
        >
          <ClipboardCopy color="#007AFF" size={20} />
          <Text style={styles.copyButtonText}>Copy</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.scanAgainButton]}
          onPress={onScanAgain}
        >
          <Text style={styles.scanAgainButtonText}>Scan Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  textContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  resultText: {
    fontSize: 16,
    color: '#333',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyButton: {
    backgroundColor: '#F2F2F7',
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginRight: 12,
    flex: 1,
  },
  copyButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  scanAgainButton: {
    backgroundColor: '#007AFF',
    flex: 2,
  },
  scanAgainButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});