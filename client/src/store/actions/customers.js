import { createAsyncThunk } from '@reduxjs/toolkit';
import { errorGlobal, successGlobal } from '../reducers/notifications';
import { getAuthHeader } from '../../utils/tools';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const addCustomer = createAsyncThunk(
  'customers/addCustomer',
  async (customer, { dispatch }) => {
    try {
      const request = await axios.post(
        '/api/customers',
        customer,
        getAuthHeader()
      );
      dispatch(successGlobal('Customer created!!'));
      return request.data;
    } catch (err) {
      dispatch(errorGlobal(err.response.data.message));
      throw err;
    }
  }
);
