const _DBConnection = require('../Database/dbCon');
const DBAuth = require('../Database/dbAuth');
const crypto = require('crypto');
const dotnet = require('dotenv');
dotnet.config();

class User extends _DBConnection {
    constructor(username, password) {
        super()
        this.username = username;
        this.password = password;
        this.db = new _DBConnection();
        this.status = {};
        this.salt = process.env.SERVICE_SALT;
        this.hash = crypto.pbkdf2Sync(this.password, this.salt, 1000, 64, 'sha512').toString('hex');
    }

    createUser(fun) {
        this.isDuplicate((result) => {
            if (result) {
                this.status = { message: 'Username already exists' };
                fun(this.status);
            } else {
                let dbauth = new DBAuth();
                let prepared = dbauth.prepareStatement(this.username);
                let sql = `INSERT INTO users (username, password) VALUES ('${prepared}', '${this.hash}')`;
                this.db.executeInsert(sql, (result) => {
                    this.status = { message: 'User Created' };
                    fun(this.status);
                });
            }
        });
    }

    isDuplicate(fun) {
        let sql = `SELECT COUNT(id) AS NumOfUsers FROM users WHERE username = '${this.username}'`;
        this.executeSearch(sql, (result) => {
            if (result.status !== 'unavailable') {
                if (result[0].NumOfUsers < 1) {
                    fun(false);
                } else {
                    fun(true);
                }
            } else {
                fun(true);
            }
        });
    }

    editUser(oldUser, newUser) {
        let dbauth = new DBAuth();
        let oldUsername = dbauth.prepareStatement(oldUser);
        let newUsername = dbauth.prepareStatement(newUser);
        let sql = `UPDATE users SET username ='${newUsername}' WHERE username='${oldUsername}')`;
        this.db.executeUpdate(sql, (result) => {
            this.status = { message: 'Username Updated' };
            fun(this.status);
        });
    }
    
    deleteUser() { 
        let dbauth = new DBAuth();
        let preparedUsername = dbauth.prepareStatement(this.username);
        let sql = `DELETE FROM users WHERE username='${preparedUsername}')`;
        this.db.executeDelete(sql, (result) => {
            fun(result);
        });
    }
}

module.exports = User;