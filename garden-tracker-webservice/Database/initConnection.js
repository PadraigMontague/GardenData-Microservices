const mysql = require('mysql');

class InitConnection {
    constructor() {
        this.dbCon = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'node',
        });
    }
}

module.exports = InitConnection;