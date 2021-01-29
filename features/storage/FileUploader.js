import React, { useEffect, useState } from 'react'
import { View, Text, Button, Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { auth } from '../../app/firebase';
import useStorage from '../../hooks/useStorage';

export default function FileUploader({ buttonLabel = 'Choose file', component, onCompletion, path = `users/${auth.currentUser.uid}/photoURL` }) {
  const [uri, setUri] = useState('')
  const { progress, downloadURL } = useStorage({
    uri,
    path
  })

  useEffect(() => {
    const getPermissions = async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need a camera roll permissions.')
        }
      }
    }

    getPermissions()
  }, [])


  const handlePress = async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (!res.cancelled && res.uri) {
      setUri(res.uri)
    }
  }

  useEffect(() => {
    // TODO fix so it wouldnt do it on each render
    if (downloadURL && onCompletion) {
      onCompletion(downloadURL)
    }
  }, [downloadURL])

  return (
    <View>
      {component ? component : <Button onPress={handlePress} title={buttonLabel} />}
      {progress > 0 && progress < 100 && <Text>{progress}%</Text>}
    </View>
  )
}
