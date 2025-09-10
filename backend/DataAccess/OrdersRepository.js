const GenericRepository = require('./GenericRepository');

class OrdersRepository extends GenericRepository {
    constructor(db) {
        super(db, 'Orders');
    }

    getOrdersByEmail(email) {
        const stmt = this.db.prepare(`SELECT *
                                      FROM Orders
                                      WHERE Email = ?
                                      ORDER BY CreatedAt DESC`);
        return stmt.all(email);
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

    applyCoupon(orderId, code) {
        const stmt = this.db.prepare(`UPDATE Orders
                                      SET CouponCode = ?
                                      WHERE Id = ?`);
        return stmt.run(code, orderId).changes;
    }
}

module.exports = OrdersRepository;