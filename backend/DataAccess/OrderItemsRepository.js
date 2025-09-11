const GenericRepository = require('./BaseRepository');

class OrderItemsRepository extends GenericRepository {
    constructor(db) {
        super(db, 'OrderItems');
    }

    getItemsByOrder(orderId) {
        const stmt = this.db.prepare(`SELECT *
                                      FROM OrderItems
                                      WHERE OrderId = ?`);
        return stmt.all(orderId);
    }
}

module.exports = GenericRepository;