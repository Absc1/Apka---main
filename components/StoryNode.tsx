// components/StoryNode.tsx
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Link {
  name: string;
  pid:  string;
  link: string;
}

interface StoryNodeProps {
  text:      string;
  links:     Link[];
  onChoiceSelect: (pid: string, linkText: string) => void;
  name?:   string;
  image?:  string;            // nazwa pliku bez rozszerzenia, np. "kowal"
}

export default function StoryNode({
  text,
  links = [],
  onChoiceSelect,
  name,
  image,
}: StoryNodeProps) {

  const cleanText = text.replace(/\[\[.*?\]\]/g, '');

  const cleanLinkText = (raw: string) => raw.split('|')[0];

  return (
    <View style={styles.container}>
      {/* tło – jeśli węzeł ma tag IMG_foo, parent przekaże "foo" */}
      {image && (
        <Image
          source={require(`@/assets/images/${image}.png`)}
          style={styles.bg}
          resizeMode="cover"
        />
      )}

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
  );
}

const styles = StyleSheet.create({
  container:  { backgroundColor: '#fff', borderRadius: 16, padding: 20,
                width: '100%', maxWidth: 500, alignSelf: 'center' },
  bg:         { ...StyleSheet.absoluteFillObject, opacity: 0.25 },
  name:       { fontSize: 20, fontWeight: '700', color: '#333',
                marginBottom: 12, textAlign: 'center' },
  text:       { fontSize: 18, color: '#1a1a1a', marginBottom: 20, lineHeight: 24 },
  choices:    { gap: 12 },
  choice:     { backgroundColor: '#007AFF', paddingVertical: 12,
                paddingHorizontal: 20, borderRadius: 8, alignItems: 'center' },
  choiceText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
