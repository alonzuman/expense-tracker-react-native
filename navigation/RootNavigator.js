import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer, useNavigation, useTheme } from '@react-navigation/native';
import AuthStack from './AuthStack';
import Splash from '../components/Splash';
import useAuth from '../hooks/useAuth'
import OnBoarding from '../screens/OnBoarding';
import { createStackNavigator } from '@react-navigation/stack';
import CreateModal from '../screens/CreateModal';
import { Button, View } from 'react-native';
import ProfileStack from './ProfileStack';
import DashboardStack from './DashboardStack';
import IconButton from '../components/IconButton';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator()

const CreatePlaceholder = () => <View style={{ flex: 1, backgroundColor: 'transparent' }} />

const TabNavigator = () => {
  const theme = useTheme()
  const navigation = useNavigation()
  const { user, isLoading } = useAuth();

  if (isLoading) return <Splash />
  if (!isLoading && user && !user?.displayName) return <OnBoarding />
  return (
    <Tab.Navigator tabBarOptions={{ activeTintColor: theme.colors.primary, inactiveTintColor: 'grey', }} >
      {user && (
        <>
          <Tab.Screen
            name="Dashboard"
            component={DashboardStack}
            options={{
              tabBarIcon: ({ focused, color, size }) => (<AntDesign name="creditcard" size={size} color={color} />),
              tabBarLabel: () => null
            }}
          />
          <Tab.Screen
            name='Create'
            component={CreatePlaceholder}
            options={{
              tabBarIcon: ({ color, size }) => (<AntDesign name='plus' size={size} color={color} />),
              tabBarButton: () => (<IconButton size='large' onPress={() => navigation.navigate('Create New')} style={{ marginTop: -16, backgroundColor: theme.colors.primary }}><AntDesign name='plus' size={24} color='#fff' /></IconButton>),
              tabBarLabel: () => null
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileStack}
            options={{
              tabBarIcon: ({ focused, color, size }) => (<AntDesign name="user" size={size} color={color} />),
              tabBarLabel: () => null
            }}
          />
        </>)}
      {!user && <Tab.Screen name='Auth' component={AuthStack} options={{ tabBarVisible: false }} />}
    </Tab.Navigator>
  )
}


const RootStackScreen = () => {
  const { isLoading, user } = useAuth()

  return (
    <RootStack.Navigator
      headerMode='none'
      screenOptions={{ animationEnabled: false }}
      mode='modal'
    >
      {isLoading && <RootStack.Screen name='Splash' component={Splash} />}
      {!isLoading && !user && <RootStack.Screen name='Auth' component={AuthStack} />}
      {!isLoading && user && <RootStack.Screen name='Main' component={TabNavigator} />}
      <RootStack.Screen name='Create New' component={CreateModal} options={{ animationEnabled: true }} />
    </RootStack.Navigator>
  )
}

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  )
}

