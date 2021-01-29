import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import expensesReducer from '../features/expenses/expensesSlice';
import storageReducer from '../features/storage/storageSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expensesReducer,
    storage: storageReducer
  }
})

export default store;
