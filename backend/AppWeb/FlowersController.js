const express = require('express');
const BaseController = require('./BaseController');

class FlowersController extends BaseController {
    constructor(flowersService) {
        super(flowersService);
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        // Get flowers by shop
        this.router.get('/shop/:shopId', this.getFlowersByShop.bind(this));
        // Get all flowers with shop info
        this.router.get('/shops', this.getAllShops.bind(this));
        // Standard CRUD routes from BaseController
        this.router.get('/', this.getAll.bind(this));
        this.router.get('/:id', this.getById.bind(this));
        this.router.post('/', this.create.bind(this));
        this.router.put('/:id', this.update.bind(this));
        this.router.delete('/:id', this.delete.bind(this));
    }

    getRouter() {
        return this.router;
    }

    async getFlowersByShop(req, res) {
        try {
            const { shopId } = req.params;
            const { sortBy, page, pageSize } = req.query;
            const flowers = await this.service.getFlowersByShop(shopId, {
                sortBy,
                page: parseInt(page) || 1,
                pageSize: parseInt(pageSize) || 10
            });
            res.json(flowers);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllShops(req, res) {
        try {
            const { sortBy, page, pageSize } = req.query;
            const shops = await this.service.getAllShopsWithFlowers({
                sortBy,
                page: parseInt(page) || 1,
                pageSize: parseInt(pageSize) || 10
            });
            res.json(shops);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = FlowersController;
