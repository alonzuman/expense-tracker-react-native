import React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import Avatar from '../components/Avatar'
import Typography from '../components/Typography'
import SignOutButton from '../features/auth/SignOutButton'

export default function ProfileScreen() {
  const { data } = useSelector(state => state.auth);

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Avatar photoURL={data?.photoURL} size='large' />
      {data?.displayName && <Typography style={{ marginTop: 8 }} variant='h2'>{data?.displayName}</Typography>}
      {data?.email && <Typography style={{ marginTop: 8, marginBottom: 16 }} variant='body'>{data?.email}</Typography>}
      <SignOutButton />
    </View>
  )
}
