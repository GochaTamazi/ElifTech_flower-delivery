const fs = require('fs');
const path = require('path');
const Db = require('./Db').getInstance();

const InitDB = () => {
    try {
        const sqlFile = path.resolve(__dirname, './SQL/init_db.sql');
        const sql = fs.readFileSync(sqlFile, 'utf-8');
        Db.exec(sql);
        console.log('Database initialized from init_db.sql');


        const seedFile = path.resolve(__dirname, './SQL/seed_data.sql');
        const seedSQL = fs.readFileSync(seedFile, 'utf-8');
        // Оборачиваем все вставки в транзакцию для скорости
        const insertTransaction = Db.transaction(() => {
            Db.exec(seedSQL);
        });
        insertTransaction();
        console.log('Database seeded with test data');


    } catch (err) {
        console.error('DB init error:', err);
    }
};

module.exports = InitDB;
