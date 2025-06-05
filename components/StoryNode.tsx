import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Link {
  name: string;
  pid: string;
  link: string;
}

interface StoryNodeProps {
  text: string;
  links: Link[];
  onChoiceSelect: (pid: string, linkText: string) => void;
  name?: string;
}

export default function StoryNode({ text, links = [], onChoiceSelect, name }: StoryNodeProps) {
  const cleanText = text.replace(/\[\[.*?\]\]/g, '');

  const cleanLinkText = (linkText: string) => {
    console.log('Cleaning link text:', linkText);
    // Get only the first part before any | character
    const cleanedText = linkText.split('|')[0];
    console.log('Cleaned to:', cleanedText);
    return cleanedText;
  };

  return (
    <View style={styles.container}>
      {name && <Text style={styles.name}>{name}</Text>}
      <Text style={styles.text}>{cleanText}</Text>
      <View style={styles.choices}>
        {links.map((link, index) => {
          console.log('Rendering link:', link);
          return (
            <TouchableOpacity
              key={index}
              style={styles.choice}
              onPress={() => {
                console.log('Link clicked:', link);
                onChoiceSelect(link.pid, link.name);
              }}
            >
              <Text style={styles.choiceText}>
                {cleanLinkText(link.name)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    color: '#1a1a1a',
    marginBottom: 20,
    lineHeight: 24,
  },
  choices: {
    gap: 12,
  },
  choice: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  choiceText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});