class FlowerShopsService {
    constructor(shopRepo, flowerRepo) {
        this.shopRepo = shopRepo;
        this.flowerRepo = flowerRepo;
    }

    getAllShopsWithFlowers({sortBy = 'DateAdded', favoritesFirst = true, page = 1, pageSize = 10} = {}) {
        const shops = this.shopRepo.getAll();
        shops.forEach(shop => {
            shop.flowers = this.flowerRepo.getFlowersByShop(shop.Id, {
                sortBy, favoritesFirst, limit: pageSize, offset: (page - 1) * pageSize
            });
        });
        return shops;
    }

    markFlowerFavorite(flowerId, isFavorite) {
        return this.flowerRepo.markFavorite(flowerId, isFavorite);
    }
}

module.exports = FlowerShopsService;