import { useTheme } from '@react-navigation/native'
import React from 'react'
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../../app/firebase'
import Button from '../../components/Button'
import TextField from '../../components/TextField'
import Typography from '../../components/Typography'
import { clearFetching, isFetching } from './authSlice'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  email: yup.string().email('Email address is not valid ').required('Email is a required field'),
  password: yup.string().min(6, 'Password is too short').max(32, 'Password is too long').required('Password is required')
})

export default function SignIn({ navigation }) {
  const theme = useTheme()
  const { isLoading } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = values => {
    dispatch(isFetching())
    auth.signInWithEmailAndPassword(values.email, values.password)
      .catch(({ message }) => {
        console.log(message);
        Alert.alert(
          'Authentication error',
          message
        )
        dispatch(clearFetching())
      })
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <Typography variant='h1'>Sign In</Typography>
      <Controller
        control={control}
        name='email'
        defaultValue=''
        render={({ onChange, onBlur, value }) => (
          <TextField
            error={errors?.email?.message}
            label='Email'
            autoCapitalize='none'
            placeholder='john@doe.com'
            keyboardType='email-address'
            onChangeText={v => onChange(v)}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name='password'
        defaultValue=''
        render={({ value, onBlur, onChange }) => (
          <TextField
            label='Password'
            onBlur={onBlur}
            error={errors?.password?.message}
            autoCapitalize='none'
            value={value}
            placeholder='******'
            secureTextEntry
            onChangeText={val => onChange(val)}
          />
        )}
      />
      <Button isLoading={isLoading} disabled={isLoading} marginTop={16} label='Sign In' onPress={handleSubmit(onSubmit)} />
      <Typography style={{ color: theme.colors.primary, marginTop: 24 }} variant='body1' onPress={() => navigation.navigate('Sign Up')}>Haven't signed up yet?</Typography>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  }
})
