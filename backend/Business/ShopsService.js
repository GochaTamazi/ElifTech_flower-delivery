const BaseService = require('./BaseService');

class ShopsService extends BaseService {
    constructor(shopRepo, flowerRepo) {
        super(shopRepo);
        this.flowerRepo = flowerRepo;
    }

    /**
     * Get all shops with pagination
     */
    getAllShops({ page = 1, pageSize = 10 } = {}) {
        const offset = (page - 1) * pageSize;
        return this.repository.getAll({ limit: pageSize, offset });
    }

    /**
     * Get a single shop by ID with its flowers
     */
    getShopWithFlowers(shopId) {
        const shop = this.repository.getById(shopId);
        if (!shop) return null;
        
        shop.flowers = this.flowerRepo.getFlowersByShop(shopId);
        return shop;
    }

    /**
     * Create a new shop
     */
    createShop(shopData) {
        return this.repository.create(shopData);
    }

    /**
     * Update a shop
     */
    updateShop(id, updateData) {
        return this.repository.update(id, updateData);
    }

    /**
     * Delete a shop
     */
    deleteShop(id) {
        return this.repository.delete(id);
    }

    /**
     * Get all shops with their flowers (for backward compatibility)
     */
    getAllShopsWithFlowers({ sortBy = 'DateAdded', favoritesFirst = true, page = 1, pageSize = 10 } = {}) {
        const shops = this.getAllShops({ page, pageSize });
        shops.forEach(shop => {
            shop.flowers = this.flowerRepo.getFlowersByShop(shop.Id, {
                sortBy, 
                favoritesFirst, 
                limit: pageSize, 
                offset: (page - 1) * pageSize
            });
        });
        return shops;
    }

    /**
     * Mark a flower as favorite
     */
    markFlowerFavorite(flowerId, isFavorite) {
        return this.flowerRepo.markFavorite(flowerId, isFavorite);
    }
}

module.exports = ShopsService;