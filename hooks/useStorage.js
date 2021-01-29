import React, { useEffect, useState } from 'react'
import firebase from 'firebase'

export default function useStorage({ uri, path }) {
  const storageRef = firebase.storage().ref()
  const [progress, setProgress] = useState(0)
  const [downloadURL, setDownloadURL] = useState('')

  const uploadFile = async (uri) => {
    const res = await fetch(uri)
    const blob = await res.blob()
    const uploadTask = firebase
      .storage()
      .ref()
      .child(path)
      .put(blob)

    const onProgressChange = snapshot => {
      let p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(p)
    }
    const onError = err => console.log(err)
    const onCompletion = () => {
      uploadTask.snapshot.ref.getDownloadURL().then(url => {
        console.log(url)
        setDownloadURL(url)
      })
    }

    await uploadTask.on('state_changed', onProgressChange, onError, onCompletion)
  }

  useEffect(() => {
    if (uri) {
      uploadFile(uri)
    }
  }, [uri])

  return { progress, downloadURL }
}
