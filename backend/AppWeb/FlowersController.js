const express = require('express');
const BaseController = require('./BaseController');

class FlowersController extends BaseController {
    constructor(flowersService) {
        super(flowersService);
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/shop/:shopId', this.getFlowersByShop.bind(this));
    }

    getRouter() {
        return this.router;
    }

    //http://localhost:3000/flowers/shop/1?sortBy=DateAdded&sortOrder=DESC&page=1&pageSize=10
    async getFlowersByShop(req, res) {
        const userId = req.session.userId;
        try {
            const {shopId} = req.params;
            const {
                sortBy = 'DateAdded', sortOrder = 'DESC', page = 1, pageSize = 10
            } = req.query;

            const offset = (parseInt(page) - 1) * parseInt(pageSize);

            const flowers = await this.service.getFlowersByShop(shopId, {
                sortBy, sortOrder, limit: parseInt(pageSize), offset, userId
            });

            res.json(flowers);
        } catch (error) {
            console.error(`Error getting flowers for shop ${req.params.shopId}:`, error);
            res.status(500).json({
                error: 'Error receiving store flowers', details: error.message
            });
        }
    }
}

module.exports = FlowersController;
