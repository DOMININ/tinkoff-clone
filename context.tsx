import React, { useEffect, useState } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore, doc, getDoc, DocumentData, setDoc } from 'firebase/firestore';
import { Alert } from 'react-native';

interface UserInfo {
  name: string;
}

interface ContextProps {
  initializing: boolean;
  user: User | null,
  userInfo: DocumentData,
  isLoading: boolean,
  handleLogin: (email: string, password: string) => Promise<void>,
  handleRegister: (email: string, password: string) => Promise<void>,
  handleLogout: () => Promise<void>
  getUserData: (uid: string) => Promise<void>
}

export const AuthContext = React.createContext<ContextProps>({} as ContextProps);

export const AuthProvider: React.FC = ({ children }) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<DocumentData>({} as UserInfo);
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();
  const db = getFirestore();

  const handleRegister = async (email: string, password: string) => {
    setIsLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
    .then(async ({ user }) => {
      setUser(user);
      await setDoc(doc(db, 'users', user.uid), {
        name: email
      });
    })
    .catch(() => Alert.alert('Invalid username or password'))
    .finally(() => setIsLoading(false));
  };

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      setUser(user);
    })
    .catch(() => Alert.alert('Failed login'))
    .finally(() => setIsLoading(false));
  };

  const handleLogout = async () => {
    setIsLoading(true);
    await signOut(auth)
    .then(() => {
      setUser(null);
    })
    .catch(() => Alert.alert('Failed logout'))
    .finally((() => setIsLoading(false)));
  };

  const getUserData = async (uid: string) => {
    setIsLoading(true);
    try {
      const docSnap = await getDoc(doc(db, 'users', uid));
      if (docSnap.exists()) {
        setUserInfo(docSnap.data());
      } else {
        Alert.alert('Document does not exist');
      }
    } catch (error) {
      Alert.alert('Failed document load');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user || null);
      setInitializing(false);
    });
  }, []);

  const value = {
    user,
    userInfo,
    isLoading,
    initializing,
    handleLogin,
    handleLogout,
    getUserData,
    handleRegister
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
