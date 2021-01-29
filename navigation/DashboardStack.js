import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { View, Text } from 'react-native'
import DashboardScreen from '../screens/DashboardScreen'

const Stack = createStackNavigator()

export default function DashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Dashboard' component={DashboardScreen} />
    </Stack.Navigator>
  )
}
