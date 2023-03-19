const httpStatus = require('http-status');
const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const { Customer, History } = require('../models/customer');
const { ApiError } = require('../middlewares/apiError');

const addDaysToDueDate = days => {
  let date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

const calculateRemainingDays = dueDate => {
  let differenceInTIme = dueDate.getTime() - new Date().getTime();
  let differenceInDays = differenceInTIme / (1000 * 3600 * 24);
  return Math.trunc(differenceInDays);
};

const createCustomerHistory = async customer => {
  try {
    let history = new History({
      fullname: `${customer.firstname} ${customer.lastname}`,
      startingDate: customer.startingDate,
      dueDate: customer.dueDate,
      rentDue: customer.rentDue,
      rentPaid: customer.rentPaid,
      balance: customer.balance,
      phoneNumber: customer.phoneNumber,
      customer: customer._id,
    });
    history.save();
    customer.history = history;
    return history;
  } catch (err) {
    throw err;
  }
};

const updateCustomerBasedOnRemainingDays = customer => {
  let differenceInTime = 0;
  let remainingDays = 0;
  customer.remainingDays = calculateRemainingDays(customer.dueDate);
  if (customer.remainingDays < 1) {
    createCustomerHistory(customer);
    customer.startingDate = new Date();
    customer.dueDate = addDaysToDueDate(30);
    customer.balance += customer.rentDue;
    customer.rentPaid = 0;
    differenceInTime = customer.dueDate.getTime() - new Date().getTime();
    remainingDays = Math.trunc(differenceInTime / (1000 * 3600 * 24));
    customer.remainingDays = remainingDays;
  }
  customer.remainingDays = remainingDays;
  return customer;
};

const addCustomer = async body => {
  let balance = parseInt(body.rentDue) - parseInt(body.rentPaid);
  let dueDate = addDaysToDueDate(30);
  let remainingDays = calculateRemainingDays(dueDate);
  try {
    const customer = new Customer({
      ...body,
      dueDate: dueDate,
      balance: balance,
      remainingDays: remainingDays,
    });
    await customer.save();
    return customer;
  } catch (err) {
    throw err;
  }
};

const findAllCustomers = async () => {
  return await Customer.find({});
};

const findCustomerById = async _id => {
  try {
    const customer = await Customer.findById(_id);
    if (!customer)
      throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found');

    updateCustomerBasedOnRemainingDays(customer);

    await customer.save();
    return customer;
  } catch (err) {
    throw err;
  }
};

const findCustomerHistoryByPhoneNumber = async phoneNumber => {
  try {
    const history = await History.find({ phoneNumber });
    if (!history) throw new ApiError(httpStatus.NOT_FOUND, 'History not found');
    return history;
  } catch (err) {
    throw err;
  }
};

const findCustomerByIdAndUpdate = async (_id, body) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { _id },
      {
        $set: {
          ...body,
        },
      },
      { new: true }
    );

    if (!customer)
      throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found');

    customer.balance = customer.rentDue - customer.rentPaid;

    return customer;
  } catch (err) {
    throw err;
  }
};

const findCustomerByIdAndDelete = async _id => {
  try {
    const customer = await Customer.findByIdAndRemove(_id);
    if (!customer)
      throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found');

    return customer;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addCustomer,
  findCustomerById,
  findCustomerHistoryByPhoneNumber,
  findAllCustomers,
  findCustomerByIdAndUpdate,
  findCustomerByIdAndDelete,
};
