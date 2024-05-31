const {
  getOrders,
  getSingleOrder,
  createOrder,
  getOrderDetails,
  getOrderList,
} = require("../services/orderService");

exports.create_order = async (req, res, next) => {
  const { userId, cart } = req.body;
  console.log("cart=============>1", userId);

  createOrder({ userId, cart })
    .then((result) => {
      res.status(result.statusCode).send({ ...result });
    })
    .catch((err) => {
      const { statusCode = 400, message } = err;
      res.status(statusCode).send({ message }) && next(err);
    });
};

exports.get_single_order = async (req, res, next) => {
  const { orderId, userId } = req.query;
  console.log("cart=============>2", userId);

  getSingleOrder({ orderId, userId })
    .then((result) => {
      const { message, data } = result;
      res.status(200).send({ message, data });
    })
    .catch((err) => {
      const { statusCode = 400, message } = err;
      res.status(statusCode).send({ message }) && next(err);
    });
};

exports.get_orders = async (req, res, next) => {
  const { userId } = req.query;
  console.log("cart=============>3", userId);

  getOrders({ userId })
    .then((result) => {
      const { message, data } = result;
      res.status(200).send({ message, data });
    })
    .catch((err) => {
      const { statusCode = 400, message } = err;
      res.status(statusCode).send({ message }) && next(err);
    });
};

exports.createCart = async (req, res, next) => {
  const { userId } = req.query;
  console.log("cart=============>3", userId);

  getOrders({ userId })
    .then((result) => {
      const { data } = result;
      res.status(200).send({ message, data });
    })
    .catch((err) => {
      const { statusCode = 400, message } = err;
      res.status(statusCode).send({ message }) && next(err);
    });
};

exports.orderDetails = async (req, res, next) => {
  const response = {
    success: 0,
    message: "Something went wrong",
    statusCode: 400,
    data: {},
  };
  try {
    const { orderNumber } = req.query;
    if (orderNumber && orderNumber.length > 0) {
      const selectData = await getOrderDetails(orderNumber);
      if (selectData && selectData.success) {
        response.message = "order details found successfully.";
        response.data = selectData.resp;
        response.statusCode = 200;
        response.success = 1;
        res.send(response);
      } else {
        response.message = "order details not found.";
        res.send(response);
      }
    } else {
      response.message = "orderNumber is required.";
      res.send(response);
    }
  } catch (error) {
    console.log(error);
    response.message = error.message;
    res.send(response);
  }
};

exports.orderList = async (req, res, next) => {
  const response = {
    success: 0,
    message: "Something went wrong",
    statusCode: 400,
    data: [],
  };
  try {
    const page = req.query.currentPage || 1;
    const limit = req.query.pageSize || 5;
    const userId = req.query?.userId;

    if (userId) {
      const listData = await getOrderList(page, limit, userId);
      console.log(listData, "list");
      if (listData && listData.data?.length > 0) {
        response.message = "order list found successfully.";
        response.data = listData.data;
        response.totalRecords = listData?.countResult[0]?.count;
        response.count = listData?.data?.length;
        response.statusCode = 200;
        response.success = 1;
        res.send(response);
      } else {
        response.message = "order not found.";
        res.send(response);
      }
    } else {
      response.message = "userId is required.";
      res.send(response);
    }
  } catch (error) {
    console.log(error);
    response.message = error.message;
    res.send(response);
  }
};
