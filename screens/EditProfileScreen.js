import React from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '../components/TextField'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { updateUserSchema } from '../app/schemas'
import Button from '../components/Button'
import { updateProfileAsync } from '../features/auth/authSlice'
import FileUploader from '../features/storage/FileUploader'
import Avatar from '../components/Avatar'
import Picker from '../components/Picker'
import { CURRENCIES } from '../app/constants'

export default function EditProfileScreen({ navigation }) {
  const { data } = useSelector(state => state.auth);
  const dispatch = useDispatch()
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(updateUserSchema)
  })

  const updatePhotoUrl = async (url) => {
    if (url) {
      dispatch(updateProfileAsync(data.uid, {
        photoURL: url
      }))
    }
  }

  const onSubmit = async (values) => {
    await dispatch(updateProfileAsync(data.uid, values))
    navigation.goBack()
  }

  return (
    <View style={{ padding: 16, alignItems: 'center' }}>
      <Avatar photoURL={data.photoURL} size='large' />
      <FileUploader buttonLabel='Update' onCompletion={updatePhotoUrl} path={`users/${data.uid}/photoURL`} />
      <View style={{ alignItems: 'flex-start' }}>
        <Controller
          control={control}
          name='displayName'
          defaultValue={data.displayName}
          render={({ value, onChange, onBlur }) => (
            <TextField
              placeholder='John Doe'
              label='Display Name'
              value={value}
              onChangeText={v => onChange(v)}
              onBlur={onBlur}
            />
          )}
        />
        <Controller
          control={control}
          name='config.currency'
          defaultValue={data.config.currency}
          render={({ value, onChange }) => (
            <Picker
              label='Currency'
              options={CURRENCIES}
              selectedValue={value}
              onValueChange={val => onChange(val)}
            />
          )}
        />
      </View>
      <Button marginTop={16} onPress={handleSubmit(onSubmit)} label='Submit' />
    </View>
  )
}
