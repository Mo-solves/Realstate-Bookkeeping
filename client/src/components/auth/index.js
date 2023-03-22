import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { errorHelper, Loader } from '../../utils/tools';

import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { registerUser, signInUser } from '../../store/actions/users';

import PreventSignIn from '../../hoc/preventSignIn';

const Auth = () => {
  const [register, setRegister] = useState(false);
  const navigate = useNavigate();
  // redux
  const users = useSelector(state => state.users);
  const notifications = useSelector(state => state.notifications);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Sorry the email is required')
        .email('This is not a valid email'),
      password: Yup.string().required('Sorry the password is required'),
    }),
    onSubmit: values => {
      handleSubmit(values);
    },
  });

  const handleSubmit = values => {
    if (register) {
      dispatch(registerUser(values));
      console.log(values, 'register');
    } else {
      dispatch(signInUser(values));
      console.log(values, 'sign in');
    }
  };

  useEffect(() => {
    if (notifications && notifications.global.success) {
      // redirect
      navigate('/dashboard');
    }
  }, [notifications]);

  return (
    <PreventSignIn users={users}>
      <div className="auth_container">
        <h1>Authenticate</h1>
        {users.loading ? (
          <Loader />
        ) : (
          <Box
            sx={{
              '& .MuiTextField-root': { width: '100%', marginTop: '20px' },
            }}
            component="form"
            onSubmit={formik.handleSubmit}
          >
            <TextField
              name="email"
              label="Enter your email"
              variant="outlined"
              {...formik.getFieldProps('email')}
              {...errorHelper(formik, 'email')}
            />

            <TextField
              name="password"
              label="Enter your password"
              type="password"
              variant="outlined"
              {...formik.getFieldProps('password')}
              {...errorHelper(formik, 'password')}
            />

            <div className="mt-2">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="large"
              >
                {register ? 'Register' : 'Login'}
              </Button>
              <Button
                className="mt-3"
                variant="outlined"
                color="secondary"
                size="small"
                onClick={() => setRegister(!register)}
              >
                Want to {!register ? 'Register' : 'Login'}
              </Button>
            </div>
          </Box>
        )}
      </div>
    </PreventSignIn>
  );
};

export default Auth;
