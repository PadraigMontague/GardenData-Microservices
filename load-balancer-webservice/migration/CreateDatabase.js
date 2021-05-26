const mysql = require('mysql');

class CreateDatabase {
    constructor() {
        this.dbCon = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: ''
        });
    }

    createDB(database) {
        let sqlQuery = `CREATE DATABASE IF NOT EXISTS ${database}`;
        this.dbCon.query(sqlQuery, (err, result) => {
            if (err) throw err;
            return result;
        });
    }
}

module.exports = CreateDatabase;