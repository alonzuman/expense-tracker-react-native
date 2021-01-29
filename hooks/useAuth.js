import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../app/firebase';
import { fetchOrCreateProfile, signOut } from '../features/auth/authSlice';

export default function useAuth() {
  const { isFetching, isFetched, data } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        if (!isFetched) {
          dispatch(fetchOrCreateProfile(authUser))
        }
      } else {
        dispatch(signOut());
      }
    })
  }, [])

  return { isLoading: isFetching, user: data }
}
