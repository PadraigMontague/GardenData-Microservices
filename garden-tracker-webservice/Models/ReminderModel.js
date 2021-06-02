const DBConnection = require('../Database/dbCon');

class ReminderModel extends DBConnection {
    constructor() {
        super();
        this.reminderDescription = null;
        this.date = null;
        this.reminderCycle = null;
        this.reminderDate = null;
        this.execute;
    }

    initModel(data, res) {

        this.reminderDescription = data.reminderDescription;
        this.date = data.date;
        this.reminderCycle = data.reminderCycle;
        this.reminderDate = data.reminderDate;

        let isValid = this.validateData(data);
        if (isValid) {
            this.executeInsertQuery(res);
            return 'Valid';
        } else {
            return 'Invalid';
        }
    }

    validateData(data) {
        if (data.reminderDescription === "" || data.date === "" || data.reminderCycle === "" || data.reminderDate === "") {
            return false;
        } else {
            return true;
        }
    }

    executeInsertQuery(res) {
        let sql = `INSERT INTO reminder (reminderDescription, date, reminderCycle, reminderDate) VALUES ('${this.reminderDescription}' , '${this.date}', '${this.reminderCycle}', '${this.reminderDate}')`;
        this.executeInsert(sql, res);
    }

    executeQuery(res) {
        let sql = `INSERT INTO reminder (reminderDescription, date, reminderCycle, reminderDate) VALUES ('${this.reminderDescription}' , '${this.date}', '${this.reminderCycle}', '${this.reminderDate}')`;
        let data = this.executeSearch(sql, res);
        return data;
    }

    getReminder(res) {
        let sql = 'SELECT reminderDescription FROM reminder WHERE reminderID = 1';
        let data = this.executeSearch(sql, res);
        return data;
    }
}

module.exports = ReminderModel;