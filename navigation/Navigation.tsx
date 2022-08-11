import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Main } from '../screens/Main';
import More from '../screens/More';
import { NavigationContainer } from '@react-navigation/native';
import { Auth } from '../screens/Auth';
import { useAuth } from '../hooks/useAuth';
import { Loader } from '../components/Loader';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ?
          <>
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="More" component={More} />
          </>
          : <Stack.Screen name="Auth" component={Auth} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
