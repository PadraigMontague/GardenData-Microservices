const mysql = require('mysql');

class CreateTable {
    constructor() {
        this.dbCon = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'node2',
        });
    }

    createTable(sqlQuery) {
        this.dbCon.query(sqlQuery, (err, result) => {
            if (err) throw err;
            return result;
        });
    }
}

module.exports = CreateTable;