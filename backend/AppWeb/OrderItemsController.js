const express = require('express');
const BaseController = require('./BaseController');

class OrderItemsController extends BaseController {
    constructor(orderItemsService) {
        super(orderItemsService);
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/order/:orderId', this.getItemsByOrder.bind(this));
        this.router.get('/:orderId/items/:itemId', this.getOrderItem.bind(this));
    }

    getRouter() {
        return this.router;
    }

    // Get all items for a specific order
    async getItemsByOrder(req, res) {
        try {
            const { orderId } = req.params;
            const items = await this.service.getItemsByOrder(orderId);
            return this.success(res, items);
        } catch (error) {
            return this.handleError(res, error);
        }
    }

    // Get a specific order item
    async getOrderItem(req, res) {
        try {
            const { orderId, itemId } = req.params;
            const item = await this.service.getOrderItem(orderId, itemId);
            if (!item) {
                return this.notFound(res, 'Order item not found');
            }
            return this.success(res, item);
        } catch (error) {
            return this.handleError(res, error);
        }
    }
}

module.exports = OrderItemsController;
