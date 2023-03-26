const express = require("express");
const router = express.Router();
const customersController = require("../controllers/customers.controller");

const auth = require("../middlewares/auth");
const { addCustomerValidator } = require("../middlewares/validation");

router.post(
  "/",
  auth("createAny", "customers"),
  addCustomerValidator,
  customersController.createCustomer
);

router.get(
  "/",
  auth("readAny", "customers"),
  customersController.getAllCustomers
);

router
  .route("/customer/:id")
  .get(auth("readAny", "customers"), customersController.getCustomerById)
  .patch(auth("updateAny", "customers"), customersController.updateCustomerById)
  .delete(
    auth("deleteAny", "customers"),
    customersController.deleteCustomerById
  );

router
  .route("/customer/:id/history/:phoneNumber")
  .get(auth("readAny", "customers"), customersController.getCustomerHistory);

router
  .route("/more-history/:phoneNumber")
  .get(
    auth("readAny", "customers"),
    customersController.getSpecifiedNumberOfCustomers
  )
  .post(
    auth("readAny", "customers"),
    customersController.getMoreCustomerHistory
  );

router.post(
  "/admin/paginate",
  auth("readAny", "customers"),
  customersController.adminPaginate
);

// router.post(
//   '/customer/:id/history/:phoneNumber/admin/paginate',
//   auth('readAny', 'customers'),
//   customersController.adminPaginateHistory
// );
module.exports = router;
