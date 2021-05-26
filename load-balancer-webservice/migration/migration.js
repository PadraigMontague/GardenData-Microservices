let sqlQueries = [
    { sql: 'CREATE TABLE balancer (id int(5) AUTO_INCREMENT, server_name varchar(255) NOT NULL, server_address varchar(255) NOT NULL, requested_endpoint varchar(255) NOT NULL, username varchar(255) NOT NULL, date date NOT NULL, PRIMARY KEY(id))' },
];

let createDb = () => {
    const CreateDatabase = require('./CreateDatabase');
    let result = new CreateDatabase();
    result.createDB('node2');
    console.log('Database Created');
}

let createT = () => {
    const CreateTable = require('./CreateTable');
    let ct = new CreateTable();
    for (let i = 0; i < sqlQueries.length; i++) {
        ct.createTable(sqlQueries[i].sql);
    }
    console.log('Table Created');
}

createDb();
setTimeout(function () { createT() }, 5000);