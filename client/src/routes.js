import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAuth } from "./store/actions/users";
import { Loader } from "./utils/tools";

import MainLayout from "./hoc/mainLayout";
import Header from "./components/navigation/header";
// import Home from './components/home';
import Auth from "./components/auth";

import Dashboard from "./components/dashboard";
import DashboardMain from "./components/dashboard/main";
import AdminCustomers from "./components/dashboard/customers";
import AdminProfile from "./components/dashboard/profile";
import AddCustomer from "./components/dashboard/customers/edit_add/add";
import {
  EditCustomer,
  // CustomerHistory,
} from "./components/dashboard/customers/edit_add/edit";

// import AccountVerify from './components/auth/verification';

import AuthGuard from "./hoc/authGuard";

const Router = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(isAuth());
  }, []);

  useEffect(() => {
    if (users.auth !== null) {
      setLoading(false);
    }
  }, [users]);

  return (
    <BrowserRouter>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <MainLayout>
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <AuthGuard>
                    <Dashboard />
                  </AuthGuard>
                }
              >
                <Route index element={<DashboardMain />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="customers" element={<AdminCustomers />} />

                <Route path="customers/add" element={<AddCustomer />} />

                <Route
                  path="customers/edit/:customerId"
                  element={<EditCustomer />}
                />
                {/* 
                <Route
                  path="customers/edit/:customerId"
                  element={<CustomerHistory />}
                /> */}
              </Route>
              {/* <Route path="/verification" element={<AccountVerify />} /> */}
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<Auth />} />
              {/* <Route path="/" element={<Home />} /> */}
            </Routes>
          </MainLayout>
        </>
      )}
    </BrowserRouter>
  );
};

export default Router;
