const GenericRepository = require('./BaseRepository');

class CouponsRepository extends GenericRepository {
    constructor(db) {
        super(db, 'Coupons');
    }

    getCouponByCode(code) {
        const stmt = this.db.prepare(`SELECT *
                                      FROM Coupons
                                      WHERE Code = ?`);
        return stmt.get(code);
    }
}

module.exports = CouponsRepository;