const express = require('express');

class ShopsController {
    constructor(flowerShopsService) {
        this.service = flowerShopsService;
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        // Get all shops
        this.router.get('/', this.getAllShops.bind(this));
        // Get shop by ID
        this.router.get('/:id', this.getShopById.bind(this));
        // Create shop
        this.router.post('/', this.createShop.bind(this));
        // Update shop
        this.router.put('/:id', this.updateShop.bind(this));
        // Delete shop
        this.router.delete('/:id', this.deleteShop.bind(this));
    }

    /**
     * Get all flower shops with optional pagination
     */
    async getAllShops(req, res) {
        try {
            const { page = 1, pageSize = 10 } = req.query;
            const shops = await this.service.getAllShops({
                page: parseInt(page),
                pageSize: parseInt(pageSize)
            });
            res.json(shops);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Get a single shop by ID with its flowers
     */
    async getShopById(req, res) {
        try {
            const { id } = req.params;
            const shop = await this.service.getShopWithFlowers(id);
            if (!shop) {
                return res.status(404).json({ error: 'Flower shop not found' });
            }
            res.json(shop);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Create a new flower shop
     */
    async createShop(req, res) {
        try {
            const shop = await this.service.createShop(req.body);
            res.status(201).json(shop);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * Update a flower shop
     */
    async updateShop(req, res) {
        try {
            const { id } = req.params;
            const updatedShop = await this.service.updateShop(id, req.body);
            if (!updatedShop) {
                return res.status(404).json({ error: 'Flower shop not found' });
            }
            res.json(updatedShop);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * Delete a flower shop
     */
    async deleteShop(req, res) {
        try {
            const { id } = req.params;
            const result = await this.service.deleteShop(id);
            if (!result) {
                return res.status(404).json({ error: 'Flower shop not found' });
            }
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getRouter() {
        return this.router;
    }
}

module.exports = ShopsController;
