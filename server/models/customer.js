const mongoose = require('mongoose');
require('dotenv').config();

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
    type: mongoose.Types.Decimal128,
    required: true,
  },
  rentPaid: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  startingData: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: true,
  },
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = { Customer };
