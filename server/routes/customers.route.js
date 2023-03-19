const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customers.controller');

const auth = require('../middlewares/auth');
const { addCustomerValidator } = require('../middlewares/validation');

router.post(
  '/',
  auth('createAny', 'customers'),
  addCustomerValidator,
  customersController.createCustomer
);

router.get(
  '/',
  auth('readAny', 'customers'),
  customersController.getAllCustomers
);

router
  .route('/customer/:id')
  .get(auth('readAny', 'customers'), customersController.getCustomerById)
  .patch(auth('updateAny', 'customers'), customersController.updateCustomerById)
  .delete(
    auth('deleteAny', 'customers'),
    customersController.deleteCustomerById
  );

router
  .route('/customer/:id/history/:phoneNumber')
  .get(auth('readAny', 'customers'), customersController.getCustomerHistory);

module.exports = router;
