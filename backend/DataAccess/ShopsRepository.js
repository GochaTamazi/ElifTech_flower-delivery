const GenericRepository = require('./BaseRepository');

class ShopsRepository extends GenericRepository {
    constructor(db) {
        super(db, 'Shops');
    }
}

module.exports = ShopsRepository;