// components/StoryNode.tsx
import { Image, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { IMAGES } from '@/assets/images';

const { height: SCREEN_H } = Dimensions.get('window');

interface Link {
  name: string;
  pid:  string;
  link: string;
}
interface StoryNodeProps {
  text:           string;
  links:          Link[];
  onChoiceSelect: (pid: string, linkText: string) => void;
  name?:  string;
  image?: string;   // klucz z IMAGES
}

export default function StoryNode({
  text, links = [], onChoiceSelect, name, image,
}: StoryNodeProps) {
  const cleanText     = text.replace(/\[\[.*?\]\]/g, '');
  const cleanLinkText = (raw: string) => raw.split('|')[0];

  return (
    <View style={styles.container}>
      {image && IMAGES[image] && (
        <Image source={IMAGES[image]} style={styles.bg} resizeMode="cover" />
      )}

      {/* ------ cała treść na dole okna ------ */}
      <View style={styles.content}>
        {name && <Text style={styles.name}>{name}</Text>}
        <Text style={styles.text}>{cleanText}</Text>

        <View style={styles.choices}>
          {links.map((link, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.choice}
              onPress={() => onChoiceSelect(link.pid, link.name)}
            >
              <Text style={styles.choiceText}>{cleanLinkText(link.name)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  /* pełne okno dialogu */
  container: {
    width: '90%',                   // prawie cała szerokość ekranu
    minHeight: SCREEN_H * 0.6,      // 60 % wysokości – grafika ma gdzie oddychać
    alignSelf: 'center',
    borderRadius: 16,
    overflow: 'hidden',             // żeby zaokrąglenia zadziałały też na tle
    backgroundColor: '#fff',
  },
  /* tło */
  bg: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.25,
  },
  /* wrappujemy, żeby pchnąć całość na dół */
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 24,
  },
  name: {
    fontSize: 20, fontWeight: '700', color: '#333',
    marginBottom: 12, textAlign: 'center',
  },
  text: {
    fontSize: 18, color: '#1a1a1a',
    marginBottom: 20, lineHeight: 24,
  },
  choices: { gap: 12 },
  choice: {
    backgroundColor: '#007AFF',
    paddingVertical: 12, paddingHorizontal: 20,
    borderRadius: 8, alignItems: 'center',
  },
  choiceText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
