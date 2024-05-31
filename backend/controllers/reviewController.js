const { getReview, addReview } = require("../services/reviewService");
const { addReviewValidation } = require("../middleware/validation");
exports.add_review = async (req, res, next) => {
  const { error } = addReviewValidation(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  const { userId, rating, productId, description } = req.body;
  addReview({ userId, rating, productId, description })
    .then((result) => {
      res.status(200).send({
        success: 1,
        message: "Added Review successfully",
        statusCode: 200,
        data: result,
      });
    })
    .catch((err) => {
      const { statusCode = 400, message, data } = err;
      res.status(statusCode).send({
        success: 0,
        message: message,
        statusCode: statusCode,
        data: data,
      }) && next(err);
    });
};
exports.get_review = async (req, res, next) => {
  getReview(req.params)
    .then((result) => {
      const { message, data } = result;
      res.status(200).send({ message, data });
    })
    .catch((err) => {
      const { statusCode = 400, message, data } = err;
      res.status(statusCode).send({ message, data }) && next(err);
    });
};
