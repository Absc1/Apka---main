// app/(tabs)/scanner.tsx
import { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import scenario from '@/assets/scenario.json';
import StoryNode from '@/components/StoryNode';
import { useGame } from '@/contexts/GameContext';
import { QrCode } from 'lucide-react-native';

/* -------- mapy węzłów -------- */
const passagesByPid   = Object.fromEntries(
  scenario.passages.map(p => [p.pid, p]),
);
const passagesByName  = Object.fromEntries(
  scenario.passages.map(p => [p.name, p]),
);

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [currentPassage, setCurrentPassage] = useState(null);
  const [initialNodeName, setInitialNodeName] = useState(null);

  const isFocused = useIsFocused();
  const router    = useRouter();
  const { addVisitedNode, addFlag, hasFlag, flags } = useGame();

  /* -------- reset przy opuszczeniu ekranu -------- */
  useEffect(() => {
    if (!isFocused) {
      setScanned(false);
      setCurrentPassage(null);
      setInitialNodeName(null);
    }
  }, [isFocused]);

  /* -------- log flag dla debugu -------- */
  useEffect(() => {
    console.log('FLAGS →', [...flags]);
  }, [flags]);

  /* -------- znajdź węzeł po tagu QRn -------- */
  const findPassageByTag = (tag: string) =>
    scenario.passages.find(
      p => p.tags?.some(t => t.trim().toLowerCase() === tag.trim().toLowerCase()),
    );

  /* -------- obsługa skanu -------- */
  const handleScan = ({ data }) => {
    const passage = findPassageByTag(data.trim());
    if (!passage) return;

    setScanned(true);
    setCurrentPassage(passage);
    if (!initialNodeName) setInitialNodeName(passage.name);
    addVisitedNode(passage.pid);

    passage.tags?.forEach(tag => {
      if (tag.startsWith('SET_')) addFlag(tag.slice(4));
    });
  };

  /* -------- wybór linku -------- */
  const handleChoiceSelect = (pid, linkText) => {
    let next =
      scenario.passages.find(p => p.pid === pid) ??
      scenario.passages.find(p => p.name === linkText.split('|')[0]);

    if (!next) {
      console.log('No matching passage found!'); return;
    }
    setCurrentPassage(next);
    addVisitedNode(next.pid);

    next.tags?.forEach(tag => {
      if (tag.startsWith('SET_')) addFlag(tag.slice(4));
    });
  };

  /* -------- filtr linków wg tagu IF_... w węźle docelowym -------- */
  const filterLinks = (links = []) =>
    links.filter(l => {
      const target =
        passagesByPid[l.pid] ??
        passagesByName[l.link] ??
        passagesByName[l.name];

      const condTag = target?.tags?.find(t => t.startsWith('IF_'));
      const cond    = condTag ? condTag.slice(3) : undefined;

      return !cond || flags.has(cond);
    });

  const returnToScanning = () => router.back();

  /* -------- UI -------- */
  if (!permission)         return <Text>Ładowanie kamery…</Text>;
  if (!permission.granted) return (
    <View style={styles.center}>
      <Text>Brak dostępu do kamery</Text>
      <Button title="Zezwól" onPress={requestPermission} />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {(!scanned && isFocused) ? (
        <CameraView
          style={{ flex: 1 }}
          onBarcodeScanned={handleScan}
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        />
      ) : (
        <View style={styles.dialogContainer}>
          {currentPassage && (
            <StoryNode
              text={currentPassage.text}
              links={filterLinks(currentPassage.links)}
              onChoiceSelect={handleChoiceSelect}
              name={initialNodeName || currentPassage.name}
            />
          )}
          {(!currentPassage?.links || currentPassage.links.length === 0) && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={returnToScanning}>
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
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
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
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  buttonIcon: { marginRight: 8 },
});
