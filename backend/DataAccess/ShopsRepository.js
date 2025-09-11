const GenericRepository = require('./BaseRepository');

class ShopsRepository extends GenericRepository {
    constructor(db) {
        super(db, 'Shops');
    }

    getShopWithFlowers(shopId) {
        const stmt = this.db.prepare(`SELECT f.*
                                      FROM Flowers f
                                      WHERE f.ShopId = ?
                                      ORDER BY f.DateAdded DESC`);
        return stmt.all(shopId);
    }
}

module.exports = ShopsRepository;