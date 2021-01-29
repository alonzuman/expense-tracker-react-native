import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Spinner from './Spinner'

export default function Splash() {
  return (
    <SafeAreaView style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
      <Spinner />
    </SafeAreaView>
  )
}
