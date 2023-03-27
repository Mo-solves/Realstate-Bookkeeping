import { createAsyncThunk } from "@reduxjs/toolkit";
import { errorGlobal, successGlobal } from "../reducers/notifications";
import { getAuthHeader } from "../../utils/tools";
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const addCustomer = createAsyncThunk(
  "customers/addCustomer",
  async (customer, { dispatch }) => {
    try {
      const request = await axios.post(
        "/api/customers",
        customer,
        getAuthHeader()
      );
      dispatch(successGlobal("Customer created!!"));
      return request.data;
    } catch (err) {
      dispatch(errorGlobal(err.response.data.message));
      throw err;
    }
  }
);

export const getCustomerById = createAsyncThunk(
  "customers/getCustomerById",
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

export const updateCustomer = createAsyncThunk(
  "customers/updateCustomer",
  async ({ values, customerId }, { dispatch }) => {
    try {
      const response = await axios.patch(
        `/api/customers/customer/${customerId}`,
        values,
        getAuthHeader()
      );
      dispatch(successGlobal("Customer Updated!!"));
      return response.data;
    } catch (err) {
      dispatch(errorGlobal(err.response.data.message));
      throw err;
    }
  }
);

// export const getCustomerHistory = createAsyncThunk(
//   'customers/getHistory',
//   async (customer, { dispatch }) => {
//     try {
//       if (customer.history != null) {
//         const request = await axios.get(
//           `/api/customers/customer/${customer._id}/history/${customer.phoneNumber}`,
//           getAuthHeader()
//         );
//         return request.data;
//       }
//     } catch (err) {
//       dispatch(errorGlobal(err.response.data.message));

//       throw err;
//     }
//   }
// );

export const getPaginateCustomers = createAsyncThunk(
  "customers/getPaginateCustomers",
  async ({ page = 1, limit = 5 }, { dispatch }) => {
    try {
      const response = await axios.post(
        `/api/customers/admin/paginate`,
        {
          page,
          limit,
        },
        getAuthHeader()
      );
      return response.data;
    } catch (err) {
      dispatch(errorGlobal(err.response.data.message));
      throw err;
    }
  }
);

// export const getAllCustomers = createAsyncThunk(
//   "customers/getAllCustomers",
//   async (_, { dispatch }) => {
//     try {
//       const response = await axios.get(`/api/customers`);
//       console.log(response.data);
//       return response.data;
//     } catch (err) {
//       dispatch(errorGlobal(err.response.data.message));

//       throw err;
//     }
//   }
// );

export const removeCustomer = createAsyncThunk(
  "customers/removeCustomer",
  async (_id, { dispatch, getState }) => {
    try {
      await axios.delete(`/api/customers/customer/${_id}`, getAuthHeader());
      dispatch(successGlobal("Customer Removed!!"));
      let page = getState().customers.adminCustomers.page;
      dispatch(getPaginateCustomers({ page }));
      return true;
    } catch (err) {
      dispatch(errorGlobal(err.response.data.message));

      throw err;
    }
  }
);
