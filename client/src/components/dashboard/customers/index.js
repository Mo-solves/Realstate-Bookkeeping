import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminTitle } from "../../../utils/tools";
import PaginateComponent from "./paginate";

import { useSelector, useDispatch } from "react-redux";
import {
  getPaginateCustomers,
  removeCustomer,
} from "../../../store/actions/customers";
import {
  Modal,
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

  const [removeAlert, setRemoveAlert] = useState(false);
  const [toRemove, setToRemove] = useState(null);

  const handleClose = () => setRemoveAlert(false);
  const handleShow = (id = null) => {
    setToRemove(id);
    setRemoveAlert(true);
  };

  const handleDelete = () => {
    dispatch(removeCustomer(toRemove))
      .unwrap()
      .finally(() => {
        setRemoveAlert(false);
        setToRemove(null);
      });
  };

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
            handleShow={(id) => handleShow(id)}
          />
        </>

        <Modal show={removeAlert} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Are you really Sure??</Modal.Title>
          </Modal.Header>
          <Modal.Body>There is no going back</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Oops, close this
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
