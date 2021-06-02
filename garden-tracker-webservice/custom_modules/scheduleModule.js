class Scheduler {
    constructor(task, payload) {
        this.time;
        this.task = task;
        this.payload = payload;
    }

    initTask() {
        setTimeout(this.task, this.time, this.payload);
        return 'Task initialize'
    }

    toMilliseconds(dateOne, dateTwo) {
        this.time = Math.round(Math.abs(dateOne - dateTwo));
        return this.time;
    }
}

module.exports = Scheduler;