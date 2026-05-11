import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WifeHomeScreen from '../screens/WifeHomeScreen';
import HusbandHomeScreen from '../screens/HusbandHomeScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="WifeHome" component={WifeHomeScreen} />
      <Stack.Screen name="HusbandHome" component={HusbandHomeScreen} />
    </Stack.Navigator>
  );
}