import React from 'react'
import { EXP_CATEGORIES } from '../../app/constants'
import ListItem from '../../components/ListItem';
import Swipeout from 'react-native-swipeout'
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { deleteExpenseAsync } from './expensesSlice';

export default function ExpensesListItem({ date, total, category, id, userId }) {
  const { emoji, label } = EXP_CATEGORIES.categories[category];
  const dispatch = useDispatch()

  const rightButtons = [
    {
      text: <AntDesign name="delete" size={24} color="#fff" />,
      backgroundColor: 'tomato',
      onPress: () => dispatch(deleteExpenseAsync({ id, total }))
    }
  ]

  return (
    <Swipeout
      right={rightButtons}
      autoClose
      backgroundColor='transparent'
    >
      <ListItem
        emoji={emoji}
        primary={`${-1 * parseInt(total.amount)} ${total.currency}`}
        secondary={label}
      />
    </Swipeout>
  )
}
