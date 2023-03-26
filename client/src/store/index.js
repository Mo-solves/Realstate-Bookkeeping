import { configureStore } from "@reduxjs/toolkit";
import UsersReducer from "./reducers/users";
import NotificationsReducer from "./reducers/notifications";
import SiteReducer from "./reducers/site";
import CustomersReducer from "./reducers/customers";

export const store = configureStore({
  reducer: {
    users: UsersReducer,
    notifications: NotificationsReducer,
    site: SiteReducer,
    customers: CustomersReducer,
  },
});
