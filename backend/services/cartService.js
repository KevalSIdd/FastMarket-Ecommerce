const knex = require("../database/db");
const { getLastOrderNumber } = require("../helper/prepareOrderNumber");

const add = async (requestData) => {
  try {
    let message = "";
    const existingCartItem = await knex("cart_item")
      .select("iProductId", "iQty")
      .where({
        iUserCartId: requestData.userId,
        iProductId: requestData.productId,
      })
      .first();

    if (existingCartItem) {
      if (requestData.qty !== 0) {
        await knex("cart_item")
          .update({ iQty: knex.raw(`?? + ${requestData.qty}`, ["iQty"]) })
          .where({
            iUserCartId: requestData.userId,
            iProductId: requestData.productId,
          });
      } else {
        message = "Product Remove From The Cart Succefully";
        await knex("cart_item").delete().where({
          iUserCartId: requestData.userId,
          iProductId: requestData.productId,
        });
      }
    } else {
      if (requestData.qty !== 0) {
        await knex("cart_item").insert({
          iUserCartId: requestData.userId,
          iProductId: requestData.productId,
          iQty: requestData.qty,
        });
      }
    }
    return { success: 1, message }; // Success
  } catch (error) {
    console.error("error=======>", error);
    return { success: 0 }; // Failure
  }
};

const update = async (requestData) => {
  try {
    const existingCartItem = await knex("cart_item")
      .select("iProductId", "iQty")
      .where({
        iUserCartId: requestData.userId,
        iProductId: requestData.productId,
      })
      .first();
    if (existingCartItem) {
      if (requestData.qty !== 0) {
        await knex("cart_item").update({ iQty: requestData.qty }).where({
          iUserCartId: requestData.userId,
          iProductId: requestData.productId,
        });
      } else {
        await knex("cart_item").delete().where({
          iUserCartId: requestData.userId,
          iProductId: requestData.productId,
        });
      }
    }
    return { success: 1 }; // Success
  } catch (error) {
    console.error("error=======>", error);
    return { success: 0 }; // Failure
  }
};

const checkout = async (requestData) => {
  try {
    let productsArray = requestData.productIds;
    let product;
    let productQty;

    try {
      await knex.transaction(async (trx) => {
        let subTotal = 0;
        let totalPrice = 0;
        const prepareOrderDetails = [];

        for (const [ind, id] of productsArray.entries()) {
          [product] = await knex("products")
            .select("*")
            .where({ id: id })
            .transacting(trx);
          [productQty] = await knex
            .select(["ci.iQty", "u.id"])
            .from("cart_item as ci")
            .innerJoin("users as u", "ci.iUserCartId", "u.id")
            .where("u.id", "=", requestData.userId)
            .andWhere("ci.iProductId", "=", id)
            .transacting(trx);

          // total price of one order for one product
          const productSubTotal = productQty.iQty * product.price;
          subTotal += productSubTotal;
          // other tax, discount, delivery charges, and other
          totalPrice += productSubTotal;
          // insert per order details
          let [insertOrderDetails] = await knex("orders_details")
            .insert({
              product_id: product.id,
              quantity: productQty.iQty,
              dPrice: product.price,
              dTotalAmount: productSubTotal,
              vName: product.title,
              tImage: product.image,
              tDescription: product.description,
              tShortDescription: product.short_desc,
              dSubTotal: productSubTotal,
            })
            .transacting(trx);
          prepareOrderDetails.push(insertOrderDetails);

          await knex("products")
            .where("id", id)
            .update({
              quantity: knex.raw(`?? - ${productQty.iQty}`, ["quantity"]),
            })
            .transacting(trx);

          await knex("cart_item")
            .delete()
            .where({ iProductId: id, iUserCartId: requestData.userId });
        }

        const lastOrderNumber = await getLastOrderNumber(); // Fetch last order number
        const ShippingAddress = await knex("addresses")
          .where({
            id: requestData.shippingAddressId,
          })
          .first();
        const BillingAddress = await knex("addresses")
          .where({
            id: requestData.BillingAddressId,
          })
          .first();
        let [insertOrder] = await knex("orders")
          .insert({
            user_id: productQty.id,
            iOrderNumber: lastOrderNumber,
            dSubTotal: subTotal,
            dNetPayable: totalPrice,
            BillingName: BillingAddress.vAddressName,
            BillingAddress1: BillingAddress.vAddressLine1,
            BillingAddress2: BillingAddress.vAddressLine2,
            BillingCity: BillingAddress.vCity,
            BillingState: BillingAddress.vState,
            BillingCountry: BillingAddress.vCountry,
            ShippingName: ShippingAddress.vAddressName,
            ShippingAddress1: ShippingAddress.vAddressLine1,
            ShippingAddress2: ShippingAddress.vAddressLine2,
            ShippingCity: ShippingAddress.vCity,
            ShippingState: ShippingAddress.vState,
            ShippingCountry: ShippingAddress.vCountry,
          })
          .transacting(trx);
        await knex("orders_details")
          .whereIn("id", prepareOrderDetails)
          .update({
            order_id: insertOrder,
          })
          .transacting(trx);

        await trx.commit();
      });
    } catch (error) {
      console.error("Transaction failed:", error);
    }

    return { success: 1 }; // Success
  } catch (error) {
    console.error("error=======>", error);
    return { success: 0 }; // Failure
  }
};

const list = async (userId, limit, page) => {
  try {
    let offset = (page - 1) * limit;
    let data = await knex
      .select("p.id", "p.title", "p.quantity", "p.image", "p.price", "ct.iQty")
      .from("cart_item as ct")
      .innerJoin("products as p", "ct.iProductId", "p.id")
      .where({ iUserCartId: userId })
      .limit(limit)
      .offset(offset);

    return { success: 1, data }; // Success
  } catch (error) {
    console.error("error=======>", error);
    return { success: 0 }; // Failure
  }
};
module.exports = { add, checkout, list, update };
