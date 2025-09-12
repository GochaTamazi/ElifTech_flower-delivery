const GenericRepository = require('./BaseRepository');

class FlowersRepository extends GenericRepository {
    constructor(db) {
        super(db, 'Flowers');
    }

    getFlowersByShop(shopId, {sortBy = 'DateAdded', sortOrder = 'DESC', limit, offset, userId} = {}) {
        // Валидация параметров сортировки
        const validSortFields = ['DateAdded', 'Price'];
        const validSortOrders = ['ASC', 'DESC'];

        // Устанавливаем значения по умолчанию, если переданные параметры некорректны
        const sortField = validSortFields.includes(sortBy) ? sortBy : 'DateAdded';
        const order = validSortOrders.includes(sortOrder.toUpperCase()) ? sortOrder.toUpperCase() : 'DESC';

        // Если передан userId, добавляем сортировку по избранному
        if (userId) {
            const stmt = this.db.prepare(`
                SELECT f.*,
                       CASE WHEN uf.Id IS NOT NULL THEN 1 ELSE 0 END AS IsFavorite
                FROM Flowers f
                         LEFT JOIN UsersFavorites uf ON f.Id = uf.FlowerId AND uf.UserId = ? AND uf.IsFavorite = 1
                WHERE f.ShopId = ?
                ORDER BY CASE WHEN uf.Id IS NOT NULL THEN 0 ELSE 1 END, -- Сначала избранные
                         f.${sortField} ${order} ${limit ? `LIMIT ${limit}` : ''}
                         ${offset ? `OFFSET ${offset}` : ''}
            `);
            return stmt.all(userId, shopId);
        } else {
            const stmt = this.db.prepare(`
                SELECT f.*, 0 AS IsFavorite
                FROM Flowers f
                WHERE f.ShopId = ?
                ORDER BY f.${sortField} ${order} ${limit ? `LIMIT ${limit}` : ''} ${offset ? `OFFSET ${offset}` : ''}
            `);
            return stmt.all(shopId);
        }
    }
}

module.exports = FlowersRepository;