import { useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import Typography from './Typography';

export default function TextField({
  value,
  clearTextOnFocus = false,
  keyboardType,
  icon,
  onChangeText,
  label,
  helperText,
  error,
  secureTextEntry = false,
  size = 'small',
  style,
  autoCapitalize = 'words',
  onBlur,
  ...rest
}) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {icon}
        <TextInput
          onBlur={onBlur}
          autoCapitalize={autoCapitalize}
          clearTextOnFocus={clearTextOnFocus}
          value={value}
          style={{
            backgroundColor: theme.colors.card,
            ...styles.input,
            ...styles[size],
            ...style
          }}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          {...rest}
        />
      </View>
      {error && <Typography style={{...styles.error, color: theme.colors.notification}} variant='subtitle' color={error ? 'error' : ''}>{error}</Typography>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    width: '100%'
  },

  input: {
    borderWidth: 1,
    width: '100%',
    borderColor: '#ebebeb',
    borderRadius: 8,
  },

  label: {
    marginBottom: 8
  },

  small: {
    fontSize: 18,
    paddingVertical: 8,
    paddingHorizontal: 8
  },

  medium: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 24
  },

  large: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 40
  },

  error: {
    marginTop: 8,
  }
})
