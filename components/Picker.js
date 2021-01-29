import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Picker as DefaultPicker } from '@react-native-picker/picker'
import Typography from './Typography'

export default function Picker({ options = {}, onValueChange, selectedValue, label = '' }) {
  return (
    <View style={styles.wrapper}>
      {!!label && <Typography variant='subtitle'>{label}</Typography>}
      <DefaultPicker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.container}
        itemStyle={styles.item}
      >
        {Object.keys(options).map(key => (
          <DefaultPicker.Item color='#000' key={key} label={options[key].label} value={key} />
        ))}
      </DefaultPicker>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    height: 68,
    minWidth: 96,
    marginTop: 16
  },

  container: {
    marginTop: 8,
    fontSize: 18,
    borderRadius: 8,
    height: 40,
    backgroundColor: 'pink'
  },

  item: {
    fontSize: 18,
    borderRadius: 8,
    height: 40,
    backgroundColor: '#ffffff',
  }
})
