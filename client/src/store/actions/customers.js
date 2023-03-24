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

export const getCustomerById = createAsyncThunk(
  'customers/getCustomerById',
  async (_id, { dispatch }) => {
    try {
      const request = await axios.get(
        `/api/customers/customer/${_id}`,
        getAuthHeader()
      );
      return request.data;
    } catch (err) {
      dispatch(errorGlobal(err.response.data.message));
      throw err;
    }
  }
);

export const getCustomerHistory = createAsyncThunk(
  'customers/getHistory',
  async (customer, { dispatch }) => {
    try {
      if (customer.history != null) {
        const request = await axios.get(
          `/api/customers/customer/${customer._id}/history/${customer.phoneNumber}`,
          getAuthHeader()
        );
        return request.data;
      }
    } catch (err) {
      dispatch(errorGlobal(err.response.data.message));

      throw err;
    }
  }
);

export const updateCustomer = createAsyncThunk(
  'customers/updateCustomer',
  async (values, customerId, { dispatch }) => {
    try {
      await axios.patch(`/api/customers/customer/${customerId}`, values);
      dispatch(successGlobal('Customer Updated!!'));
      return true;
    } catch (err) {
      dispatch(errorGlobal(err.response.data.message));
      throw err;
    }
  }
);
