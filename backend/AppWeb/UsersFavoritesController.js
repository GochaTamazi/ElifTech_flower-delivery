const BaseController = require('./BaseController');

class UsersFavoritesController extends BaseController {
    constructor(usersFavoritesService) {
        super();
        this.usersFavoritesService = usersFavoritesService;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('/:flowerId', this.addToFavorites.bind(this));
        this.router.delete('/:flowerId', this.removeFromFavorites.bind(this));
        this.router.get('/check/:flowerId', this.checkFavoriteStatus.bind(this));
        this.router.get('/', this.getUserFavorites.bind(this));
    }

    // Добавить в избранное
    async addToFavorites(req, res) {
        try {
            const userId = req.session.userId;
            const flowerId = parseInt(req.params.flowerId);
            
            if (!userId) {
                return this.unauthorized(res, 'Требуется авторизация');
            }

            if (isNaN(flowerId)) {
                return this.badRequest(res, 'Некорректный ID цветка');
            }

            await this.usersFavoritesService.addToFavorites(userId, flowerId);
            return this.success(res, { isFavorite: true });
        } catch (error) {
            console.error('Ошибка при добавлении в избранное:', error);
            return this.handleError(res, error);
        }
    }

    // Удалить из избранного
    async removeFromFavorites(req, res) {
        try {
            const userId = req.session.userId;
            const flowerId = parseInt(req.params.flowerId);
            
            if (!userId) {
                return this.unauthorized(res, 'Требуется авторизация');
            }

            if (isNaN(flowerId)) {
                return this.badRequest(res, 'Некорректный ID цветка');
            }

            await this.usersFavoritesService.removeFromFavorites(userId, flowerId);
            return this.success(res, { isFavorite: false });
        } catch (error) {
            console.error('Ошибка при удалении из избранного:', error);
            return this.handleError(res, error);
        }
    }

    // Проверить статус избранного
    async checkFavoriteStatus(req, res) {
        try {
            const userId = req.session.userId;
            const flowerId = parseInt(req.params.flowerId);
            
            if (!userId) {
                return this.unauthorized(res, 'Требуется авторизация');
            }

            if (isNaN(flowerId)) {
                return this.badRequest(res, 'Некорректный ID цветка');
            }

            const isFavorite = await this.usersFavoritesService.isFavorite(userId, flowerId);
            return this.success(res, { isFavorite });
        } catch (error) {
            console.error('Ошибка при проверке статуса избранного:', error);
            return this.handleError(res, error);
        }
    }

    // Получить все избранные цветы пользователя
    async getUserFavorites(req, res) {
        try {
            const userId = req.session.userId;
            
            if (!userId) {
                return this.unauthorized(res, 'Требуется авторизация');
            }

            const favorites = await this.usersFavoritesService.getUserFavorites(userId);
            return this.success(res, favorites);
        } catch (error) {
            console.error('Ошибка при получении избранного:', error);
            return this.handleError(res, error);
        }
    }
}

module.exports = UsersFavoritesController;
