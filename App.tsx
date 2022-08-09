import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './navigation/Navigation';
import { SafeAreaView } from 'react-native';
import './firebase';
import { useEffect, useState } from 'react';
import { Context } from './context';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { LoadingIndicator } from './components/LoadingIndicator';

export default function App() {
  const auth = getAuth();
  const [context, setContext] = useState({ isAuth: false, id: '', loading: false });

  // check the user is authorized
  useEffect(() => {
    setContext((prevState) => ({ ...prevState, loading: true }));
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setContext({ isAuth: true, id: user.uid, loading: false });
      }
      setContext((prevState) => ({ ...prevState, loading: false }));
    });
  }, []);

  const createNav = () => {
    if (context.loading) {
      return <LoadingIndicator />;
    }
    return <Navigation />;
  };

  return (
    <Context.Provider value={[context, setContext]}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
        <SafeAreaProvider>
          {createNav()}
        </SafeAreaProvider>
      </SafeAreaView>
    </Context.Provider>
  );
}
