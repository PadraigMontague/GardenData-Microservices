const _DBConnection = require('../Database/dbCon');

class HarvestingModel extends _DBConnection {
    constructor(plantType, date, quantity, username) {
        super();
        this.plantType = plantType;
        this.date = date;
        this.quantity = quantity;
        this.username = username;
        this.status = {};
    }
    getAllData(fun) {
        let sql = `SELECT * FROM harvest_data WHERE username LIKE '%${this.username}%'`;
        this.executeSearch(sql, (result) => {
            fun(result);
        })
    }

    getAllDataByDate(fun) {
        let sql = `SELECT * FROM harvest_data WHERE username LIKE '%${this.username}%' AND date LIKE '%${this.date}%'`;
        this.executeSearch(sql, (result) => {
            fun(result);
        })
    }

    getDataByType(fun) {
        let sql = `SELECT * FROM harvest_data WHERE username LIKE '%${this.username}%' AND plantType LIKE '%${this.plantType}%'`;
        this.executeSearch(sql, (result) => {
            fun(result);
        })
    }

    getDataByDT(fun) {
        let sql = `SELECT * FROM harvest_data WHERE username LIKE '%${this.username}%' AND plantType LIKE '%${this.plantType}%' AND date LIKE '%${this.date}%'`;
        this.executeSearch(sql, (result) => {
            fun(result);
        })
    }

    createHarvest(fun) {
        if (this.validateData()) {
            let sql = `INSERT INTO harvest_data (plantType, date, quantity, username) VALUES('${this.plantType}','${this.date}','${this.quantity}','${this.username}')`;
            this.executeInsert(sql, (result) => {
                if (result) {
                    this.status = { message: 'Data stored' };
                    fun(this.status);
                } else {
                    fun(result);
                }
            })
        } else {
            this.status = { message: 'Please enter valid data' };
            fun(this.status);
        }
    }

    validateData() {
        if (this.plantType !== undefined && this.plantType !== "" && this.date !== undefined && this.date !== "" && this.quantity !== undefined && this.quantity !== "") {
            return true;
        } else {
            return false;
        }
    }

}

module.exports = HarvestingModel;