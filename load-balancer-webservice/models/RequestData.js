const _DBConnection = require('../Database/dbCon');

class RequestData extends _DBConnection {
    constructor(server_data) {
        super();
        this.server_name = server_data.server_name;
        this.server_address = server_data.server_address;
        this.requested_endpoint = server_data.requested_endpoint;
        this.username = server_data.username;
        this.date = server_data.date;
    }

    storeServerData(fun) {
        let sql = `INSERT INTO balancer(server_name, server_address, requested_endpoint, username, date) VALUES ('${this.server_name}','${this.server_address}','${this.requested_endpoint}','${this.username}','${this.date}')`;
        this.executeInsert(sql, (result) => {
            this.status = { message: 'Data Stored' };
            fun(this.status);
        });
    }
}

module.exports = RequestData;