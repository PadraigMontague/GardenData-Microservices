class DBAuth {
    constructor(){
        this.prepared = '';
    }
    prepareStatement(data) {
        this.prepared = data.replace(/[*()<\/>]/g, '');
        return this.prepared.replace(/\s/g, '/\n/');
    }
}

module.exports = DBAuth;