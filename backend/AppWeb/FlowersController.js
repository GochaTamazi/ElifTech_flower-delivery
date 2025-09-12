const express = require('express');
const BaseController = require('./BaseController');

class FlowersController extends BaseController {
    constructor(flowersService) {
        super(flowersService);
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        // Get flowers by shop with sorting
        this.router.get('/shop/:shopId', this.getFlowersByShop.bind(this));
        // Get all flowers with sorting
        this.router.get('/', this.getAllFlowers.bind(this));
        // Get 1 flower
        this.router.get('/:id', this.getById.bind(this));
        // Other CRUD routes
        this.router.post('/', this.create.bind(this));
        this.router.put('/:id', this.update.bind(this));
        this.router.delete('/:id', this.delete.bind(this));
    }

    getRouter() {
        return this.router;
    }

    /**
     * Get all flowers with sorting and pagination
     */
    async getAllFlowers(req, res) {
        try {
            const { 
                sortBy = 'DateAdded', 
                sortOrder = 'DESC', 
                page = 1, 
                pageSize = 10
            } = req.query;

            const offset = (parseInt(page) - 1) * parseInt(pageSize);
            
            const flowers = await this.service.getAllFlowers({ 
                sortBy, 
                sortOrder,
                limit: parseInt(pageSize),
                offset
            });

            res.json(flowers);
        } catch (error) {
            console.error('Error getting all flowers:', error);
            res.status(500).json({ 
                error: 'Ошибка при получении списка цветов',
                details: error.message 
            });
        }
    }

    /**
     * Get flowers by shop ID with sorting and pagination
     */
    //Uses
    async getFlowersByShop(req, res) {
        console.log(req.query);
        //http://localhost:3000/flowers/shop/1?sortBy=DateAdded&sortOrder=DESC&page=1&pageSize=10

        try {
            const { shopId } = req.params;
            const { 
                sortBy = 'DateAdded', 
                sortOrder = 'DESC', 
                page = 1, 
                pageSize = 10 
            } = req.query;

            const offset = (parseInt(page) - 1) * parseInt(pageSize);
            
            const flowers = await this.service.getFlowersByShop(shopId, { 
                sortBy, 
                sortOrder,
                limit: parseInt(pageSize),
                offset
            });

            res.json(flowers);
        } catch (error) {
            console.error(`Error getting flowers for shop ${req.params.shopId}:`, error);
            res.status(500).json({ 
                error: 'Ошибка при получении цветов магазина',
                details: error.message 
            });
        }
    }
}

module.exports = FlowersController;
