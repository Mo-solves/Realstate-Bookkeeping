import { createSlice } from '@reduxjs/toolkit';

export const customersSlice = createSlice({
  name: 'customers',
  initialState: {
    homeSort: {},
    loading: false,
    customers: [],
    current: null,
  },
  reducers: {},
});

export default customersSlice.reducer;
