const GenericRepository = require('./BaseRepository');

class FlowersRepository extends GenericRepository {
    constructor(db) {
        super(db, 'Flowers');
    }

    getFlowersByShop(shopId, {sortBy = 'DateAdded', limit, offset} = {}) {
        const order = sortBy === 'Price' ? 'Price ASC' : 'DateAdded DESC';
        const stmt = this.db.prepare(`
            SELECT *
            FROM Flowers
            WHERE ShopId = ?
            ORDER BY ${order} ${limit ? `LIMIT ${limit}` : ''} ${offset ? `OFFSET ${offset}` : ''}
        `);
        return stmt.all(shopId);
    }
}

module.exports = FlowersRepository;