import * as ExpoGoogleSignIn from 'expo-google-sign-in'
import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as AppAuth from 'expo-app-auth';
import Button from '../../components/Button';
const { URLSchemes } = AppAuth;

// console.log(URLSchemes)

export default function GoogleSignIn() {
  const syncUserWithStateAsync = async () => {
    const user = await ExpoGoogleSignIn.signInSilentlyAsync();
    // console.log({ user })
  };

  const initAsync = async () => {
    try {
      await ExpoGoogleSignIn.initAsync({
        clientId: '894025729971-9jc4h5vd8u698uk0msm38i3hnvtpt4nb.apps.googleusercontent.com'
      })
    } catch ({ message }) {
      // console.log(message);
      alert('login: Error:' + message);
    }
  }

  const signInAsync = async () => {
    try {
      await ExpoGoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await ExpoGoogleSignIn.signInAsync();
      if (type === 'success') {
        console.log({ user })
        syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };

  useEffect(() => {
    initAsync();
  }, [])

  return (
    <Button
      label='Google Sign In'
    />
  )
}

const styles = StyleSheet.create({})
