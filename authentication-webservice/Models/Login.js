const _DBConnection = require('../Database/dbCon');
const dotnet = require('dotenv');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
dotnet.config();

class Login extends _DBConnection {
    constructor(username, password, rememberMe) {
        super();
        this.username = username;
        this.password = password;
        this.rememberMe = rememberMe;
        this.status = {};
        this.salt = process.env.SERVICE_SALT;
        this.hash = crypto.pbkdf2Sync(this.password, this.salt, 1000, 64, 'sha512').toString('hex');
    }

    checkUserCredientals(fun) {
        if (this.username !== undefined || this.username === "" || this.password !== undefined || this.password === "") {
            let sql = `SELECT password, username FROM users WHERE username LIKE '%${this.username}%'`;
            this.executeSearch(sql, (result) => {
                if (result.status !== 'unavailable') {
                    if (result.length < 1 || result === undefined) {
                        this.status = { message: false };
                        fun(this.status);
                    } else {
                        if (this.hash === result[0].password && this.username === result[0].username) {
                            console.log(result[0].username);
                            this.status = { message: true };
                            fun(this.status);
                        } else {
                            this.status = { message: false };
                            fun(this.status);
                        }
                    }
                } else {
                    this.status = { message: false };
                    fun(this.status);
                }
            });
        } else {
            this.status = { message: false };
            return this.status;
        }
    }

    generateToken(res) {
        let issued = new Date();
        issued.setHours(issued.getHours() + 1);
        let expire = new Date();
        expire.setHours(expire.getHours() + 2);
        const token = jwt.sign({ username: this.username, exp: Math.floor(expire / 1000) + (60 * 60), iss: process.env.SERTVICE_ISSUER, time_issued: issued }, process.env.ACCESS_TOKEN_SECRET);
        res.status(200).json({
            username: this.username,
            token: token,
            time_issued: issued,
            exp: Math.floor(expire / 1000) + (60 * 60)
        });

    }
}

module.exports = Login;