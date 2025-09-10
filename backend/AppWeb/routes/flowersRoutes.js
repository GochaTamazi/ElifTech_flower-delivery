const express = require('express');
const router = express.Router();

module.exports = (flowersController) => {
    // Получить все цветы магазина (с фильтрацией и пагинацией)
    router.get('/shop/:shopId', (req, res) => flowersController.getFlowersByShop(req, res));

    // Пометить цветок как избранный или снять избранное
    router.post('/:flowerId/favorite', (req, res) => flowersController.markFavorite(req, res));

    return router;
};
