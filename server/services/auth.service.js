const httpStatus = require('http-status');
// MIDDLEWARES
const { ApiError } = require('../middlewares/apiError');

// Models
const { User } = require('../models/user');

// Services
const userService = require('./user.service');
const createUser = async (email, password) => {
  try {
    // check if the email doesn't exists
    if (await User.emailTaken(email)) {
      // throw new Error('Sorry email taken');
      throw new ApiError(httpStatus.BAD_REQUEST, 'Sorry email taken');
    }
    // add user to db (hash password)
    const user = new User({
      email,
      password,
    });
    await user.save();
    return user;
  } catch (err) {
    throw err;
  }
};

const genAuthToken = user => {
  const token = user.generateAuthToken();
  return token;
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    const user = await userService.findUserByEmail(email);
    if (!user) {
      // throw new Error('Sorry BAD email');
      throw new ApiError(httpStatus.BAD_REQUEST, 'Sorry BAD email');
    }

    if (!(await user.comparePassword(password))) {
      // throw new Error('Sorry BAD password');
      throw new ApiError(httpStatus.BAD_REQUEST, 'Sorry BAD password');
    }

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createUser,
  genAuthToken,
  signInWithEmailAndPassword,
};
