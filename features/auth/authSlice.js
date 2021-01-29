import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../app/firebase";

const INITIAL_STATE = {
  data: null,
  isUpdating: false,
  isFetched: false,
  isFetching: true
}

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    isUpdating: (state) => {
      state.isUpdating = true;
    },
    isFetched: (state) => {
      state.isFetched = false;
    },
    isFetching: (state) => {
      state.isFetching = true;
    },
    clearFetching: (state) => {
      state.isFetching = false;
    },
    signIn: (state, action) => {
      state.data = action.payload;
      state.isFetching = false;
      state.isFetched = true;
    },
    signOut: (state) => {
      state.data = null;
      state.isFetching = false;
    },
    setProfile: (state, action) => {
      state.data = { ...state.data, ...action.payload };
      state.isFetched = true;
      state.isUpdating = false;
      state.isFetching = false;
    }
  }
})

export const { isFetching, isUpdating, clearFetching, setProfile, signIn, signOut } = authSlice.actions

export const fetchOrCreateProfile = (user) => dispatch => {
  const userId = user?.uid;
  dispatch(isFetching())

  db.collection('profiles').doc(userId).get()
    .then(snapshot => {
      if (snapshot.exists) {
        dispatch(signIn({
          uid: snapshot.id,
          ...snapshot.data()
        }))
      } else {
        const userData = {
          uid: userId,
          displayName: user?.displayName || '',
          email: user?.email || '',
          photoURL: user?.photoURL || '',
          createdAt: Date.now()
        }
        db.collection('profiles').doc(userId).set(userData)
          .then(() => {
            dispatch(signIn(userData))
          })
      }
    })
    .catch(({ message }) => {
      dispatch(signOut())
      console.log(message)
    })
}

export const updateProfileAsync = (userId, profile) => dispatch => {
  dispatch(isUpdating())

  db.collection('profiles').doc(userId).set(profile, { merge: true })
    .then(() => {
      dispatch(setProfile(profile))
    })
    .catch(({ message }) => {
      console.log({ message })
    })
}

export default authSlice.reducer
