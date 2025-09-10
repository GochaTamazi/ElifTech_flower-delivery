const express = require('express');
const router = express.Router();

module.exports = (couponsController) => {
    // Получить все купоны
    router.get('/', (req, res) => couponsController.getAll(req, res));

    // Проверить купон по коду
    router.get('/:code', (req, res) => couponsController.validate(req, res));

    return router;
};
