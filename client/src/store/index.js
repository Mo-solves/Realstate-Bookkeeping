import { configureStore } from '@reduxjs/toolkit';
import UsersReducer from './reducers/users';
import CustomersReducer from './reducers/customers';
import NotificationReducer from './reducers/notifications';
import SiteReducer from './reducers/site';
export const store = configureStore({
  reducer: {
    users: UsersReducer,
    customers: CustomersReducer,
    notifications: NotificationReducer,
    site: SiteReducer,
  },
});
