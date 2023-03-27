import { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import EmailStepper from './stepper/email';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';

const AuthProfile = () => {
  const [emailModal, setEmailModal] = useState(false);
  const users = useSelector(state => state.users);

  const closeModal = () => setEmailModal(false);
  const openModal = () => setEmailModal(true);
  return (
    <>
      <div>
        <div className="mb-3 auth_grid">
          <Grid contained sapcing={1} display="flex" alignItems="flex-end">
            <Grid item>
              <TextField value={users.data.email} disabled variant="standard" />
            </Grid>
            <Grid item>
              <EditIcon color="primary" onClick={openModal} />
            </Grid>
          </Grid>
          <Grid
            contained
            sapcing={1}
            display="flex"
            alignItems="flex-end"
            className="mt-2"
          >
            <Grid item>
              <TextField value="******" disabled variant="standard" />
            </Grid>
            <Grid item>
              <EditIcon color="primary" onClick={openModal} />
            </Grid>
          </Grid>
        </div>
        <Divider />
        <Modal size="lg" centered show={emailModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update your Email</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EmailStepper user={users} closeModal={closeModal} />
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default AuthProfile;