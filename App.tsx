import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './navigation/Navigation';
import { SafeAreaView } from 'react-native';
import './firebase';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </SafeAreaView>
  );
}
