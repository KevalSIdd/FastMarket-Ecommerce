const knex = require("../database/db");

const add = async (requestData) => {
  try {
    let [insertData] = await knex("addresses").insert({
      vAddressName: requestData.addressName,
      vAddressLine1: requestData.addressLine1,
      vAddressLine2: requestData.addressLine2,
      vCity: requestData.city,
      vState: requestData.state,
      vCountry: requestData.country,
      vPhone: requestData.phone,
      iPincode: requestData.pinCode,
      iUserId: requestData.userId,
    });
    if (insertData) return { success: 1 };
    else return { success: 0 };
  } catch (error) {
    console.error("error=======>", error);
    return { success: 0 };
  }
};

const update = async (requestData) => {
  try {
    let updateData = await knex("addresses")
      .update({
        vAddressName: requestData.addressName,
        vAddressLine1: requestData.addressLine1,
        vAddressLine2: requestData.addressLine2,
        vCity: requestData.city,
        vState: requestData.state,
        vCountry: requestData.country,
        vPhone: requestData.phone,
        iPincode: requestData.pinCode,
      })
      .where({ id: requestData.id });
    if (updateData) return { success: 1 };
    else return { success: 0 };
  } catch (error) {
    console.error("error=======>", error);
    return { success: 0 };
  }
};

const details = async (requestData) => {
  try {
    const data = await knex("addresses")
      .select("*")
      .where({ id: requestData.id })
      .first();
    return { success: 1, data };
  } catch (error) {
    console.error("error=======>", error);
    return { success: 0 };
  }
};

const list = async (page, limit, userId) => {
  try {
    const offset = (page - 1) * limit; // Calculate the offset
    const [countData] = await knex("addresses")
      .count("id as totalCount")
      .where({ iUserId: userId });
    console.log();
    if (countData.totalCount == 0) {
      return { success: 0 };
    }

    const data = await knex("addresses")
      .select("*")
      .where({ iUserId: userId })
      .orderBy("id", "desc")
      .limit(limit)
      .offset(offset);

    return { success: 1, data, count: countData };
  } catch (error) {
    console.error("error=======>", error);
    return { success: 0 };
  }
};

const addressDelete = async (requestData) => {
  try {
    await knex("addresses").delete().where({ id: requestData.id });
    return { success: 1 };
  } catch (error) {
    console.error("error=======>", error);
    return { success: 0 };
  }
};

module.exports = { add, update, details, list, addressDelete };
