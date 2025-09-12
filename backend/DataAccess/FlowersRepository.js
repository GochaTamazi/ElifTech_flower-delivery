const GenericRepository = require('./BaseRepository');

class FlowersRepository extends GenericRepository {
    constructor(db) {
        super(db, 'Flowers');
    }

    getFlowersByShop(shopId, {sortBy = 'DateAdded', sortOrder = 'DESC', limit, offset} = {}) {
        // Валидация параметров сортировки
        const validSortFields = ['DateAdded', 'Price'];
        const validSortOrders = ['ASC', 'DESC'];
        
        // Устанавливаем значения по умолчанию, если переданные параметры некорректны
        const sortField = validSortFields.includes(sortBy) ? sortBy : 'DateAdded';
        const order = validSortOrders.includes(sortOrder.toUpperCase()) ? sortOrder.toUpperCase() : 'DESC';
        
        const stmt = this.db.prepare(`
            SELECT *
            FROM Flowers
            WHERE ShopId = ?
            ORDER BY ${sortField} ${order}
            ${limit ? `LIMIT ${limit}` : ''} 
            ${offset ? `OFFSET ${offset}` : ''}
        `);
        return stmt.all(shopId);
    }
    
    getAllFlowers({sortBy = 'DateAdded', sortOrder = 'DESC', limit, offset} = {}) {
        // Валидация параметров сортировки
        const validSortFields = ['DateAdded', 'Price'];
        const validSortOrders = ['ASC', 'DESC'];
        
        // Устанавливаем значения по умолчанию, если переданные параметры некорректны
        const sortField = validSortFields.includes(sortBy) ? sortBy : 'DateAdded';
        const order = validSortOrders.includes(sortOrder.toUpperCase()) ? sortOrder.toUpperCase() : 'DESC';
        
        const stmt = this.db.prepare(`
            SELECT *
            FROM Flowers
            ORDER BY ${sortField} ${order}
            ${limit ? `LIMIT ${limit}` : ''} 
            ${offset ? `OFFSET ${offset}` : ''}
        `);
        return stmt.all();
    }
}

module.exports = FlowersRepository;