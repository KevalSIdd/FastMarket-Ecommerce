const validation = require("../validation/cartValidation");
const cartServices = require("../services/cartService");

const add = async (req, res) => {
  const response = {
    success: 0,
    message: "Something went wrong",
    statusCode: 400,
    data: {},
  };
  try {
    const requestData = req.body;
    const validate = await validation.add.validateAsync(requestData);
    const insertData = await cartServices.add(requestData);
    if (insertData && insertData.success) {
      response.message =
        insertData.message === ""
          ? "Item successfully added to your cart."
          : insertData.message;
      response.success = 1;
      response.statusCode = 200;
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

const update = async (req, res) => {
  const response = {
    success: 0,
    message: "Something went wrong",
    statusCode: 400,
    data: {},
  };
  try {
    const requestData = req.body;
    const validate = await validation.add.validateAsync(requestData);
    const insertData = await cartServices.update(requestData);
    if (insertData && insertData.success) {
      response.message = "Item successfully update to your cart.";

      response.success = 1;
      response.statusCode = 200;
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

const checkout = async (req, res) => {
  const response = {
    success: 0,
    message: "Something went wrong",
    statusCode: 400,
    data: {},
  };
  try {
    const requestData = req.body;
    const validate = await validation.checkout.validateAsync(requestData);
    const insertData = await cartServices.checkout(requestData);
    if (insertData && insertData.success) {
      response.message = "Order placed SuccessFully";
      response.success = 1;
      response.statusCode = 200;
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

const list = async (req, res) => {
  const response = {
    success: 0,
    message: "Something went wrong",
    statusCode: 400,
    data: {},
  };
  try {
    let { userId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 10;
    const validate = await validation.list.validateAsync({ userId });
    const listData = await cartServices.list(userId, limit, page);
    if (listData && listData.success) {
      response.message = "cart list found successfully.";
      response.success = 1;
      response.statusCode = 200;
      response.data = listData.data;
      res.send(response);
    } else {
      response.message = "Please select add product.";
      res.send(response);
    }
  } catch (error) {
    console.log(error);
    response.message = error.message;
    res.send(response);
  }
};
module.exports = { add, checkout, list, update };
