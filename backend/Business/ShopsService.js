const BaseService = require('./BaseService');

class ShopsService extends BaseService {
    constructor(shopRepo, flowerRepo) {
        super(shopRepo);
        this.flowerRepo = flowerRepo;
    }

    getAllShops({page = 1, pageSize = 10} = {}) {
        const offset = (page - 1) * pageSize;
        return this.repository.getAll({limit: pageSize, offset});
    }
}

module.exports = ShopsService;