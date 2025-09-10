class FlowersService {
    constructor(flowerRepo) {
        this.flowerRepo = flowerRepo;
    }

    getFlowersByShop(shopId, options = {}) {
        return this.flowerRepo.getFlowersByShop(shopId, options);
    }

    markFavorite(flowerId, isFavorite) {
        return this.flowerRepo.markFavorite(flowerId, isFavorite);
    }
}

module.exports = FlowersService;