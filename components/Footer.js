import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function Footer({ children }) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopColor: '#ebebeb',
    borderTopWidth: 1
  }
})
