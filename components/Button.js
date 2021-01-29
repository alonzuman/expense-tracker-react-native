import { useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Spinner from './Spinner';

export default function Button({ onPress, variant = 'outlined', isLoading = false, disabled = false, label, marginTop = 0 }) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={.75}
      onPress={onPress}
      style={{ ...styles.button,  marginTop, backgroundColor: theme.colors.primary }}
    >
      {isLoading && <Spinner />}
      {!isLoading && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    fontSize: 16,
    textAlign: 'center',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%"
  },

  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
})
