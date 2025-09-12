const GenericRepository = require('./BaseRepository');

class OrdersRepository extends GenericRepository {
    constructor(db) {
        super(db, 'Orders');
    }

    getOrderWithItems(orderId) {
        const order = this.getById(orderId);
        if (!order) return null;

        const stmt = this.db.prepare(`SELECT *
                                      FROM OrderItems
                                      WHERE OrderId = ?`);
        order.items = stmt.all(orderId);
        return order;
    }
}

module.exports = OrdersRepository;