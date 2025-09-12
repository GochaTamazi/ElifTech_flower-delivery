const GenericRepository = require('./BaseRepository');

class OrderItemsRepository extends GenericRepository {
    constructor(db) {
        super(db, 'OrderItems');
    }
}

module.exports = OrderItemsRepository;