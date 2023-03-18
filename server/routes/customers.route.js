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

router
  .route('/customer/:id')
  .get(auth('readAny', 'customers'), customersController.getCustomerById);

module.exports = router;
