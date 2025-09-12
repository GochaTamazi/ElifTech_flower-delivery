const BaseService = require('./BaseService');

class FlowersService extends BaseService {
    constructor(flowerRepo) {
        super(flowerRepo);
    }

    async getFlowersByShop(shopId, {sortBy = 'DateAdded', sortOrder = 'DESC', limit, offset, userId} = {}) {
        try {
            return await this.repository.getFlowersByShop(shopId, {
                sortBy, sortOrder, limit, offset, userId
            });
        } catch (error) {
            throw new Error(`Error receiving store flowers: ${error.message}`);
        }
    }
}

module.exports = FlowersService;
