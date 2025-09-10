const Database = require('better-sqlite3');
const path = require('path');

class Db {
    constructor() {
        const dbPath = path.resolve(__dirname, 'database.sqlite');
        this.db = new Database(dbPath);
        console.log('Connected to SQLite (better-sqlite3)');

    }

    getInstance() {
        return this.db;
    }
}

module.exports = new Db();
