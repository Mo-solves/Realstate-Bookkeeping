const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
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
    type: Number,
    required: true,
  },
  rentPaid: {
    type: Number,
    default: 0,
  },
  location: {
    type: String,
    required: true,
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
    type: Number,
    default: 0,
  },
  previousBalance: {
    type: Number,
    default: 0,
  },
  remainingDays: {
    type: Number,
    default: 0,
  },
  history: {
    type: SchemaTypes.ObjectId,
    ref: 'history',
    default: null,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const historySchema = mongoose.Schema({
  fullname: String,
  startingDate: Date,
  dueDate: Date,
  rentDue: Number,
  rentPaid: Number,
  balance: Number,
  phoneNumber: String,
});

customerSchema.plugin(aggregatePaginate);
historySchema.plugin(aggregatePaginate);

const Customer = mongoose.model('Customer', customerSchema);
const History = mongoose.model('History', historySchema);
module.exports = { Customer, History };
