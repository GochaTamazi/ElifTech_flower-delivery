const express = require('express');
const router = express.Router();

module.exports = (flowerShopsController) => {
    router.get('/', (req, res) => flowerShopsController.getAllShops(req, res));
    return router;
};
