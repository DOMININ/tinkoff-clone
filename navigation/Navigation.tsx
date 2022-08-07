import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Main } from '../screens/Main';
import More from '../screens/More';
import { NavigationContainer } from '@react-navigation/native';
import { Auth } from '../screens/Auth';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Auth">
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="More" component={More} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
