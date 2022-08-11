import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { Alert } from 'react-native';

interface ContextProps {
  user: User | null,
  isLoading: boolean,
  handleLogin: (email: string, password: string) => Promise<void>,
  handleLogout: () => Promise<void>
}

export const AuthContext = React.createContext<ContextProps>({} as ContextProps);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      setUser(user);
    })
    .catch((error) => Alert.alert('Failed login:', error))
    .finally(() => setIsLoading(false));
  };

  const handleLogout = async () => {
    setIsLoading(true);
    await signOut(auth)
    .then(() => {
      setUser(null);
    })
    .catch((error) => Alert.alert('Failed logout:', error))
    .finally((() => setIsLoading(false)));
  };

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user || null);
    });
  }, []);

  const value = { user, isLoading, handleLogin, handleLogout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
