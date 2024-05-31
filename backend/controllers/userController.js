const { updateUser } = require("../services/userService");
const validation = require("../validation/addressValidation");
const addressServices = require("../services/addressService");

const update_user = async (req, res, next) => {
  const { userId } = req.params;
  const { fullName, email, password } = req.body;

  updateUser({ userId, fullName, email, password })
    .then((result) => {
      const { statusCode = 200, message, data } = result;
      res.status(statusCode).send({ message, data });
    })
    .catch((err) => {
      const { statusCode = 400, message, data } = err;
      res.status(statusCode).send({ message, data }) && next(err);
    });
};

const addressAdd = async (req, res, next) => {
  const response = {
    success: 0,
    message: "Something went wrong",
    statusCode: 400,
    data: {},
  };
  try {
    const requestData = req.body;
    const validate = await validation.add.validateAsync(requestData);
    const insertData = await addressServices.add(requestData);
    if (insertData && insertData.success) {
      response.message = "Address added successfully.";
      response.statusCode = 200;
      response.success = 1;
      res.send(response);
    } else {
      res.send(response);
    }
  } catch (error) {
    console.log(error);
    response.message = error.message;
    res.send(response);
  }
};

const addressUpdate = async (req, res, next) => {
  const response = {
    success: 0,
    message: "Something went wrong",
    statusCode: 400,
    data: {},
  };
  try {
    const requestData = req.body;
    const validate = await validation.update.validateAsync(requestData);
    const insertData = await addressServices.update(requestData);
    if (insertData && insertData.success) {
      response.message = "Address updated successfully.";
      response.statusCode = 200;
      response.success = 1;
      res.send(response);
    } else {
      res.send(response);
    }
  } catch (error) {
    console.log(error);
    response.message = error.message;
    res.send(response);
  }
};

const addressDetails = async (req, res, next) => {
  const response = {
    success: 0,
    message: "Something went wrong",
    statusCode: 400,
    data: {},
  };
  try {
    const requestData = req.query;
    const validate = await validation.details.validateAsync(requestData);
    const selectData = await addressServices.details(requestData);
    if (selectData && selectData.success) {
      response.message = "Address details found successfully.";
      response.data = selectData.data;
      response.statusCode = 200;
      response.success = 1;
      res.send(response);
    } else {
      response.message = "Address details not found.";
      res.send(response);
    }
  } catch (error) {
    console.log(error);
    response.message = error.message;
    res.send(response);
  }
};

const addressList = async (req, res, next) => {
  const response = {
    success: 0,
    message: "Something went wrong",
    statusCode: 400,
    data: [],
  };
  try {
    const page = req.query.currentPage || 1;
    const limit = req.query.pageSize || 5;
    const userId = req.query.userId;

    const listData = await addressServices.list(page, limit, userId);
    if (listData && listData.data.length > 0) {
      response.message = "Address list found successfully.";
      response.totalCount = listData.count;
      response.data = listData.data;
      response.statusCode = 200;
      response.success = 1;
      res.send(response);
    } else {
      response.message = "Addresses not found.";
      res.send(response);
    }
  } catch (error) {
    console.log(error);
    response.message = error.message;
    res.send(response);
  }
};

const addressDelete = async (req, res, next) => {
  const response = {
    success: 0,
    message: "Something went wrong",
    statusCode: 400,
    data: {},
  };
  try {
    const requestData = req.query;
    console.log(requestData);
    const validate = await validation.addressDelete.validateAsync(requestData);
    const insertData = await addressServices.addressDelete(requestData);
    if (insertData && insertData.success) {
      response.message = "Address deleted successfully.";
      res.send(response);
    } else {
      res.send(response);
    }
  } catch (error) {
    console.log(error);
    response.message = error.message;
    res.send(response);
  }
};

module.exports = {
  update_user,
  addressAdd,
  addressUpdate,
  addressDetails,
  addressList,
  addressDelete,
};
