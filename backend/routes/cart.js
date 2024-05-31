const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/add", cartController.add);

router.post("/update", cartController.update);

router.post("/checkout", cartController.checkout);

router.get("/list", cartController.list);

module.exports = router;
