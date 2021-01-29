import React from 'react'
import { RefreshControl, StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Spinner from '../../components/Spinner'
import ExpensesListItem from './ExpensesListItem'

export default function ExpensesList({ data, isLoading }) {
  if (isLoading && !data) return <Spinner />

  const renderItem = ({ item: { date, total, id, category, subCategory, userId } }) => (
    <ExpensesListItem
      date={date}
      total={total}
      id={id}
      category={category}
      subCategory={subCategory}
      userId={userId}
    />
  )

  if (!data) return null;

  return (
    <FlatList
      // refreshControl={(
      //   <RefreshControl
      //     refreshing={isRefreshing}
      //     onRefresh={() => console.log('hi')}
      //   />
      // )}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  )
}

const styles = StyleSheet.create({})
