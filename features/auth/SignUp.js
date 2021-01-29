import { useTheme } from '@react-navigation/native'
import React, { useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { auth } from '../../app/firebase'
import Button from '../../components/Button'
import TextField from '../../components/TextField'
import Typography from '../../components/Typography'
import { clearFetching, fetchOrCreateProfile } from '../auth/authSlice'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userSchema } from '../../app/schemas'

export default function SignUp({ navigation }) {
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(userSchema)
  })
  const theme = useTheme();
  const dispatch = useDispatch()

  const onSubmit = values => {
    auth.createUserWithEmailAndPassword(values.email, values.password)
      .catch(({ message }) => {
        console.log({ message })
        Alert.alert(
          'Authentication error',
          message
        )
        dispatch(clearFetching())
      })
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <Typography variant='h1'>Sign Up</Typography>
      <Controller
        control={control}
        name='email'
        defaultValue=''
        render={({ value, onChange, onBlur }) => (
          <TextField
            value={value}
            onChangeText={val => onChange(val)}
            onBlur={onBlur}
            error={errors?.email?.message}
            label='Email'
            autoCapitalize='none'
            keyboardType='email-address'
            placeholder='john@doe.com'
          />
        )}
      />
      <Controller
        control={control}
        name='password'
        defaultValue=''
        render={({ value, onChange, onBlur }) => (
          <TextField
            label='Password'
            autoCapitalize='none'
            value={value}
            onBlur={onBlur}
            onChangeText={val => onChange(val)}
            secureTextEntry
            placeholder='******'
          />
        )}
      />
      <Controller
        control={control}
        name='confirmPassword'
        defaultValue=''
        render={({ value, onChange, onBlur }) => (
          <TextField
            label='Confirm Password'
            autoCapitalize='none'
            value={value}
            onBlur={onBlur}
            onChangeText={val => onChange(val)}
            secureTextEntry
            error={errors?.confirmPassword?.message}
            placeholder='******'
          />
        )}
      />
      <Button marginTop={16} onPress={handleSubmit(onSubmit)} label='Sign Up' />
      <Typography style={{ color: theme.colors.primary, marginTop: 24 }} onPress={() => navigation.navigate('Sign In')} variant='body'>Already signed up?</Typography>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
