const GenericRepository = require('./BaseRepository');

class UsersFavoritesRepository extends GenericRepository {
    constructor(db) {
        super(db, 'UsersFavorites');
    }

    // Создать или обновить запись в избранном
    async addToFavorites(userId, flowerId) {
        const stmt = this.db.prepare(`INSERT OR
                                      REPLACE
                                      INTO ${this.tableName} (UserId, FlowerId, IsFavorite)
                                      VALUES (?, ?, 1)`);
        return stmt.run(userId, flowerId);
    }

    // Удалить из избранного (установить IsFavorite в 0)
    async removeFromFavorites(userId, flowerId) {
        const stmt = this.db.prepare(`UPDATE ${this.tableName}
                                      SET IsFavorite = 0
                                      WHERE UserId = ?
                                        AND FlowerId = ?`);
        return stmt.run(userId, flowerId);
    }

    // Проверить, находится ли цветок в избранном
    async isFavorite(userId, flowerId) {
        const stmt = this.db.prepare(`SELECT IsFavorite
                                      FROM ${this.tableName}
                                      WHERE UserId = ?
                                        AND FlowerId = ?`);
        const result = stmt.get(userId, flowerId);
        return result ? result.IsFavorite === 1 : false;
    }
}

module.exports = UsersFavoritesRepository;