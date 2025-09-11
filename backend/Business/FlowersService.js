const BaseService = require('./BaseService');

class FlowersService extends BaseService {
    constructor(flowerRepo) {
        super(flowerRepo);
    }

    // Можно добавить специфичные для цветов методы, например:
    async getFlowersByShop(shopId) {
        try {
            return await this.repository.getByShopId(shopId);
        } catch (error) {
            throw new Error(`Error getting flowers by shop: ${error.message}`);
        }
    }

    async searchFlowers(query) {
        try {
            return await this.repository.search(query);
        } catch (error) {
            throw new Error(`Error searching flowers: ${error.message}`);
        }
    }
}

module.exports = FlowersService;
