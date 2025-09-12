const GenericRepository = require('./BaseRepository');
const e = require("express");

class UsersFavoritesRepository extends GenericRepository {
    constructor(db) {
        super(db, 'UsersFavorites');
    }

    // Добавить в избранное
    async addToFavorites(userId, flowerId) {
        const exists = await this.GetOne(userId, flowerId);
        if (exists) {
            // Если уже есть, просто обновляем IsFavorite на 1
            const stmt = this.db.prepare(`
                UPDATE ${this.tableName}
                SET IsFavorite = 1
                WHERE UserId = ?
                  AND FlowerId = ?
            `);
            return stmt.run(userId, flowerId);
        } else {
            // Если нет, добавляем новую запись
            const stmt = this.db.prepare(`
                INSERT INTO ${this.tableName} (UserId, FlowerId, IsFavorite)
                SELECT ?, ?, 1
                WHERE NOT EXISTS (SELECT 1
                                  FROM ${this.tableName}
                                  WHERE UserId = ?
                                    AND FlowerId = ?)
            `);
            return stmt.run(userId, flowerId, userId, flowerId);
        }
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
    async GetOne(userId, flowerId) {
        const stmt = this.db.prepare(`SELECT IsFavorite
                                      FROM ${this.tableName}
                                      WHERE UserId = ?
                                        AND FlowerId = ?`);
        const result = stmt.get(userId, flowerId);
        return result;
    }


    // Получить все избранные цветы пользователя
    async getUserFavorites(userId) {
        const stmt = this.db.prepare(`SELECT FlowerId
                                      FROM ${this.tableName}
                                      WHERE UserId = ?
                                        AND IsFavorite = 1`);
        const result = stmt.all(userId);
        return result ? result.map(item => item.FlowerId) : [];
    }
}

module.exports = UsersFavoritesRepository;