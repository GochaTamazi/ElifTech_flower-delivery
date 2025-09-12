const express = require('express');
const BaseController = require('./BaseController');

class OrdersController extends BaseController {
    constructor(orderService) {
        super(orderService);
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('/', this.createOrder.bind(this));
        this.router.get('/:orderId', this.getOrderById.bind(this));
    }

    getRouter() {
        return this.router;
    }

    createOrder(req, res) {
        try {
            const order = this.service.createOrder(req.body);
            return this.success(res, order, 201);
        } catch (error) {
            return this.handleError(res, error);
        }
    }

    async getOrderById(req, res) {
        try {
            const {orderId} = req.params;
            const order = await this.service.getById(orderId);
            if (!order) {
                return this.notFound(res, 'Order not found');
            }
            return this.success(res, order);
        } catch (error) {
            console.error('Error receiving order:', error);
            return this.handleError(res, error);
        }
    }
}

module.exports = OrdersController;
