const express = require('express');

class ShopsController {
    constructor(flowerShopsService) {
        this.service = flowerShopsService;
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/', this.getAllShops.bind(this));
    }

    async getAllShops(req, res) {
        try {
            const {page = 1, pageSize = 20} = req.query;
            const shops = await this.service.getAllShops({
                page: parseInt(page), pageSize: parseInt(pageSize)
            });
            res.json(shops);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    getRouter() {
        return this.router;
    }
}

module.exports = ShopsController;
