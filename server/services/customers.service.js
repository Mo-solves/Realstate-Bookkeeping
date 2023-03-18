const httpStatus = require('http-status');
const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const { Customer, customerSchema } = require('../models/customer');
const { ApiError } = require('../middlewares/apiError');

const addCustomer = async body => {
  try {
    const customer = new Customer({
      ...body,
      rentDue: parseFloat(body.rentDue),
      rentPaid: parseFloat(body.rentPaid),
    });
    await customer.save();
    return customer;
  } catch (err) {
    throw err;
  }
};

const findCustomerById = async _id => {
  const customer = await Customer.findById(_id);
  if (!customer) throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found');

  console.log(customer.remainingDays);
  customer.updateCustomerBasedOnRemainingDays(customer);

  return customer;
};

module.exports = {
  addCustomer,
  findCustomerById,
};
