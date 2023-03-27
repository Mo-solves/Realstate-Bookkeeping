import { createSlice } from "@reduxjs/toolkit";
import {
  addCustomer,
  getPaginateCustomers,
  // updateCustomer,
} from "../actions/customers";

let DEFAULT_CUSTOMER_STATE = {
  loading: false,
  data: {
    _id: null,
    firstname: null,
    lastname: null,
    phoneNumber: null,
    rentDue: null,
    rentPaid: null,
    location: null,
    dueDate: null,
    balance: null,
    previousBalance: null,
    remainingDays: null,
    history: null,
    startingDate: null,
    createdDate: null,
  },
};

export const customersSlice = createSlice({
  name: "customers",
  initialState: DEFAULT_CUSTOMER_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Customer
      .addCase(addCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.lastAdded = action.payload;
      })
      .addCase(addCustomer.rejected, (state) => {
        state.loading = false;
      })
      // Get Paginate
      .addCase(getPaginateCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPaginateCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.adminCustomers = action.payload;
      })
      .addCase(getPaginateCustomers.rejected, (state) => {
        state.loading = false;
      });

    // // Update Customer
    // .addCase(updateCustomer.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(updateCustomer.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.data = action.payload.data;
    // })
    // .addCase(updateCustomer.rejected, (state) => {
    //   state.loading = false;
    // });
  },
  // extraReducers: (builder) => {
  //   builder;
  //   // // Add Article
  //   // .addCase(addCustomer.pending, (state) => (state.loading = true))
  //   // .addCase(addCustomer.fulfilled, (state, action) => {
  //   //   state.loading = false;
  //   //   state.data = action.payload.data;
  //   // })
  //   // .addCase(addCustomer.rejected, (state) => {
  //   //   state.loading = false;
  //   // })
  //   // // GET PAGINATE CUSTOMERS
  //   // .addCase(getPaginateCustomers.pending, (state) => (state.loading = true))
  //   // .addCase(getPaginateCustomers.fulfilled, (state, action) => {
  //   //   state.loading = false;
  //   //   state.data = action.payload.data;
  //   // })
  //   // .addCase(getPaginateCustomers.rejected, (state) => {
  //   //   state.loading = false;
  //   // });
  // },
});

export default customersSlice.reducer;
