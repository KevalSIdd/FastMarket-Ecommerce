const knex = require("../database/db");

exports.addReview = async (body) => {
  const { userId, rating, productId, description } = body;
  try {
    console.log(userId, rating, productId, description);
    const findReview = await knex("orders").where({
      user_id: userId,
    });
    const orderIds = findReview.map((order) => order.id);

    const lastOrderWithRating = await knex("orders_details")
      .whereIn("order_id", orderIds)
      .andWhere("product_id", productId)
      .andWhere("isRated", 0)
      .orderBy("dtAddedDate", "desc")
      .first();
    console.log("lastOrderWithRating", lastOrderWithRating);
    if (lastOrderWithRating) {
      const newReview = await knex("productReview").insert({
        userId: userId,
        productId: productId,
        rating: rating,
        description: description,
      });
      await knex("orders_details")
        .where("id", lastOrderWithRating.id)
        .update({ isRated: 1 });

      const avgReviews = await knex("productReview")
        .select("ProductId")
        .avg("rating as average_rating")
        .groupBy("ProductId");

      avgReviews.forEach(async (avgReview) => {
        await knex("products").where("id", avgReview.ProductId).update({
          avgRating: avgReview.average_rating,
        });
      });
      return {
        message: "Review is added successfully",
        statusCode: 200,
        data: newReview,
      };
    } else if (lastOrderWithRating === undefined) {
      return {
        message: "Please buy First before reviewing",
        statusCode: 400,
        data: "",
      };
    } else {
      return {
        message: "Review is already added",
        statusCode: 500,
        data: "",
      };
    }
  } catch (error) {
    return {
      message: "New review failed while adding order ",
      statusCode: 500,
      data: error,
    };
  }
};
exports.getReview = async (productId) => {
  try {
    const getReviewList = await knex("productReview")
      .leftJoin("users", "productReview.userId", "id")
      .where("productId", Number(productId.id))
      .select("productReview.*", "users.username");
    return {
      message: "Review List Retrieve successfully",
      statusCode: 200,
      data: getReviewList,
    };
  } catch (error) {
    return {
      message: "Review list not found",
      statusCode: 500,
      data: error,
    };
  }
};
