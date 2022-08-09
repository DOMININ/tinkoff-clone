import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Main } from '../screens/Main';
import More from '../screens/More';
import { NavigationContainer } from '@react-navigation/native';
import { Auth } from '../screens/Auth';
import { Context } from '../context';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  const [context] = useContext<any>(Context);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {context.isAuth ?
          <>
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="More" component={More} />
          </>
          : <Stack.Screen name="Auth" component={Auth} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
