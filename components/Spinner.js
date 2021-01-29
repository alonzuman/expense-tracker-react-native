import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

export default function Spinner({ size = 'small' }) {
  return (
    <ActivityIndicator size={size} />
  )
}

const styles = StyleSheet.create({})
