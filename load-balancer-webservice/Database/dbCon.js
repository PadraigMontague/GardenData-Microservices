const InitConnection = require('./initConnection');

class DBConnection extends InitConnection {
    constructor() {
        super();
        this.dbCon;
        this.data;
    };

    executeSearch(sqlQuery, fun) {
        this.dbCon.query(sqlQuery, (err, result) => {
            if (err) {
                console.log('Database is not available');
                return fun({ status: 'unavailable' });
            } else {
                fun(result);
            }
        });
    }
    executeInsert(sqlQuery, fun) {
        this.dbCon.query(sqlQuery, (err, result) => {
            if (err) {
                console.log('Database is not available');
            } else {
                fun(true);
            }
        });
    }
}

module.exports = DBConnection;