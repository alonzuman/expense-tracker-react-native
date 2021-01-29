import React from 'react'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function IconButton({ onPress, children, style, size = 'large' }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ ...styles[size], ...style }} activeOpacity={.98}>
      {children}
    </TouchableOpacity>
  )
}

const buttonBase = {
  backgroundColor: '#f1f1f1',
  height: 48,
  width: 48,
  borderRadius: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const styles = StyleSheet.create({
  small: {
    ...buttonBase,
    height: 40,
    width: 40
  },

  large: {
    ...buttonBase,
    height: 64,
    width: 64,
    borderRadius: 36
  }
})
