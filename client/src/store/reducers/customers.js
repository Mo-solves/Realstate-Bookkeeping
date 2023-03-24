import { createSlice } from '@reduxjs/toolkit';
import { addCustomer } from '../actions/customers';

export const customersSlice = createSlice({
  name: 'customers',
  initialState: {
    loading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // Add Article
      .addCase(addCustomer.pending, state => (state.loading = true))
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(addCustomer.rejected, state => {
        state.loading = false;
      });
  },
});

export default customersSlice.reducer;