import { useTheme } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Typography({ variant = 'body', children, style, onPress }) {
  const theme = useTheme();

  const renderText = () => {
    switch (variant) {
      case 'h1': return <Text onPress={onPress} style={{ ...styles.h1, color: theme.colors.text, ...style }}>{children}</Text>;
      case 'h2': return <Text onPress={onPress} style={{ ...styles.h2, color: theme.colors.text, ...style }}>{children}</Text>;
      case 'h3': return <Text onPress={onPress} style={{ ...styles.h3, color: theme.colors.text, ...style }}>{children}</Text>;
      case 'h4': return <Text onPress={onPress} style={{ ...styles.h4, color: theme.colors.text, ...style }}>{children}</Text>;
      case 'h5': return <Text onPress={onPress} style={{ ...styles.h5, color: theme.colors.text, ...style }}>{children}</Text>;
      case 'body': return <Text onPress={onPress} style={{ ...styles.body, color: theme.colors.text, ...style }}>{children}</Text>;
      case 'subtitle': return <Text onPress={onPress} style={{ ...styles.subtitle, color: theme.colors.text, ...style }}>{children}</Text>;
      default: return <Text onPress={onPress} style={{ ...styles.body, color: theme.colors.text, ...style }}>{children}</Text>;
    }
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={onPress ? .5 : 1}>
      {renderText()}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 40,
  },

  h2: {
    fontSize: 32
  },

  h3: {
    fontSize: 24
  },

  h4: {
    fontSize: 18,
    fontWeight: '500'
  },

  h5: {

  },

  body: {
    fontSize: 16
  },

  subtitle: {
    fontSize: 14
  }
})
