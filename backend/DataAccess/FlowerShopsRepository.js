const GenericRepository = require('./GenericRepository');

class FlowerShopsRepository extends GenericRepository {
    constructor(db) {
        super(db, 'FlowerShops');
    }

    getShopWithFlowers(shopId) {
        const stmt = this.db.prepare(`SELECT f.*
                                      FROM Flowers f
                                      WHERE f.ShopId = ?
                                      ORDER BY f.IsFavorite DESC, f.DateAdded DESC`);
        return stmt.all(shopId);
    }
}

module.exports = FlowerShopsRepository;