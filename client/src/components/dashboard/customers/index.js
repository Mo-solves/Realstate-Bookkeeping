import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminTitle } from '../../../utils/tools';
import PaginateComponent from './paginate';

import { useDispatch, useSelector } from 'react-redux';
import {
  getPaginateCustomers,
  getAllCustomers,
  removeCustomer,
} from '../../../store/actions/customers';

import {
  Modal,
  Button,
  ButtonToolbar,
  ButtonGroup,
  InputGroup,
  FormControl,
} from 'react-bootstrap';

import { LinkContained, LinkContainer } from 'react-router-bootstrap';

const AdminCustomers = () => {
  const customers = useSelector(state => state.customers);

  const [customerData, setCustomerData] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState('');

  const [removeAlert, setRemoveAlert] = useState(false);
  const [toRemove, setToRemove] = useState(null);

  const handleClose = () => setRemoveAlert(false);
  const handleShow = (id = null) => {
    setToRemove(id);
    setRemoveAlert(true);
  };

  // START PAGINATION
  const goToPrevPage = page => {
    dispatch(getPaginateCustomers({ page }));
  };
  const goToNextPage = page => {
    console.log(page);
    dispatch(getPaginateCustomers({ page }));
  };

  const goToEdit = id => {
    navigate(`/dashboard/customers/edit/${id}`);
  };

  const handleDelete = () => {
    dispatch(removeCustomer(toRemove))
      .unwrap()
      .finally(() => {
        setRemoveAlert(false);
        setToRemove(null);
      });
  };

  // END PAGINATION

  // useEffect(() => {
  //   dispatch(getAllCustomers({}))
  //     .unwrap()
  //     .then(res => setUpdate(res));
  // }, []);

  useEffect(() => {
    dispatch(getPaginateCustomers({}))
      .unwrap()
      .then(response => setCustomerData(response));
  }, []);

  return (
    <>
      <AdminTitle title="Customers" />
      <div className="articles_table">
        <ButtonToolbar className="mb-3">
          <ButtonGroup className="mb-2">
            <LinkContainer to="/dashboard/customers/add">
              <Button variant="secondary">Add Customer</Button>
            </LinkContainer>
          </ButtonGroup>
          <form>
            <InputGroup>
              <InputGroup.Text id="btngrp1">@</InputGroup.Text>
              <FormControl type="text" placeholder="Search" />
            </InputGroup>
          </form>
        </ButtonToolbar>
        <>
          <PaginateComponent
            customers={customerData}
            goToPrevPage={page => goToPrevPage(page)}
            goToNextPage={page => goToNextPage(page)}
            goToEdit={id => goToEdit(id)}
            handleShow={id => handleShow(id)}
          />
        </>

        <Modal show={removeAlert} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Are you really sure ?</Modal.Title>
          </Modal.Header>
          <Modal.Body>There is no going back</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Oops, close this.
            </Button>
            <Button variant="danger" onClick={() => handleDelete()}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default AdminCustomers;
