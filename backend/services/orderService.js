const knex = require("../database/db");
const randomstring = require("randomstring");

exports.createOrder = async (params) => {
  const { userId, cart } = params;
  if (!cart) throw { message: "cart was not provided", statusCode: 400 };
  if (!userId) throw { message: "userId was not provided", statusCode: 400 };
  const randomString = randomstring.generate();

  try {
    const productTotalPrice = cart.products.reduce(
      (aucc, val) => aucc + val.price * val.quantity,
      0
    );
    const [newOrderId] = await knex("orders").insert({
      user_id: userId,
      iOrderNumber: randomString,
      iSubTotal: productTotalPrice,
      dNetPayable: productTotalPrice,
      vShippingAddress:
        cart && cart.shippingAddress ? cart.shippingAddress : null,
    });

    await Promise.all(
      cart.products.map(async (prod) => {
        const product = await knex("products")
          .select("*")
          .where({ id: prod.id })
          .first();

        await knex("orders_details").insert({
          order_id: newOrderId,
          product_id: prod.id,
          quantity: prod.quantity,
          iProductPrice: prod.price,
          iTotalAmount: Number(prod.price) * Number(prod.quantity),
          vName: prod.title,
          tImage: prod.image,
          tDescription: product.description,
          iSubTotal: Number(prod.price) * Number(prod.quantity),
          iPrice: product.price,
          tShortDescription: product.short_desc,
        });

        await knex.raw(
          `UPDATE products SET quantity=quantity-${prod.quantity} where id=${prod.id}`
        );
      })
    );

    return {
      message: `Order was successfully placed with order id ${newOrderId}`,
      orderId: newOrderId,
      products: cart.products,
      statusCode: 201,
    };
  } catch (error) {
    console.log("error----->", error);
    throw {
      message: "New order failed while adding order details",
      statusCode: 500,
      data: error,
    };
  }
};

exports.getSingleOrder = async (params) => {
  const { orderId, userId } = params;

  if (!orderId) throw { message: "orderId was not provided", statusCode: 400 };
  if (!userId) throw { message: "userId was not provided", statusCode: 400 };

  try {
    const result = await knex("orders")
      .select("*")
      .innerJoin("orders_details", "orders.id", "=", "orders_details.order_id")
      .where({ "orders.id": orderId, "orders.user_id": userId });

    if (result.length === 0) {
      throw { message: "order was not found", statusCode: 400 };
    }

    return { statusCode: 200, message: `Order was found`, data: result };
  } catch (error) {
    throw { message: error, statusCode: 500 };
  }
};

exports.getOrders = async (params) => {
  const { userId } = params;

  if (!userId) throw { message: "userId was not provided", statusCode: 400 };

  try {
    const result = await knex("orders")
      .select("*")
      .innerJoin("orders_details", "orders.id", "=", "orders_details.order_id")
      .where({ user_id: userId })
      .orderBy("orders.id", "desc");

    console.log(result);
    if (result.length === 0) {
      return {
        statusCode: 400,
        message: `data not found`,
        data: {},
      };
    }

    return {
      statusCode: 200,
      message: `${result.length} orders were found`,
      data: result,
    };
  } catch (error) {
    throw { message: error, statusCode: 500 };
  }
};

exports.getOrderDetails = async (orderNumber) => {
  try {
    const resp = {
      products: [],
      shippingAddress: {},
      billingAddress: {},
    };
    const data = await knex("orders as o")
      .select("od.*")
      .innerJoin("orders_details as od", "o.id", "od.order_id")
      .where("o.iOrderNumber", orderNumber);

    const ShippingAddress = await knex("orders")
      .select(
        "ShippingName",
        "ShippingAddress1",
        "ShippingAddress2",
        "ShippingCity",
        "ShippingState",
        "ShippingCountry"
      )
      .where({ iOrderNumber: orderNumber })
      .first();

    const BillingAddress = await knex("orders")
      .select(
        "BillingName",
        "BillingAddress1",
        "BillingAddress2",
        "BillingCity",
        "BillingState",
        "BillingCountry"
      )
      .where({ iOrderNumber: orderNumber })
      .first();

    const paymentStatus = await knex("orders as o")
      .select("ePayoutStatus as payoutStatus", "dtOrderDate as orderDate")
      .where("o.iOrderNumber", orderNumber)
      .first();

    resp.products = data;
    resp.shippingAddress = ShippingAddress;
    resp.billingAddress = BillingAddress;
    resp.paymentStatus = paymentStatus;
    console.log(resp);
    return { success: 1, resp };
  } catch (error) {
    console.error("error=======>", error);
    return { success: 0 };
  }
};

exports.getOrderList = async (page, limit, userId) => {
  try {
    const offset = (page - 1) * limit;
    let findUser = await knex("users")
      .select("id")
      .where({ id: userId })
      .first();
    const data = await knex("orders")
      .select("*")
      .where({ user_id: findUser.id })
      .limit(limit)
      .offset(offset);
    const countResult = await knex("orders")
      .where({ user_id: findUser.id })
      .count("id as count");
    console.log(countResult, "cou");
    return { success: 1, data, countResult };
  } catch (error) {
    console.error("error=======>", error);
    return { success: 0 };
  }
};
