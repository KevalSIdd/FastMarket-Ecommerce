const {
  registerUser,
  loginUser,
  forgotPassword,
  updatePassword,
} = require('../services/authService');
const { sendMailForgotPassword } = require('../helper/sendMail');
const md5 = require('md5');

exports.login_user = async (req, res, next) => {
  const { email, password } = req.body;

  loginUser({ email, password })
    .then((result) => {
      console.log(result);
      const { statusCode = 200, message, data, token } = result;
      res.status(statusCode).send({ success: 1, message, data, token });
    })
    .catch((err) => {
      const { statusCode = 400, message, data } = err;
      res.status(statusCode).send({ success: 0, message, data }) && next(err);
    });
};

exports.register_user = async (req, res, next) => {
  const { fullName, email, password } = req.body;

  registerUser({ fullName, email, password })
    .then((result) => {
      const { statusCode = 200, message, data, token } = result;
      res.status(statusCode).send({ message, data, token });
    })
    .catch((err) => {
      const { statusCode = 400, message, data } = err;
      res.status(statusCode).send({ message, data }) && next(err);
    });
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(200).send({
        success: 0,
        message: 'Please enter email.',
        statusCode: 400,
        data: {},
      });
    }

    const checkEmail = await forgotPassword(email);
    if (checkEmail != undefined) {
      //send email to user for forget password option
      const sendMail = await sendMailForgotPassword(checkEmail.email);
    }
    res.status(200).send({
      success: checkEmail ? 1 : 0,
      message: checkEmail
        ? 'Forgot password link send on email.'
        : 'Email does not exist.',
      statusCode: checkEmail ? 200 : 402,
      data: checkEmail ? checkEmail : {},
    });
  } catch (error) {
    throw error;
  }
};

exports.createPassword = async (req, res, next) => {
  try {
    const response = {
      success: 0,
      message: 'Password not updated.',
      statusCode: 400,
      data: {},
    };

    const { newPassword, email } = req.body;
    password = newPassword;
    let passwordUpdate;
    if (password && email) {
      password = md5(password.toString());
      console.log('----------------->', email, password);
      passwordUpdate = await updatePassword(password, email);
    }
    if (passwordUpdate) {
      response.success = 1;
      response.message = 'Password reset successfully.';
      res.status(200).send({ response });
    } else {
      res.status(200).send({ response });
    }
  } catch (error) {
    const response = {
      success: 0,
      message: error.message,
      statusCode: 500,
      data: {},
    };
    res.status(500).send({ response });
    throw error;
  }
};
