const dotnet = require('dotenv');
const jwt = require('jsonwebtoken');

dotnet.config();
let status = {};
class Authentication {
    constructor(token) {
        this.token = token;
    }

    isSecretValid() {
        try {
            jwt.verify(this.token, process.env.ACCESS_TOKEN_SECRET);
        } catch (err) {
            if (err instanceof jwt.JsonWebTokenError) {
                return false;
            }
            return false;
        }
        return true;
    }

    isIsserValid() {
        if (this.isSecretValid()) {
            let decoded = jwt.verify(this.token, process.env.ACCESS_TOKEN_SECRET);
            let issuer = decoded.iss;
            if (issuer === process.env.SERTVICE_ISSUER) {
                return true;
            } else {
                return false;
            }
        } else {
            return status = { message: 'Token is not valid' };
        }
    }
    
    isExpired() {
        if (this.isSecretValid() && this.isIsserValid()) {
            let decoded = jwt.verify(this.token, process.env.ACCESS_TOKEN_SECRET);
            let exp_time = decoded.exp;
            let current_time = Math.floor(new Date() / 1000) + (60 * 60);
            if (exp_time <= current_time) {
                return status = { expired: true, current_time: current_time, exp_time: exp_time };
            } else {
                return status = { expired: false, current_time: current_time, exp_time: exp_time };
            }
        } else {
            return status = { message: 'Token is not valid' };
        }
    }
}

module.exports = Authentication;