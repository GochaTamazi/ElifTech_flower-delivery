class BaseRepository {
    constructor(db, tableName) {
        this.db = db;
        this.tableName = tableName;
    }

    getAll() {
        const stmt = this.db.prepare(`SELECT *
                                      FROM ${this.tableName}`);
        return stmt.all();
    }

    getById(id) {
        const stmt = this.db.prepare(`SELECT *
                                      FROM ${this.tableName}
                                      WHERE Id = ?`);
        return stmt.get(id);
    }

    insert(data) {
        const keys = Object.keys(data).join(', ');
        const placeholders = Object.keys(data).map(k => `@${k}`).join(', ');
        const stmt = this.db.prepare(`INSERT INTO ${this.tableName} (${keys})
                                      VALUES (${placeholders})`);
        const info = stmt.run(data);
        return info.lastInsertRowid;
    }

    update(id, data) {
        const setClause = Object.keys(data).map(k => `${k} = @${k}`).join(', ');
        const stmt = this.db.prepare(`UPDATE ${this.tableName}
                                      SET ${setClause}
                                      WHERE Id = @Id`);
        const info = stmt.run({...data, Id: id});
        return info.changes;
    }

    delete(id) {
        const stmt = this.db.prepare(`DELETE
                                      FROM ${this.tableName}
                                      WHERE Id = ?`);
        const info = stmt.run(id);
        return info.changes;
    }
}

module.exports = BaseRepository;
