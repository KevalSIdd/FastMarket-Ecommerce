const express = require("express");
const router = express.Router();

const authRoute = require("./auth");
const usersRoute = require("./users");
const productsRoute = require("./products");
const ordersRoute = require("./orders");
const cartsRoute = require("./cart");
const reviewRoute = require("./review");

router.use("/api/v1/auth", authRoute);
router.use("/api/v1/users", usersRoute);
router.use("/api/v1/products", productsRoute);
router.use("/api/v1/orders", ordersRoute);
router.use("/api/v1/cart", cartsRoute);
router.use("/api/v1/review", reviewRoute);

module.exports = router;
