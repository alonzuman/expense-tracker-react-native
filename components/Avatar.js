import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export default function Avatar({ photoURL, size = 'medium' }) {
  if (!photoURL) return null;

  return (
    <Image
      style={{ ...styles.root, ...styles[size] }}
      source={{ uri: photoURL }}
    />
  )
}

const styles = StyleSheet.create({
  root: {
    borderRadius: 48
  },

  small: {
    height: 32,
    width: 32,
  },

  medium: {
    height: 56,
    width: 56
  },

  large: {
    height: 96,
    width: 96
  }
})
