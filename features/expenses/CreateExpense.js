import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { CURRENCIES, EXP_CATEGORIES } from '../../app/constants';
import { auth } from '../../app/firebase';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import ListItem from '../../components/ListItem';
import TextField from '../../components/TextField';
import { addExpenseAsync } from './expensesSlice';
import { useForm, Controller } from 'react-hook-form';
import { AntDesign } from '@expo/vector-icons';
import Typography from '../../components/Typography';
import IconButton from '../../components/IconButton';

export default function CreateExpense({ closeModal }) {
  const { control, handleSubmit, error } = useForm()
  const { data: { config } } = useSelector(state => state.auth)
  const [category, setCategory] = useState('foodAndBeverage')
  const dispatch = useDispatch()

  const onSubmit = async data => {
    const expense = {
      total: {
        ...data.total,
        currency: config.currency
      },
      category,
      userId: auth.currentUser.uid,
      createdAt: Date.now(),
      date: Date.now(),
    }
    await dispatch(addExpenseAsync(expense))
    if (closeModal) return await closeModal()
  }

  const CATEGORIES_ARRAY = Object.keys(EXP_CATEGORIES.categories).map(key => {
    return {
      value: key,
      ...EXP_CATEGORIES.categories[key]
    }
  })

  const renderItem = ({ item }) => {
    return (
      <ListItem
        onPress={() => setCategory(item.value)}
        size='small'
        secondary={item.label}
        emoji={item.emoji}
        secondaryAction={category === item.value && (
          <AntDesign name="check" size={24} color="black" />
        )}
      />
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, padding: 8 }}>
        <Controller
          control={control}
          name='total.amount'
          defaultValue='0'
          rules={{ required: true }}
          render={({ onChange, onBlur, value }) => (
            <TextField
              clearTextOnFocus
              value={value}
              size='large'
              onBlur={onBlur}
              onChangeText={val => onChange(val)}
              keyboardType='decimal-pad'
              label='Amount'
              style={{
                borderWidth: 0
              }}
              icon={<IconButton><Typography variant='h2'>{CURRENCIES[config.currency].symbol}</Typography></IconButton>}
            />
          )}
        />
        <FlatList
          keyExtractor={item => item.value}
          data={CATEGORIES_ARRAY}
          renderItem={renderItem}
          style={styles.categories}
        />
      </KeyboardAvoidingView>
      <Footer>
        <Button onPress={handleSubmit(onSubmit)} label='Create' />
      </Footer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  categories: {
  }
})
