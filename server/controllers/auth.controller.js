const { authService } = require('../services');
const httpStatus = require('http-status');

const authController = {
  async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await authService.createUser(email, password);
      const token = await authService.genAuthToken(user);

      res.cookie('x-access-token', token).status(httpStatus.CREATED).send({
        user,
        token,
      });
    } catch (err) {
      // console.log(err.message);
      // res.status(httpStatus.BAD_REQUEST).send(err.message);
      next(err);
    }
  },
  async signin(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await authService.signInWithEmailAndPassword(
        email,
        password
      );
      const token = await authService.genAuthToken(user);
      res.cookie('x-access-token', token).send({ user, token });
    } catch (err) {
      // res.status(httpStatus.BAD_REQUEST).send(err.message);
      next(err);
    }
  },

  async isauth(req, res, next) {
    res.json(req.user);
  },
};

module.exports = authController;
