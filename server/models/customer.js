const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
require('dotenv').config();

let SchemaTypes = mongoose.Schema.Types;

const customerSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    maxLength: 100,
  },
  lastname: {
    type: String,
    required: true,
    maxLength: 100,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    maxLength: 50,
  },
  rentDue: {
    type: SchemaTypes.Double,
    required: true,
  },
  rentPaid: {
    type: SchemaTypes.Double,
    default: 0,
  },
  startingDate: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    default: Date.now,
  },
  balance: {
    type: SchemaTypes.Double,
    default: 0,
  },
  remainingDays: {
    type: Number,
    default: 0,
  },
  history: {
    type: SchemaTypes.ObjectId,
    fullname: String,
    dueDate: Date,
    rentDue: SchemaTypes.Double,
    rentPaid: SchemaTypes.Double,
    balance: SchemaTypes.Double,
    default: {},
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

customerSchema.methods.calculateRemainingDays = function (customer) {
  // let startingDate = Date.now();

  // let dueDate = new Date();
  let differenceInTIme =
    customer.dueDate.getTime() - customer.startingDate.getTime();
  let differenceInDays = differenceInTIme / (1000 * 3600 * 24);
  return Math.trunc(differenceInDays);
};

customerSchema.methods.addDaysToDate = function (date, days) {
  date.setDate(date.getDate() + days);
  return date;
};

customerSchema.pre('save', async function (next) {
  let customer = this;
  let balance = customer.rentDue - customer.rentPaid;
  customer.dueDate = customer.addDaysToDate(customer.dueDate, 30);
  customer.balance = balance;
  customer.remainingDays = customer.calculateRemainingDays(customer);
});

customerSchema.methods.updateCustomerBasedOnRemainingDays = function (
  customer
) {
  let differenceInTime = 0;
  let remainingDays = 0;
  customer.remainingDays = customer.calculateRemainingDays(customer);
  console.log(customer.remainingDays);
  if (customer.remainingDays < 1) {
    customer.history = {
      fullname: `${customer.firstname} ${customer.lastname}`,
      dueDate: customer.dueDate,
      rentDue: customer.rentDue,
      rentPaid: customer.rentPaid,
      balance: customer.balance,
    };
    customer.startingDate = new Date();
    customer.dueDate = customer.addDaysToDate(customer.dueDate, 30);
    customer.balance += customer.rentDue;
    customer.rentPaid = 0;
    differenceInTime = customer.dueDate.getTime() - new Date().getTime();
    remainingDays = Math.trunc(differenceInTime / (1000 * 3600 * 24));
    customer.remainingDays = remainingDays;
  }
  customer.remainingDays = remainingDays;
  return customer;
};

const Customer = mongoose.model('Customer', customerSchema);

module.exports = { Customer, customerSchema };
