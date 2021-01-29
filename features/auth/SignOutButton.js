import { useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Button, } from 'react-native'
import { useDispatch } from 'react-redux'
import { auth } from '../../app/firebase'
import { signOut } from './authSlice'

export default function SignOutButton() {
  const dispatch = useDispatch()
  const theme = useTheme();

  const handlePress = () => {
    auth.signOut()
      .then(() => dispatch(signOut()))
  }

  return (
    <Button color={theme.colors.primary} title='Sign Out' onPress={handlePress} />
  )
}

const styles = StyleSheet.create({})
