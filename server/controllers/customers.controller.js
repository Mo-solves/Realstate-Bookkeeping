const httpStatus = require('http-status');

const { customersService } = require('../services');

const customersController = {
  async createCustomer(req, res, next) {
    try {
      const customer = await customersService.addCustomer(req.body);
      res.json(customer);
    } catch (err) {
      next(err);
    }
  },
  async getCustomerById(req, res, next) {
    try {
      const _id = req.params.id;
      const customer = await customersService.findCustomerById(_id);
      console.log(customer.startingDate);
      res.json(customer);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = customersController;
