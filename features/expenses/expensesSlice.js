import { createSlice } from "@reduxjs/toolkit";
import { auth, db } from '../../app/firebase';

const INITIAL_STATE = {
  data: {
    all: [],
    balance: 0,
  },
  isFetching: false,
  isFetched: false,
  isUpdating: false
}

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: INITIAL_STATE,
  reducers: {
    isUpdating: (state) => {
      state.isUpdating = true;
    },
    isFetching: (state) => {
      state.isFetched = false;
      state.isFetching = true;
    },
    addExpense: (state, action) => {
      state.data.all.push(action.payload);
      state.data.balance -= parseInt(action.payload.total.amount);
      state.isUpdating = false;
    },
    deleteExpense: (state, action) => {
      state.data.balance += parseInt(action.payload.total.amount);
      state.data.all = state.data.all.filter(exp => exp.id !== action.payload.id);
      state.isUpdating = false
    },
    setExpenses: (state, action) => {
      state.data.all = action.payload.expenses;
      state.data.balance = action.payload.balance;
      state.data.isFetching = false;
      state.data.isFetched = true;
    },
  }
})

export const { isFetching, isUpdating, setExpenses, addExpense, deleteExpense } = expensesSlice.actions

export const deleteExpenseAsync = (expense) => dispatch => {
  dispatch(isUpdating())

  db.collection('expenses').doc(expense.id).delete()
    .then(() => dispatch(deleteExpense(expense)))
    .catch(({ message }) => console.log(message))
}

export const fetchMyExpenses = () => dispatch => {
  dispatch(isFetching())

  db.collection('expenses').where('userId', '==', auth.currentUser.uid).orderBy('date', 'desc').get()
    .then(snapshot => {
      let balance = 0;
      const expenses = snapshot.docs.map(doc => {
        balance += parseInt(doc.data().total.amount);
        return {
          id: doc.id,
          ...doc.data()
        }
      })
      dispatch(setExpenses({ expenses, balance }));
    })
    .catch(({ message }) => {
      console.log(message);
    })
}

export const addExpenseAsync = (expense) => dispatch => {
  dispatch(isUpdating);

  db.collection('expenses').add(expense)
    .then(snapshot => {
      dispatch(addExpense({ id: snapshot.id, ...expense }))
    })
    .catch(({ message }) => {
      console.log(message);
    })
}

export default expensesSlice.reducer
