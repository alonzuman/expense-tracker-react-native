import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import Typography from '../components/Typography';
import ExpensesList from '../features/expenses/ExpensesList';
import { fetchMyExpenses } from '../features/expenses/expensesSlice';

export default function DashboardScreen() {
  const { data, isFetching, isFetched } = useSelector(state => state.expenses);
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isFetched) {
      dispatch(fetchMyExpenses())
    }
  }, [])

  return (
    <View>
      <View style={{ padding: 8 }}>
        <Typography style={{ marginBottom: 8 }} variant='h4'>Total Balance</Typography>
        <Typography variant='h1'>{data.balance}{ }</Typography>
      </View>
      <ExpensesList isLoading={isFetching} data={data.all} />
    </View>
  )
}
