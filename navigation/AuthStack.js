import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../features/auth/SignIn';
import SignUp from '../features/auth/SignUp';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name='Sign In'
        component={SignIn}
      />
      <Stack.Screen
        name='Sign Up'
        component={SignUp}
      />
    </Stack.Navigator>
  )
}

