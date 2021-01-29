import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Typography from './Typography'

export default function ScreenHeader({ title }) {
  return (
    <View>
      <Typography variant='h1'>{title}</Typography>
    </View>
  )
}

const styles = StyleSheet.create({})
