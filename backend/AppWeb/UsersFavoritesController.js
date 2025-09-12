const express = require('express');
const BaseController = require('./BaseController');

class UsersFavoritesController extends BaseController {
    constructor(service) {
        super(service);
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('/:flowerId', this.addToFavorites.bind(this));
        this.router.delete('/:id', this.removeFromFavorites.bind(this));
    }

    getRouter() {
        return this.router;
    }

    async addToFavorites(req, res) {
        try {
            const userId = req.session.userId;
            const flowerId = parseInt(req.params.flowerId);
            if (!userId) {
                return this.unauthorized(res, 'Authorization required');
            }

            if (isNaN(flowerId)) {
                return this.badRequest(res, 'Invalid flower ID');
            }

            await this.service.addToFavorites(userId, flowerId);
            return this.success(res, {isFavorite: true});
        } catch (error) {
            console.error('Error adding to favorites:', error);
            return this.handleError(res, error);
        }
    }

    async removeFromFavorites(req, res) {
        try {
            const userId = req.session.userId;
            const flowerId = parseInt(req.params.id);

            if (!userId) {
                return this.unauthorized(res, 'Authorization required');
            }

            if (isNaN(flowerId)) {
                return this.badRequest(res, 'Invalid flower ID');
            }

            await this.service.removeFromFavorites(userId, flowerId);
            return this.success(res, {isFavorite: false});
        } catch (error) {
            console.error('Error removing from favorites:', error);
            return this.handleError(res, error);
        }
    }

    async getUserFavorites(req, res) {
        try {
            const userId = req.session.userId;
            if (!userId) {
                return this.unauthorized(res, 'Authorization required');
            }

            const favorites = await this.service.getUserFavorites(userId);
            return this.success(res, favorites);
        } catch (error) {
            console.error('Error getting favorites:', error);
            return this.handleError(res, error);
        }
    }
}

module.exports = UsersFavoritesController;
