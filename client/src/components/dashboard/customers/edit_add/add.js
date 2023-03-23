import { AdminTitle } from '../../../../utils/tools';

import { useState, useRef } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

// comp
import { errorHelper, Loader } from '../../../../utils/tools';
import { formValues, validation } from './validationSchema';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { addCustomer } from '../../../../store/actions/customers';

// mui
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AddCustomer = () => {
  // redux
  const customers = useSelector(state => state.customers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: formValues,
    validationSchema: validation,
    onSubmit: values => {
      dispatch(addCustomer(values))
        .unwrap()
        .then(() => navigate('/dashboard/customers'));
    },
  });

  return (
    <>
      <AdminTitle title="Add Customer" />
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <TextField
            name="firstname"
            label="Enter a Firstname"
            variant="outlined"
            {...formik.getFieldProps('firstname')}
            {...errorHelper(formik, 'firstname')}
          />
          <TextField
            style={{ marginLeft: '10px' }}
            name="lastname"
            label="Enter a Lastname"
            variant="outlined"
            {...formik.getFieldProps('lastname')}
            {...errorHelper(formik, 'lastname')}
          />
        </div>
        <div className="form-group">
          <TextField
            style={{ width: '28%' }}
            type="number"
            name="phoneNumber"
            label="Enter a Phone Number"
            variant="outlined"
            {...formik.getFieldProps('phoneNumber')}
            {...errorHelper(formik, 'phoneNumber')}
          />
        </div>
        <div className="form-group">
          <TextField
            type="number"
            name="rentDue"
            label="Enter a Rent Due"
            variant="outlined"
            {...formik.getFieldProps('rentDue')}
            {...errorHelper(formik, 'rentDue')}
          />
          <TextField
            style={{ marginLeft: '10px' }}
            type="number"
            name="rentPaid"
            label="Enter a Rent Paid"
            variant="outlined"
            {...formik.getFieldProps('rentPaid')}
            {...errorHelper(formik, 'rentPaid')}
          />
        </div>
        <div className="form-group">
          <TextField
            style={{ width: '28%' }}
            name="location"
            label="Enter a Location"
            variant="outlined"
            {...formik.getFieldProps('location')}
            {...errorHelper(formik, 'location')}
          />
        </div>

        <Button
          style={{ marginTop: '20px' }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Add Customer
        </Button>
      </form>
    </>
  );
};

export default AddCustomer;
