import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Typography from './Typography'

export default function Header({ title, action, secondaryAction }) {
  return (
    <View style={styles.container}>
      <View style={styles.action}>
        {action}
      </View>
      <Typography variant='h4' style={styles.title}>{title}</Typography>
      <View style={styles.action}>
        {secondaryAction}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 8
  },

  title: {
    fontSize: 18
  },

  action: {
    minWidth: 64
  }
})
