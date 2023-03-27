import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminTitle } from "../../../utils/tools";
import PaginateComponent from "./paginate";

import { useSelector, useDispatch } from "react-redux";
import { getPaginateCustomers } from "../../../store/actions/customers";
import {
  Button,
  ButtonToolbar,
  ButtonGroup,
  InputGroup,
  FormControl,
} from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

const AdminCustomers = () => {
  const customers = useSelector((state) => state.customers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //// START PAGINATION COMMANDS
  const goToPrevpage = (page) => {
    dispatch(getPaginateCustomers({ page }));
  };
  const goToNextpage = (page) => {
    dispatch(getPaginateCustomers({ page }));
  };

  const goToEdit = (id) => {
    return navigate(`/dashboard/customers/edit/${id}`);
  };

  //// END PAGINATION COMMANDS

  useEffect(() => {
    dispatch(getPaginateCustomers({}));
  }, []);

  return (
    <>
      <AdminTitle title="Customers" />
      <div className="customers_table">
        <ButtonToolbar className="mb-3">
          <ButtonGroup className="me-2">
            <LinkContainer to="/dashboard/customers/add">
              <Button variant="secondary">Add Customers</Button>
            </LinkContainer>
          </ButtonGroup>
          <form>
            <InputGroup>
              <InputGroup.Text id="btngrp1">@</InputGroup.Text>
              <FormControl type="text" placeholder="Search"></FormControl>
            </InputGroup>
          </form>
        </ButtonToolbar>

        <>
          <PaginateComponent
            customers={customers.adminCustomers}
            goToPrevpage={(page) => goToPrevpage(page)}
            goToNextpage={(page) => goToNextpage(page)}
            goToEdit={(id) => goToEdit(id)}
          />
        </>
      </div>
    </>
  );
};

export default AdminCustomers;
