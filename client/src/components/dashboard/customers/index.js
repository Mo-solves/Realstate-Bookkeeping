import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminTitle } from '../../../utils/tools';
import PaginateComponent from './paginate';

import { useDispatch, useSelector } from 'react-redux';
import {
  getPaginateCustomers,
  getAllCustomers,
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState('');

  useEffect(() => {
    dispatch(getPaginateCustomers({}));
  });

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
          <PaginateComponent customers={customers} />
        </>
      </div>
    </>
  );
};

export default AdminCustomers;
