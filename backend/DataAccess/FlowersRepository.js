const GenericRepository = require('./BaseRepository');

class FlowersRepository extends GenericRepository {
    constructor(db) {
        super(db, 'Flowers');
    }

    getFlowersByShop(shopId, {sortBy = 'DateAdded', favoritesFirst = true, limit, offset} = {}) {
        let order = favoritesFirst ? 'IsFavorite DESC, ' : '';
        order += sortBy === 'Price' ? 'Price ASC' : 'DateAdded DESC';
        const stmt = this.db.prepare(`
            SELECT *
            FROM Flowers
            WHERE ShopId = ?
            ORDER BY ${order} ${limit ? `LIMIT ${limit}` : ''} ${offset ? `OFFSET ${offset}` : ''}
        `);
        return stmt.all(shopId);
    }

    markFavorite(flowerId, isFavorite) {
        const stmt = this.db.prepare(`UPDATE Flowers
                                      SET IsFavorite = ?
                                      WHERE Id = ?`);
        return stmt.run(isFavorite ? 1 : 0, flowerId).changes;
    }
}

module.exports = FlowersRepository;