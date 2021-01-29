import * as yup from 'yup'

export const userSchema = yup.object().shape({
  email: yup.string().email('Email address is not valid').required(),
  password: yup.string().min(6, 'Password is too short').max(32, 'Password is too long').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
})

export const updateUserSchema = yup.object().shape({
  displayName: yup.string().min(3, 'Too short').max(32, 'Too long').required('This field is required')
})
