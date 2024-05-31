const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/', orderController.get_orders);

router.get('/single', orderController.get_single_order);

router.post('/create', orderController.create_order);

router.post('/create-cart', orderController.createCart);

router.get('/details', orderController.orderDetails);

router.get('/list', orderController.orderList);

module.exports = router;
