import { useTheme } from '@react-navigation/native'
import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import IconButton from './IconButton';
import Typography from './Typography'

export default function ListItem({ size = 'large', photoURL, emoji, primary, secondary, onPress, secondaryAction }) {
  const theme = useTheme();

  return (
    <Pressable onPress={onPress}>
      <View style={{ backgroundColor: theme.colors.card, flexDirection: 'row', alignItems: 'center', borderBottomColor: theme.colors.border, borderBottomWidth: 1, padding: 8 }}>
        {emoji && (
          <IconButton size={size}>
            <Typography variant={size === 'large' ? 'h2' : 'h3'}>{emoji}</Typography>
          </IconButton>
        )}
        <View style={styles.main}>
          {!!primary && <Typography variant='h3'>{primary}</Typography>}
          {!!secondary && <Typography variant='body'>{secondary}</Typography>}
        </View>
        <View>
          {secondaryAction}
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    flex: 1
  }
})
