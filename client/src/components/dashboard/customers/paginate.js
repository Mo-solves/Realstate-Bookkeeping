// import { Table, Pagination } from 'react-bootstrap';
// import { Loader } from '../../../utils/tools';
// import Moment from 'react-moment';

// const PaginateComponent = ({
//   customers,
//   goToPrevPage,
//   goToNextPage,
//   goToEdit,
//   handleShow,
// }) => {
//   console.log(customers);
//   return (
//     <>
//       {customers && customers.docs ? (
//         <>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <td>Created</td>
//                 <td>Full Name</td>
//                 <td>Balance</td>
//               </tr>
//             </thead>
//             <tbody>
//               {customers.docs.map(customer => (
//                 <tr key={customer._id}>
//                   <td>
//                     <Moment to={customer.createdDate}></Moment>
//                   </td>
//                   <td>{`${customer.firstname} ${customer.lastname}`}</td>
//                   <td>{customer.balance}</td>
//                   <td
//                     className="action_btn remove_btn"
//                     onClick={() => handleShow(customer._id)}
//                   >
//                     Remove
//                   </td>
//                   <td
//                     className="action_btn edit_btn"
//                     onClick={() => goToEdit(customer._id)}
//                   >
//                     Edit
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//           <Pagination>
//             {customers.hasPrevPage ? (
//               <>
//                 <Pagination.Prev
//                   onClick={() => goToPrevPage(customers.prevPage)}
//                 />
//                 <Pagination.Item
//                   onClick={() => goToPrevPage(customers.prevPage)}
//                 >
//                   {customers.prevPage}
//                 </Pagination.Item>
//               </>
//             ) : null}
//             <Pagination.Item active>{customers.page}</Pagination.Item>
//             {customers.hasNextPage ? (
//               <>
//                 <Pagination.Item
//                   onClick={() => goToNextPage(customers.nextPage)}
//                 >
//                   {customers.nextPage}
//                 </Pagination.Item>
//                 <Pagination.Next
//                   onClick={() => goToNextPage(customers.nextPage)}
//                 />
//               </>
//             ) : null}
//           </Pagination>
//         </>
//       ) : (
//         <Loader />
//       )}
//     </>
//   );
// };

// export default PaginateComponent;
