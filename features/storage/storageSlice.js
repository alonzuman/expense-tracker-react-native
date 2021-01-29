import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  tasks: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    isUploading: (state, action) => {
      state.tasks[action.payload.taskId].isUploaded = false;
      state.tasks[action.payload.taskId].isUploading = true;
    },
    isUploaded: (state, action) => {
      state.tasks[action.payload.taskId].isUploading = false;
      state.tasks[action.payload.taskId].isUploaded = true;
    },

  }
})

export const { isUploaded, isUploading } = authSlice.actions

export default authSlice.reducer
