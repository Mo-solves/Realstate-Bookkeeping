const httpStatus = require("http-status");

const { customersService } = require("../services");

const customersController = {
  async createCustomer(req, res, next) {
    try {
      const customer = await customersService.addCustomer(req.body);
      res.json(customer);
    } catch (err) {
      next(err);
    }
  },
  async getAllCustomers(req, res, next) {
    try {
      const customers = await customersService.findAllCustomers();
      res.json(customers);
    } catch (err) {
      next(err);
    }
  },
  async getCustomerById(req, res, next) {
    try {
      const _id = req.params.id;
      const customer = await customersService.findCustomerById(_id);
      res.json(customer);
    } catch (err) {
      next(err);
    }
  },
  async getCustomerHistory(req, res, next) {
    try {
      const _id = req.params.id;
      const customer = await customersService.findCustomerById(_id);
      const customerHistory =
        await customersService.findCustomerHistoryByPhoneNumber(
          customer.phoneNumber
        );
      res.json(customerHistory);
    } catch (err) {
      next(err);
    }
  },

  async updateCustomerById(req, res, next) {
    try {
      const _id = req.params.id;
      const customer = await customersService.findCustomerByIdAndUpdate(
        _id,
        req.body
      );
      await customer.save();
      res.json(customer);
    } catch (err) {
      next(err);
    }
  },

  async deleteCustomerById(req, res, next) {
    try {
      const _id = req.params.id;
      const customer = await customersService.findCustomerByIdAndDelete(_id);
      res.status(httpStatus.OK).json({ action: "deleted" });
    } catch (err) {
      next(err);
    }
  },

  async getSpecifiedNumberOfCustomers(req, res, next) {
    try {
      const customers = await customersService.allCustomers(req);
      res.json(customers);
    } catch (err) {
      next();
    }
  },
  async getMoreCustomerHistory(req, res, next) {
    try {
      const history = await customersService.moreHistory(req);
      res.json(history);
    } catch (err) {
      next(err);
    }
  },
  async adminPaginate(req, res, next) {
    try {
      const customers = await customersService.paginateAdminCustomers(req);
      res.json(customers);
    } catch (err) {
      next(err);
    }
  },

  // async adminPaginateHistory(req, res, next) {
  //   try {
  //     const history = await customersService.paginateAdminCustomersHistory(req);

  //     res.json(history);
  //   } catch (err) {
  //     next(err);
  //   }
  // },
};

module.exports = customersController;
