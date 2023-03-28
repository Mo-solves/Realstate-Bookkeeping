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
import { Table } from "react-bootstrap";

export const EditCustomer = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(formValues);
  const [history, setHistory] = useState("");
  const user = useSelector((state) => state.users.data);
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
          <Table striped bordered hover>
            <thead>
              <tr>
                <td>Starting Date</td>
                <td>Due Date</td>
                <td>Remaining Days</td>
                <td>Previus Balance</td>
                <td>Balance</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {<Moment format="DD/MM/YYYY">{formData.StartingDate}</Moment>}
                </td>
                <td>
                  {<Moment format="DD/MM/YYYY">{formData.dueDate}</Moment>}
                </td>
                <td>{formData.remainingDays}</td>
                <td>{formData.previousBalance}</td>
                <td>{formData.balance}</td>
              </tr>
            </tbody>
          </Table>

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
          <h1 className="mt-4">Customer History</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <td>Starting Date</td>
                <td>Due Date</td>
                <td>Full Name</td>
                <td>Rent Due</td>
                <td>Rent Paid</td>
                <td>Balance</td>
              </tr>
            </thead>
            <tbody>
              {history.map((history) => {
                return (
                  <tr key={history._id}>
                    <td>
                      {
                        <Moment format="DD/MM/YYYY">
                          {history.StartingDate}
                        </Moment>
                      }
                    </td>
                    <td>
                      {<Moment format="DD/MM/YYYY">{history.dueDate}</Moment>}
                    </td>
                    <td>{`${formData.firstname} ${formData.lastname}`}</td>
                    <td>{history.rentDue}</td>
                    <td>{history.rentPaid}</td>
                    <td>{history.balance}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};
