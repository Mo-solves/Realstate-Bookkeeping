const { check, validationResult } = require('express-validator');
const httpStatus = require('http-status');

const addCustomerValidator = [
  check('firstname')
    .trim()
    .not()
    .isEmpty()
    .withMessage('You need to add a firstname')
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage('Minimum 3 required')
    .bail(),
  check('lastname')
    .trim()
    .not()
    .isEmpty()
    .withMessage('You need to add a lastname')
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage('Minimum 3 required')
    .bail(),
  check('phoneNumber')
    .trim()
    .not()
    .isEmpty()
    .withMessage('You need to add a phone number')
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage('Minimum 3 required')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatus.BAD_REQUEST).json({
        errors: errors.array(),
      });
    }
    next();
  },
];

module.exports = {
  addCustomerValidator,
};
