import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function Container({ children, style }) {
  return (
    <View style={{ ...styles.root, ...style }}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
})
