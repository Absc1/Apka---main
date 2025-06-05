import { Tabs } from 'expo-router';
import { Chrome as Home, QrCode } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#F2F2F7',
          borderTopWidth: 1,
          borderTopColor: '#D1D1D6',
        },
        headerStyle: {
          backgroundColor: '#F2F2F7',
        },
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          headerTitle: 'QR Scanner',
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color, size }) => <QrCode size={size} color={color} />,
          headerTitle: 'Scan QR Code',
        }}
      />
    </Tabs>
  );
}