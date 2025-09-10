class FlowersController {
    constructor(flowersService) {
        this.service = flowersService;
    }

    markFavorite(req, res) {
        const {flowerId} = req.params;
        const {isFavorite} = req.body;
        const updated = this.service.markFavorite(flowerId, isFavorite);
        res.json({success: !!updated});
    }

    getFlowersByShop(req, res) {
        const {shopId} = req.params;
        const {sortBy, favoritesFirst, page, pageSize} = req.query;
        const flowers = this.service.getFlowersByShop(shopId, {
            sortBy,
            favoritesFirst: favoritesFirst === 'true',
            page: parseInt(page) || 1,
            pageSize: parseInt(pageSize) || 10
        });
        res.json(flowers);
    }

    getAllShops(req, res) {
        const {sortBy, favoritesFirst, page, pageSize} = req.query;
        const shops = this.service.getAllShopsWithFlowers({
            sortBy,
            favoritesFirst: favoritesFirst === 'true',
            page: parseInt(page) || 1,
            pageSize: parseInt(pageSize) || 10
        });
        res.json(shops);
    }

}

module.exports = FlowersController;
