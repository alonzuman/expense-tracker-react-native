import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm, Control, Controller } from 'react-hook-form'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Button from '../components/Button'
import TextField from '../components/TextField'
import Typography from '../components/Typography'
import { useDispatch } from 'react-redux'
import { updateProfileAsync } from '../features/auth/authSlice'
import { auth } from '../app/firebase'
import { upadteUserSchema } from '../app/schemas'

export default function OnBoarding() {
  const dispatch = useDispatch()
  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(upadteUserSchema)
  })

  const onSubmit = values => {
    const updatedProfile = {
      displayName: values.displayName,
      config: {
        currency: 'ILS'
      }
    }
    dispatch(updateProfileAsync(auth.currentUser.uid, updatedProfile))
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 }}>
        <Typography variant='h1'>Welcome!</Typography>
        <Typography variant='h4'>Please tell us yo name</Typography>
        <Controller
          control={control}
          name='displayName'
          defaultValue=''
          render={({ onChange, onBlur, value }) => (
            <TextField
              value={value}
              onChangeText={val => onChange(val)}
              onBlur={onBlur}
              label='Display Name'
              name='displayName'
              size='medium'
              placeholder='Johnny Doowie'
            />
          )}
        />
        <Button onPress={handleSubmit(onSubmit)} marginTop={16} label='Finish' />
      </View>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({})
