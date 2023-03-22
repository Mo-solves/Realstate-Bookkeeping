import { createAsyncThunk } from '@reduxjs/toolkit';
import { errorGlobal, successGlobal } from '../reducers/notifications';
import { getAuthHeader, removeTokenCookie } from '../../utils/tools';
import axios from 'axios';

export const registerUser = createAsyncThunk(
  'users/registerUser',
  async ({ email, password }, { dispatch }) => {
    try {
      const request = await axios.post('/api/auth/register', {
        email: email,
        password: password,
      });
      dispatch(
        successGlobal('Welcome !!. Check your email to validate account')
      );
      return { data: request.data.user, auth: true };
    } catch (err) {
      console.log(err.response.data.message);
      dispatch(errorGlobal(err.response.data.message));
      throw err;
    }
  }
);

export const signInUser = createAsyncThunk(
  'users/signInUser',
  async ({ email, password }, { dispatch }) => {
    try {
      const request = await axios.post('/api/auth/signin', {
        email: email,
        password: password,
      });
      dispatch(successGlobal('Welcome !!'));
      return { data: request.data.user, auth: true };
    } catch (err) {
      console.log(err.response.data.message);

      dispatch(errorGlobal(err.response.data.message));
      throw err;
    }
  }
);

export const isAuth = createAsyncThunk('users/isAuth', async () => {
  try {
    const request = await axios.get('/api/isauth', getAuthHeader());
    return { data: request.data, auth: true };
  } catch (err) {
    return { data: {}, auth: false };
  }
});

export const signOut = createAsyncThunk('users/signOut', async () => {
  removeTokenCookie();
});
