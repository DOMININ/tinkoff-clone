import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './navigation/Navigation';
import { LogBox, SafeAreaView } from 'react-native';
import './firebase';
import { AuthProvider } from './context';

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </SafeAreaView>
    </AuthProvider>
  );
}

LogBox.ignoreAllLogs();
