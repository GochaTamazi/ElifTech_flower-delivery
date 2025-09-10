const express = require('express');
const router = express.Router();

module.exports = (ordersController) => {
    router.post('/', (req, res) => ordersController.createOrder(req, res));
    router.get('/:email', (req, res) => ordersController.getOrdersByEmail(req, res));
    router.get('/id/:orderId', (req, res) => ordersController.getOrderById(req, res));
    router.post('/:orderId/coupon', (req, res) => ordersController.applyCoupon(req, res));
    return router;
};
