import React from 'react'
import Modal from 'react-native-modal'
import { View, Text, Button, SafeAreaView } from 'react-native'
import { useState } from 'react'
import CreateExpense from '../features/expenses/CreateExpense';
import Header from '../components/Header';
import { useTheme } from '@react-navigation/native';

export default function CreateModal({ navigation }) {
  const theme = useTheme()
  const [isVisible, setIsVisible] = useState(true);

  const closeModal = () => {
    setIsVisible(false);
    navigation.goBack()
  }

  return (
    <Modal
      onSwipeComplete={closeModal}
      swipeDirection='down'
      isVisible={isVisible}
      style={{ flex: 1, marginTop: 64, borderTopRightRadius: 16, borderTopLeftRadius: 16, margin: 0, backgroundColor: '#fff' }}
    >
      <Header
        action={<Button color={theme.colors.primary} title='Cancel' onPress={closeModal} />}
        title='Create expense'
      />
      <CreateExpense closeModal={closeModal} />
    </Modal>
  )
}
