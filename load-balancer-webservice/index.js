const express = require('express');
const app = express();
const cors = require('cors');
const RequestData = require('./models/RequestData');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const server_instances = [
    { server_name: 'garden-tracker-server', server_num: 0, server_address: 'http://localhost:4000', api_endpoints: ['/sowingForm', '/getSowingData', '/getSowingDataByDate', '/getSowingDataByType', '/getSowingDataByDT', '/plantingForm', '/getPlantingData', '/getPlantingDataByDate', '/getPlantingDataByType', '/getPlantingDataByDT', '/harvestingForm', '/getHarvestData', '/getHarvestDataByDate', '/getHarvestDataByType', '/getHarvestDataByDT'], connections: 0, users: [] },
    { server_name: 'reminder-webservice', server_num: 1, server_address: 'http://localhost:5000', api_endpoints: ['/getReminder'], connections: 0, users: [] },
    { server_name: 'authentication-webservice', server_num: 2, server_address: 'http://localhost:5001', api_endpoints: ['/register', '/login', '/auth'], connections: 0, users: [] },
    { server_name: 'authentication-webservice', server_num: 3, server_address: 'http://localhost:5002', api_endpoints: ['/register', '/login', '/auth'], connections: 0, users: [] },
    { server_name: 'authentication-webservice', server_num: 4, server_address: 'http://localhost:5003', api_endpoints: ['/register', '/login', '/auth'], connections: 0, users: [] }
];

let server_data = [...server_instances];
let available_servers = [];

app.post('/request', (req, res) => {
    switch (req.body.server) {
        case 'garden-tracker-server':
            getInstances('garden-tracker-server');
            search(0, req, res);
            break;
        case 'reminder-webservice':
            getInstances('reminder-webservice');
            search(1, req, res);
            break;
        case 'authentication-webservice':
            getInstances('authentication-webservice');
            search(2, req, res);
            break;
        default:
            console.log('Must select a server');
            res.status(200).json('Must select a server')
    }
});

app.get('/sample', (req, res) => {
    let data = ["sample string", { 'temp': 20, 'water': '200 liters' }, { 'temp': 20, 'water': '200 liters' }, { 'temptest': 40, 'water': '200 liters' }]
    res.status(200).json(data);
});

let search = (index, req, res) => {
    let exists = server_instances[index].api_endpoints.includes(req.body.action);
    if (exists) {
        checkLoad(index, res, req);
        return true;
    } else {
        res.status(200).json({ status: 'Invalid request' });
        return false;
    }
}

let logConnectionData = (index, username) => {
    server_data[index].connections += 1;
    server_data[index].users.push({ username: username, date_requested: new Date() });
}

let checkLoad = (index, res, req) => {
    if (available_servers.length > 0) {
        let backup = available_servers[0].server_num
        let server_index = server_data.findIndex(x => x.server_num === backup);
        logConnectionData(server_index, req.body.username);
        let data = { server_name: available_servers[0].server_name, server_address: available_servers[0].server_address, requested_endpoint: available_servers[0].server_address + req.body.action, username: req.body.username, date: new Date() }
        let storeRequestData = new RequestData(data);
        storeRequestData.storeServerData((result) => { console.log(result) });
        res.status(200).json({ server: available_servers[0].server_name, endpoint: available_servers[0].server_address + req.body.action });
    } else {
        logConnectionData(index, req.body.username);
        let data = { server_name: available_servers[index].server_name, server_address: available_servers[index].server_address, requested_endpoint: available_servers[index].server_address + req.body.action, username: req.body.username, date: new Date() }
        let storeRequestData = new RequestData(data);
        storeRequestData.storeServerData((result) => { console.log(result) });
        res.status(200).json({ server: server_instances[index].server_name, endpoint: server_instances[index].server_address + req.body.action });
    }
}

let getInstances = (serviceName) => {
    available_servers = [];
    for (let i = 0; i < server_data.length; i++) {
        if (server_data[i].server_name === serviceName && server_data[i].connections < 1024) {
            available_servers.push(server_data[i]);
        }
    }
}


module.exports = app.listen(5002);