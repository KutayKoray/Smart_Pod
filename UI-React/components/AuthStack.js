import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Landing1 from './Landing1';
import Landing2 from './Landing2';
import Landing3 from './Landing3';
import RegisterScreen from './Auth/RegisterScreen';
import LoginScreen from './Auth/LoginScreen';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Landing1" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing1" component={Landing1} />
      <Stack.Screen name="Landing2" component={Landing2} />
      <Stack.Screen name="Landing3" component={Landing3} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}
