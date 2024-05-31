const express = require("express");
const router = express.Router();
const knex = require("../database/db");
const Joi = require("joi");

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;

    const startValue = page > 0 ? (page - 1) * limit : 0;

    const products = await knex("products as p")
      .select(
        "p.id",
        "p.title",
        "p.image",
        "p.price",
        "p.short_desc",
        "p.quantity",
        "c.title as category"
      )
      .leftJoin("categories as c", "c.id", "=", "p.cat_id")
      .limit(limit)
      .orderBy("p.id")
      .offset(startValue);

    const topProducts = await knex
      .select("p.*", knex.raw("sum(od.quantity) as mostSell"))
      .from("products as p")
      .leftJoin("orders_details as od", "p.id", "od.product_id")
      .groupBy("p.id")
      .orderBy("mostSell", "desc")
      .orderBy("p.dRating", "desc")
      .limit(3);

    res.json({
      success: 1,
      message: "Product listing.",
      data: {
        topProducts: topProducts,
        productList: products,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET SINGLE PRODUCT BY ID
router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId } = req.query;
    const product = await knex("products as p")
      .select(
        "p.id",
        "p.title",
        "p.image",
        "p.images",
        "p.description",
        "p.price",
        "p.quantity",
        "p.short_desc",
        "c.title as category",
        "p.dRating",
        "p.avgRating"
      )
      .join("categories as c", "c.id", "=", "p.cat_id")
      .where("p.id", productId)
      .first();
    let isRated = true;
    console.log(userId);
    if (userId) {
      const orderDetails = await knex("orders")
        .join("orders_details", "orders.id", "=", "orders_details.order_id")
        .where("orders.user_id", Number(userId))
        .andWhere("orders_details.product_id", productId)
        .select("orders_details.isRated")
        .first();
      isRated = orderDetails ? orderDetails.isRated === 1 : true;
    }
    product.isRated = isRated;

    if (!product) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.json(product);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//product reviews
router.get("/create-review", async (req, res) => {
  try {
    const { productId, rating, desrciption, userID } = req.params;

    // Define Joi schema for validation
    const schema = Joi.object({
      productId: Joi.string().required(),
      rating: Joi.number().min(1).max(5).required(),
      description: Joi.string().required(),
      userID: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.params);

    if (error) {
      console.error("Validation error:", error.details[0].message);

      return res.status(400).json({ error: error.details[0].message });
    }

    const review = await knex("productReview").insert({
      iProductId: productId,
      dRating: rating,
      tDescription: desrciption,
      iUserId: userID,
    });

    if (!review) {
      res.status(404).json({ message: "something went wrong!" });
    } else {
      res.json.status(200)({
        success: 1,
        message: "Product Review successfully.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/update-review", async (req, res) => {
  try {
    const { productId, rating, desrciption, userID, productReviewId } =
      req.params;
    const review = await knex("productReview")
      .update({
        iProductId: productId,
        dRating: rating,
        tDescription: desrciption,
        iUserId: userID,
      })
      .where({ iProductReviewId: productReviewId });

    if (!review) {
      res.status(404).json({ message: "something went wrong!" });
    } else {
      res.json.status(200)({
        success: 1,
        message: "Product review updated successfully.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/detail-review", async (req, res) => {
  try {
    const { productReviewId } = req.params;
    const review = await knex("productReview")
      .select("*")
      .where({ iProductReviewId: productReviewId })
      .first();

    if (!review) {
      res.status(404).json({ message: "something went wrong!" });
    } else {
      res.json.status(200)({
        success: 1,
        message: "Product Review data found successfully.",
        data: review,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/list-review", async (req, res) => {
  try {
    const { productId } = req.params;
    const review = await knex("productReview")
      .select("*")
      .where({ iProductId: productId });

    if (!review) {
      res.status(404).json({ message: "something went wrong!" });
    } else {
      res.json.status(200)({
        success: 1,
        message: "Product Review list data successfully.",
        data: review,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
