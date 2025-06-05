import { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import scenario from '@/assets/scenario.json';
import StoryNode from '@/components/StoryNode';
import { useGame } from '@/contexts/GameContext';
import { Chrome as Home, QrCode } from 'lucide-react-native';

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [currentPassage, setCurrentPassage] = useState(null);
  const [initialNodeName, setInitialNodeName] = useState(null);
  const isFocused = useIsFocused();
  const { addVisitedNode, addFlag, hasFlag } = useGame();
  const router = useRouter();

  useEffect(() => {
    if (!isFocused) {
      setScanned(false);
      setCurrentPassage(null);
      setInitialNodeName(null);
    }
  }, [isFocused]);

  const findPassageByTag = (tag) => {
    return scenario.passages.find(passage => {
      if (!passage.tags) return false;
      return passage.tags.some(t => t.toLowerCase().trim() === tag.toLowerCase().trim());
    });
  };

  const handleScan = ({ data }) => {
    const trimmedData = data.trim();
    const passage = findPassageByTag(trimmedData);
    
    if (passage) {
      setScanned(true);
      setCurrentPassage(passage);
      if (!initialNodeName) {
        setInitialNodeName(passage.name);
      }
      
      addVisitedNode(passage.pid);
      
      if (passage.tags) {
        passage.tags.forEach(tag => {
          if (tag.startsWith('SET_')) {
            addFlag(tag.substring(4));
          }
        });
      }
    }
  };

  const handleChoiceSelect = (pid, linkText) => {
    console.log('handleChoiceSelect called with:', { pid, linkText });
    
    const displayText = linkText.split('|')[0];
    console.log('Display text:', displayText);
    
    let nextPassage = scenario.passages.find(p => p.name === displayText);
    console.log('Found passage by display text:', nextPassage);

    if (!nextPassage) {
      nextPassage = scenario.passages.find(p => p.pid === pid);
      console.log('Found passage by pid:', nextPassage);
    }

    if (nextPassage) {
      console.log('Setting next passage:', nextPassage);
      setCurrentPassage(nextPassage);
      addVisitedNode(nextPassage.pid);
      
      if (nextPassage.tags) {
        nextPassage.tags.forEach(tag => {
          if (tag.startsWith('SET_')) {
            addFlag(tag.substring(4));
          }
        });
      }
    } else {
      console.log('No matching passage found!');
    }
  };

  const returnToScanning = () => {
    router.back();
  };

  if (!permission) {
    return <Text>Ładowanie kamery…</Text>;
  }
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Brak dostępu do kamery</Text>
        <Button title="Zezwól" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {(!scanned && isFocused) ? (
        <CameraView
          style={{ flex: 1 }}
          onBarcodeScanned={handleScan}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
        />
      ) : (
        <View style={styles.dialogContainer}>
          {currentPassage && (
            <StoryNode
              text={currentPassage.text}
              links={currentPassage.links?.filter(link => {
                if (!link.link) return false;
                console.log('Checking link:', link);
                const match = link.link.match(/\|IF:(\w+)$/);
                if (!match) return true;
                const requiredFlag = match[1];
                const hasRequiredFlag = hasFlag(requiredFlag);
                console.log('Link has flag requirement:', requiredFlag, 'Has flag:', hasRequiredFlag);
                return hasRequiredFlag;
              })}
              onChoiceSelect={handleChoiceSelect}
              name={initialNodeName || currentPassage.name}
            />
          )}
          {(!currentPassage?.links || currentPassage.links.length === 0) && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={returnToScanning}>
                <QrCode size={20} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Zakończ dialog</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  dialogContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 500,
    gap: 12,
    marginTop: 20,
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIcon: {
    marginRight: 8,
  },
});