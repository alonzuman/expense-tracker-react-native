import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import { Button } from 'react-native';

const Stack = createStackNavigator();

export default function ProfileStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          headerRight: () => <Button onPress={() => navigation.navigate('Edit Profile')} title='Edit' />
        }}
      />
      <Stack.Screen name='Edit Profile' component={EditProfileScreen} />
    </Stack.Navigator>
  )
}
