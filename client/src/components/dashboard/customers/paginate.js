import { Table, Pagination } from 'react-bootstrap';
import { Loader } from '../../../utils/tools';
import Moment from 'react-moment';

const PaginateComponent = ({ customers }) => {
  return <>{customers && customers.docs ? <>customers</> : <Loader />}</>;
};

export default PaginateComponent;
