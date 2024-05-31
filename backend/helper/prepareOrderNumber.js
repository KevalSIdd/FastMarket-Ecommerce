const knex = require('../database/db');

async function getLastOrderNumber() {
  const lastOrder = await knex('orders')
    .select('iOrderNumber')
    .orderBy('id', 'desc')
    .limit(1)
    .first();

  return lastOrder
    ? prepareOrderNumber(lastOrder.iOrderNumber)
    : prepareOrderNumber(null);
}

function prepareOrderNumber(lastOrderNumber) {
  let orderCounter = 1;
  if (lastOrderNumber) {
    orderCounter = parseInt(lastOrderNumber.slice(-6)) + 1;
  }

  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const orderNumber = `ORD-${year}${month}${day}${orderCounter
    .toString()
    .padStart(6, '0')}`;
  return orderNumber;
}
module.exports = { getLastOrderNumber };
