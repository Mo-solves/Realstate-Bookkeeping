import { Table, Pagination } from "react-bootstrap";
import { Loader } from "../../../utils/tools";
import Moment from "react-moment";

const PaginateComponent = ({
  customers,
  goToPrevpage,
  goToNextpage,
  goToEdit,
  handleShow,
}) => {
  return (
    <>
      {customers && customers.docs ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <td>Date</td>
                <td>Full Name</td>
                <td>Balance</td>
              </tr>
            </thead>
            <tbody>
              {customers.docs.map((customer) => (
                <tr key={customer._id}>
                  <td>
                    <Moment to={customer.createdDate}></Moment>
                  </td>
                  <td>{`${customer.firstname} ${customer.lastname}`}</td>
                  <td>{customer.balance}</td>

                  <td
                    className="action_btn remove_btn"
                    onClick={() => handleShow(customer._id)}
                  >
                    Remove
                  </td>

                  <td
                    className="action_btn edit_btn"
                    onClick={() => goToEdit(customer._id)}
                  >
                    Edit
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
            {customers.hasPrevPage ? (
              <>
                <Pagination.Prev
                  onClick={() => goToPrevpage(customers.prevPage)}
                />
                <Pagination.Item
                  onClick={() => goToPrevpage(customers.prevPage)}
                >
                  {customers.prevPage}
                </Pagination.Item>
              </>
            ) : null}
            <Pagination.Item active>{customers.page}</Pagination.Item>
            {customers.hasNextPage ? (
              <>
                <Pagination.Item
                  onClick={() => goToNextpage(customers.nextPage)}
                >
                  {customers.nextPage}
                </Pagination.Item>
                <Pagination.Next
                  onClick={() => goToNextpage(customers.nextPage)}
                />
              </>
            ) : null}
          </Pagination>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default PaginateComponent;
