const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
router.post("/add", reviewController.add_review);
router.get("/:id", reviewController.get_review);
module.exports = router;
