import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
// Comp
import { AdminTitle } from "../../../../utils/tools";
import { errorHelper, Loader } from "../../../../utils/tools";
import { formValues, validation } from "./validationSchema";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomerById,
  updateCustomer,
  getCustomerHistory,
} from "../../../../store/actions/customers";
// // mui
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Moment from "react-moment";

export const EditCustomer = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(formValues);
  const [history, setHistory] = useState("");
  // const customers = useSelector((state) => state.customers.customer);
  const dispatch = useDispatch();
  let { customerId } = useParams();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: validation,
    onSubmit: (values) => {
      dispatch(updateCustomer({ values, customerId }));
    },
  });

  ///// Edit
  useEffect(() => {
    dispatch(getCustomerById(customerId))
      .unwrap()
      .then((res) => {
        setLoading(false);
        setFormData(res);
      });
  }, [dispatch, customerId]);

  return (
    <>
      <AdminTitle title="Edit article" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2>Remaining Days: {formData.remainingDays}</h2>
          <h3>Previous Balance: {formData.previousBalance}</h3>
          <h3>Balance: {formData.balance}</h3>
          <h3>
            StartingDate:{" "}
            {<Moment format="DD/MM/YYYY">{formData.StartingDate}</Moment>}
          </h3>
          <h3>
            dueDate: {<Moment format="DD/MM/YYYY">{formData.dueDate}</Moment>}
          </h3>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <TextField
                name="firstname"
                label="Enter a Firstname"
                variant="outlined"
                {...formik.getFieldProps("firstname")}
                {...errorHelper(formik, "firstname")}
              />
              <TextField
                style={{ marginLeft: "10px" }}
                name="lastname"
                label="Enter a Lastname"
                variant="outlined"
                {...formik.getFieldProps("lastname")}
                {...errorHelper(formik, "lastname")}
              />
            </div>
            <div className="form-group">
              <TextField
                style={{ width: "28%" }}
                type="number"
                name="phoneNumber"
                label="Enter a Phone Number"
                variant="outlined"
                {...formik.getFieldProps("phoneNumber")}
                {...errorHelper(formik, "phoneNumber")}
              />
            </div>
            <div className="form-group">
              <TextField
                type="number"
                name="rentDue"
                label="Enter a Rent Due"
                variant="outlined"
                {...formik.getFieldProps("rentDue")}
                {...errorHelper(formik, "rentDue")}
              />
              <TextField
                style={{ marginLeft: "10px" }}
                type="number"
                name="rentPaid"
                label="Enter a Rent Paid"
                variant="outlined"
                {...formik.getFieldProps("rentPaid")}
                {...errorHelper(formik, "rentPaid")}
              />
            </div>
            <div className="form-group">
              <TextField
                style={{ width: "28%" }}
                name="location"
                label="Enter a Location"
                variant="outlined"
                {...formik.getFieldProps("location")}
                {...errorHelper(formik, "location")}
              />
            </div>

            <Button
              style={{ marginTop: "20px" }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Edit Customer
            </Button>
          </form>
          {formData.history != null ? (
            <CustomerHistory
              formData={formData}
              customerId={customerId}
              setHistory={setHistory}
              history={history}
            />
          ) : null}
        </>
      )}
    </>
  );
};

export const CustomerHistory = ({
  formData,
  customerId,
  setHistory,
  history,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  console.log(history);

  useEffect(() => {
    dispatch(getCustomerHistory(formData))
      .unwrap()
      .then((response) => {
        setHistory(response);
        setLoading(false);
      });
  }, [customerId]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {history.map((history) => {
            return (
              <>
                {" "}
                <h1>History</h1>
                <h2>{`${formData.firstname} ${formData.lastname}`}</h2>
                <h3>rent Due: {history.rentDue}</h3>
                <h3>rent Paid: {history.rentPaid}</h3>
                <h3>Balance: {history.balance}</h3>
                <h3>Previous Balance: {history.previousBalance}</h3>
                <h3>
                  StartingDate:{" "}
                  {<Moment format="DD/MM/YYYY">{history.StartingDate}</Moment>}
                </h3>
                <h3>
                  dueDate:{" "}
                  {<Moment format="DD/MM/YYYY">{history.dueDate}</Moment>}
                </h3>{" "}
              </>
            );
          })}
        </>
      )}
    </>
  );
};
