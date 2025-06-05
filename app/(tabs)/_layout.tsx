// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Home, QrCode } from 'lucide-react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
      }}
    >
      <Tabs.Screen
        name="index"                 // = app/(tabs)/index.tsx
        options={{
          title: 'Start',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="scanner"               // = app/(tabs)/scanner.tsx
        options={{
          title: 'Scanner',
          tabBarIcon: ({ color, size }) => <QrCode color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
